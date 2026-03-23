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

  console.log('[AskWebsite] Step 1: Loading LLM pipeline...');
  let llm: any;
  try {
    llm = await getLLM(onProgress);
    console.log('[AskWebsite] Step 2: LLM loaded OK. Type:', typeof llm);
  } catch (err: any) {
    console.error('[AskWebsite] FAILED to load LLM:', err?.message ?? err);
    throw err;
  }

  // Build the user message content with the context inline
  const contextBlocks = chunks
    .map((c, i) =>
      `[Context ${i + 1} | ${c.page_title} — ${c.section_heading}]\n${c.text}`
    )
    .join('\n\n');

  const userContent = `Website context:\n${contextBlocks}\n\nQuestion: ${question}`;

  // Try plain-string format first (more compatible across model versions)
  const plainPrompt = `${buildSystemMessage()}\n\n${userContent}\n\nAnswer:`;

  console.log('[AskWebsite] Step 3: Calling LLM. Prompt length:', plainPrompt.length, 'chars');

  let result: any;
  try {
    result = await llm(plainPrompt, {
      max_new_tokens: 300,
      temperature: 0.1,
      repetition_penalty: 1.1,
      do_sample: false,
    });
    console.log('[AskWebsite] Step 4: LLM call succeeded. Result type:', typeof result, '| Array?', Array.isArray(result));
  } catch (err: any) {
    console.error('[AskWebsite] FAILED during LLM call:', err?.message ?? err, err);
    throw err;
  }

  console.log('[AskWebsite] Step 5: Raw result[0]:', JSON.stringify(result?.[0]));

  // Extract generated text
  let generated: string = '';
  const raw = result?.[0]?.generated_text;
  console.log('[AskWebsite] Step 6: raw generated_text type:', typeof raw, '| isArray:', Array.isArray(raw));

  if (typeof raw === 'string') {
    // Strip the prompt prefix, keep only the new tokens after "Answer:"
    generated = raw.split('Answer:').pop()?.trim() ?? raw.trim();
    console.log('[AskWebsite] Parsed plain-string answer:', generated);
  } else if (Array.isArray(raw)) {
    // Chat message format — take the last assistant message
    const lastMsg = [...raw].reverse().find((m: any) => m.role === 'assistant');
    generated = lastMsg?.content?.trim() ?? '';
    console.log('[AskWebsite] Parsed chat-array answer:', generated);
  } else {
    console.warn('[AskWebsite] UNEXPECTED result format. typeof raw:', typeof raw, '| raw:', raw);
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
