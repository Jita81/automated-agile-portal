/**
 * embedQuery.ts — Embed a user query using the loaded bge-small model.
 */

import { getEmbedder, ProgressCallback } from './loadModel';

export async function embedText(text: string, onProgress?: ProgressCallback): Promise<number[]> {
  const embedder = await getEmbedder(onProgress);
  const output = await embedder(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data as Float32Array);
}

/** Compute embeddings for multiple texts in one call. */
export async function embedBatch(texts: string[], onProgress?: ProgressCallback): Promise<number[][]> {
  const embedder = await getEmbedder(onProgress);
  const results: number[][] = [];
  for (const text of texts) {
    const output = await embedder(text, { pooling: 'mean', normalize: true });
    results.push(Array.from(output.data as Float32Array));
  }
  return results;
}
