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
  console.log('[AskWebsite] prepareIndex: loading chunks…');
  const chunks = await loadChunks();
  console.log(`[AskWebsite] prepareIndex: loaded ${chunks.length} chunks`);

  // Try loading from IndexedDB cache first
  let storedEmbeddings = await getCachedEmbeddings(CACHE_KEY);

  if (!storedEmbeddings || storedEmbeddings.length !== chunks.length) {
    console.log('[AskWebsite] prepareIndex: computing embeddings for all chunks (first run)…');
    const texts = chunks.map(c => `${c.section_heading}: ${c.text}`);
    storedEmbeddings = await embedBatch(texts, onProgress);
    await setCachedEmbeddings(CACHE_KEY, storedEmbeddings);
    console.log(`[AskWebsite] prepareIndex: embeddings computed and cached (${storedEmbeddings.length})`);
  } else {
    console.log(`[AskWebsite] prepareIndex: loaded ${storedEmbeddings.length} embeddings from cache`);
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
  console.log(`[AskWebsite] retrieveTopK: embedding query "${query}"…`);
  const queryEmbedding = await embedText(query);

  const scored = chunks
    .filter(c => c.embedding)
    .map(c => ({ ...c, score: cosineSimilarity(queryEmbedding, c.embedding!) }))
    .sort((a, b) => b.score - a.score);

  const topK = scored.slice(0, k).filter(c => c.score >= MIN_SCORE);

  console.log(`[AskWebsite] retrieveTopK: top ${k} scores:`, scored.slice(0, k).map(c => ({
    id: c.id,
    heading: c.section_heading,
    score: c.score.toFixed(3),
  })));
  console.log(`[AskWebsite] retrieveTopK: ${topK.length} chunks above MIN_SCORE (${MIN_SCORE})`);

  return topK;
}
