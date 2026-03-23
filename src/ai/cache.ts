/**
 * cache.ts — Persist embeddings in IndexedDB so they survive page reloads.
 */

const DB_NAME = 'aa-ai-cache';
const DB_VERSION = 1;
const STORE_EMBEDDINGS = 'embeddings';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE_EMBEDDINGS);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getCachedEmbeddings(key: string): Promise<number[][] | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_EMBEDDINGS, 'readonly');
      const req = tx.objectStore(STORE_EMBEDDINGS).get(key);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export async function setCachedEmbeddings(key: string, embeddings: number[][]): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_EMBEDDINGS, 'readwrite');
      const req = tx.objectStore(STORE_EMBEDDINGS).put(embeddings, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Non-fatal — embeddings will be recomputed next time
  }
}
