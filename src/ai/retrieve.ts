/**
 * retrieve.ts — Cosine similarity search over the local chunk index.
 */

import { Chunk, loadChunks } from './loadIndex';
import { embedBatch, embedText } from './embedQuery';
import { getCachedEmbeddings, setCachedEmbeddings } from './cache';
import { ProgressCallback } from './loadModel';

const CACHE_KEY = 'chunks-v1';
const MIN_SCORE = 0.3;

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-10);
}

/** Load chunks + ensure embeddings are computed (cached in IndexedDB). */
export async function prepareIndex(onProgress?: ProgressCallback): Promise<Chunk[]> {
  const chunks = await loadChunks();

  // Try loading from IndexedDB cache first
  let storedEmbeddings = await getCachedEmbeddings(CACHE_KEY);

  if (!storedEmbeddings || storedEmbeddings.length !== chunks.length) {
    // Compute embeddings for all chunks
    const texts = chunks.map(c => `${c.section_heading}: ${c.text}`);
    storedEmbeddings = await embedBatch(texts, onProgress);
    await setCachedEmbeddings(CACHE_KEY, storedEmbeddings);
  }

  // Attach embeddings to chunks
  chunks.forEach((c, i) => { c.embedding = storedEmbeddings![i]; });

  return chunks;
}

/** Retrieve the top-k most relevant chunks for a query. */
export async function retrieveTopK(
  query: string,
  chunks: Chunk[],
  k = 6
): Promise<Array<Chunk & { score: number }>> {
  const queryEmbedding = await embedText(query);

  const scored = chunks
    .filter(c => c.embedding)
    .map(c => ({ ...c, score: cosineSimilarity(queryEmbedding, c.embedding!) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .filter(c => c.score >= MIN_SCORE);

  return scored;
}
