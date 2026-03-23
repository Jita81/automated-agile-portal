/**
 * answer.ts — Generate an answer using the local LLM pipeline.
 */

import { getLLM, ProgressCallback } from './loadModel';
import { buildSystemMessage, PromptChunk } from './buildPrompt';

export interface AnswerResult {
  answer: string;
  sources: Array<{ title: string; url: string }>;
  noAnswer: boolean;
}

const NO_ANSWER_PHRASE = "I can't find that on this website.";

export async function generateAnswer(
  question: string,
  chunks: PromptChunk[],
  onProgress?: ProgressCallback
): Promise<AnswerResult> {
  const sources = chunks.map(c => ({ title: `${c.page_title} — ${c.section_heading}`, url: c.url }));

  if (chunks.length === 0) {
    console.log('[AskWebsite] No chunks retrieved, returning no-answer');
    return { answer: NO_ANSWER_PHRASE, sources: [], noAnswer: true };
  }

  console.log('[AskWebsite] Loading LLM pipeline...');
  const llm = await getLLM(onProgress);
  console.log('[AskWebsite] LLM loaded, building prompt for question:', question);

  // Build the user message content with the context inline
  const contextBlocks = chunks
    .map((c, i) =>
      `[Context ${i + 1} | ${c.page_title} — ${c.section_heading}]\n${c.text}`
    )
    .join('\n\n');

  const userContent = `Website context:\n${contextBlocks}\n\nQuestion: ${question}`;

  // Use chat message format for instruct models
  const messages = [
    { role: 'system', content: buildSystemMessage() },
    { role: 'user', content: userContent },
  ];

  console.log('[AskWebsite] Calling LLM with chat messages...');

  let result: any;
  try {
    result = await llm(messages, {
      max_new_tokens: 300,
      temperature: 0.1,
      repetition_penalty: 1.1,
      do_sample: false,
    });
  } catch (err) {
    console.error('[AskWebsite] LLM pipeline call threw an error:', err);
    throw err;
  }

  console.log('[AskWebsite] Raw LLM result:', JSON.stringify(result?.[0]?.generated_text));

  // Instruct models return generated_text as an array of chat message objects
  let generated: string = '';
  const raw = result?.[0]?.generated_text;
  if (typeof raw === 'string') {
    // Plain-string fallback: extract after "Answer:" marker
    generated = raw.split('Answer:').pop()?.trim() ?? raw.trim();
    console.log('[AskWebsite] Parsed plain-string answer:', generated);
  } else if (Array.isArray(raw)) {
    // Chat message format — take the last assistant message
    const lastMsg = [...raw].reverse().find((m: any) => m.role === 'assistant');
    generated = lastMsg?.content?.trim() ?? '';
    console.log('[AskWebsite] Parsed chat message answer:', generated);
  } else {
    console.warn('[AskWebsite] Unexpected result format:', typeof raw, raw);
  }

  const noAnswer =
    !generated ||
    generated.toLowerCase().includes("can't find") ||
    generated.toLowerCase().includes("cannot find") ||
    generated.trim().length < 5;

  console.log('[AskWebsite] Final answer (noAnswer=%s):', noAnswer, generated);

  return {
    answer: noAnswer ? NO_ANSWER_PHRASE : generated,
    sources: noAnswer ? [] : sources,
    noAnswer,
  };
}
