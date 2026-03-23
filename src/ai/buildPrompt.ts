/**
 * buildPrompt.ts — Assemble the grounded prompt from retrieved chunks.
 */

import { Chunk } from './loadIndex';

export interface PromptChunk extends Chunk {
  score: number;
}

export function buildGroundedPrompt(question: string, chunks: PromptChunk[]): string {
  const contextBlocks = chunks
    .map((c, i) =>
      `[Context ${i + 1} | ${c.page_title} — ${c.section_heading} | ${c.url}]\n${c.text}`
    )
    .join('\n\n');

  return `You are the website assistant for Automated Agile (automatedagile.co.uk).

Answer using ONLY the provided website context below. Do not use any outside knowledge.
If the answer is not contained in the context, respond with exactly:
"I can't find that on this website."

Be concise and accurate. Where possible, cite the page section from the supplied metadata.
Do not invent products, prices, policies, roles, or contact details.

Website context:
${contextBlocks}

Question: ${question}

Answer:`;
}

export function buildSystemMessage(): string {
  return `You are the website assistant for Automated Agile. Answer questions using only the provided website context. If the answer isn't in the context, say "I can't find that on this website."`;
}
