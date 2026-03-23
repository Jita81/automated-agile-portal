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

  const generated: string = result[0]?.generated_text ?? '';
  // Extract just the answer portion (after "Answer:")
  const answerPart = generated.split('Answer:').pop()?.trim() ?? generated.trim();

  const noAnswer =
    answerPart.toLowerCase().includes("can't find") ||
    answerPart.toLowerCase().includes("cannot find") ||
    answerPart.trim().length < 5;

  return {
    answer: noAnswer ? NO_ANSWER_PHRASE : answerPart,
    sources: noAnswer ? [] : sources,
    noAnswer,
  };
}
