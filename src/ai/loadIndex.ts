/**
 * loadIndex.ts — Fetch and hold the pre-built chunk index.
 */

export interface Chunk {
  id: string;
  url: string;
  page_title: string;
  section_heading: string;
  text: string;
  embedding?: number[];
}

let cachedChunks: Chunk[] | null = null;

export async function loadChunks(): Promise<Chunk[]> {
  if (cachedChunks) return cachedChunks;
  const res = await fetch('/ai/index/chunks.json');
  if (!res.ok) throw new Error('Failed to load chunk index');
  cachedChunks = await res.json();
  return cachedChunks!;
}
