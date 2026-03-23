/**
 * answer.ts — Generate an answer using the local LLM pipeline.
 * Supports both chat (messages array) and text-generation output formats from Transformers.js.
 */

import { getLLM, ProgressCallback } from './loadModel';
import { buildGroundedPrompt, PromptChunk } from './buildPrompt';

export interface AnswerResult {
  answer: string;
  sources: Array<{ title: string; url: string }>;
  noAnswer: boolean;
}

const NO_ANSWER_PHRASE = "I can't find that on this website.";

/**
 * Extract the assistant text from whatever shape Transformers.js returns.
 * - Chat model: result[0].generated_text is an array of {role, content} objects
 * - Plain text-gen model: result[0].generated_text is a string
 */
function extractGeneratedText(result: any): string {
  console.log('[AskWebsite] Raw LLM result:', JSON.stringify(result, null, 2));

  const raw = result?.[0]?.generated_text;

  if (Array.isArray(raw)) {
    // Chat model — find the last assistant turn
    const assistantMessages = raw.filter((m: any) => m.role === 'assistant');
    const lastAssistant = assistantMessages[assistantMessages.length - 1];
    const content = lastAssistant?.content ?? '';
    console.log('[AskWebsite] Extracted assistant content (chat format):', content);
    return content;
  }

  if (typeof raw === 'string') {
    // Plain text-gen — strip off the prompt by splitting at "Answer:"
    const answerPart = raw.split('Answer:').pop()?.trim() ?? raw.trim();
    console.log('[AskWebsite] Extracted answer (text-gen format):', answerPart);
    return answerPart;
  }

  console.warn('[AskWebsite] Unexpected LLM output shape — could not extract text', result);
  return '';
}

export async function generateAnswer(
  question: string,
  chunks: PromptChunk[],
  onProgress?: ProgressCallback
): Promise<AnswerResult> {
  const sources = chunks.map(c => ({ title: `${c.page_title} — ${c.section_heading}`, url: c.url }));

  console.log(`[AskWebsite] generateAnswer called — question: "${question}", chunks: ${chunks.length}`);

  if (chunks.length === 0) {
    console.log('[AskWebsite] No chunks retrieved — returning no-answer response');
    return { answer: NO_ANSWER_PHRASE, sources: [], noAnswer: true };
  }

  console.log('[AskWebsite] Retrieved chunks:', chunks.map(c => ({
    id: c.id,
    heading: c.section_heading,
    score: (c as any).score?.toFixed(3),
    textLength: c.text.length,
  })));

  const llm = await getLLM(onProgress);
  console.log('[AskWebsite] LLM pipeline ready, building prompt…');

  // Use chat messages format — Transformers.js instruct models prefer this
  const messages = [
    {
      role: 'system' as const,
      content: `You are the website assistant for Automated Agile (automatedagile.co.uk).
Answer using ONLY the provided website context below. Do not use any outside knowledge.
If the answer is not contained in the context, respond with exactly: "${NO_ANSWER_PHRASE}"
Be concise and accurate. Do not invent products, prices, policies, roles, or contact details.`,
    },
    {
      role: 'user' as const,
      content: buildGroundedPrompt(question, chunks),
    },
  ];

  console.log('[AskWebsite] Calling LLM with messages format…');

  let result: any;
  try {
    result = await llm(messages, {
      max_new_tokens: 300,
      temperature: 0.1,
      repetition_penalty: 1.1,
      do_sample: false,
    });
  } catch (chatErr) {
    // Fallback: some quantised models don't support messages format — try plain string
    console.warn('[AskWebsite] Chat format failed, falling back to plain prompt:', chatErr);
    const plainPrompt = buildGroundedPrompt(question, chunks);
    result = await llm(plainPrompt, {
      max_new_tokens: 300,
      temperature: 0.1,
      repetition_penalty: 1.1,
      do_sample: false,
    });
  }

  const answerPart = extractGeneratedText(result);

  const noAnswer =
    !answerPart ||
    answerPart.trim().length < 5 ||
    answerPart.toLowerCase().includes("can't find") ||
    answerPart.toLowerCase().includes("cannot find") ||
    answerPart.toLowerCase().includes("i don't know");

  console.log(`[AskWebsite] Final answer (noAnswer=${noAnswer}):`, answerPart);

  return {
    answer: noAnswer ? NO_ANSWER_PHRASE : answerPart,
    sources: noAnswer ? [] : sources,
    noAnswer,
  };
}
