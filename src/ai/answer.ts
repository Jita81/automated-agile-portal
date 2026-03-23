/**
 * answer.ts — Generate an answer using the local LLM pipeline.
 */

import { getLLM, ProgressCallback } from './loadModel';
import { buildGroundedPrompt, PromptChunk } from './buildPrompt';

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
    return { answer: NO_ANSWER_PHRASE, sources: [], noAnswer: true };
  }

  const llm = await getLLM(onProgress);
  const prompt = buildGroundedPrompt(question, chunks);

  const result = await llm(prompt, {
    max_new_tokens: 300,
    temperature: 0.1,
    repetition_penalty: 1.1,
    do_sample: false,
  });

  console.log('[AskWebsite] Raw LLM result:', JSON.stringify(result?.[0]?.generated_text));

  // Transformers.js instruct models may return generated_text as either:
  // - a plain string (older pipeline format)
  // - an array of chat message objects: [{ role, content }]
  let generated: string = '';
  const raw = result?.[0]?.generated_text;
  if (typeof raw === 'string') {
    generated = raw;
  } else if (Array.isArray(raw)) {
    // Chat message format — take the last assistant message
    const lastMsg = [...raw].reverse().find((m: any) => m.role === 'assistant');
    generated = lastMsg?.content ?? '';
    console.log('[AskWebsite] Parsed chat message answer:', generated);
  }

  // For plain-string format, extract after "Answer:" marker; for chat format use as-is
  const answerPart = typeof result?.[0]?.generated_text === 'string'
    ? (generated.split('Answer:').pop()?.trim() ?? generated.trim())
    : generated.trim();

  const noAnswer =
    !answerPart ||
    answerPart.toLowerCase().includes("can't find") ||
    answerPart.toLowerCase().includes("cannot find") ||
    answerPart.trim().length < 5;

  return {
    answer: noAnswer ? NO_ANSWER_PHRASE : answerPart,
    sources: noAnswer ? [] : sources,
    noAnswer,
  };
}
