/**
 * loadModel.ts — Lazy-load the embedding and LLM pipelines via Transformers.js.
 * Models are cached by the browser after first download.
 */

import { pipeline, env } from '@xenova/transformers';

// Allow model downloads from Hugging Face CDN
env.allowRemoteModels = true;
env.useBrowserCache = true;

export type ProgressCallback = (progress: { status: string; progress?: number; file?: string }) => void;

let embedPipeline: any = null;
let llmPipeline: any = null;

export async function getEmbedder(onProgress?: ProgressCallback) {
  if (embedPipeline) return embedPipeline;
  embedPipeline = await pipeline(
    'feature-extraction',
    'Xenova/bge-small-en-v1.5',
    {
      progress_callback: onProgress,
      quantized: true,
    }
  );
  return embedPipeline;
}

export async function getLLM(onProgress?: ProgressCallback) {
  if (llmPipeline) return llmPipeline;
  llmPipeline = await pipeline(
    'text-generation',
    'Xenova/Qwen2.5-0.5B-Instruct',
    {
      progress_callback: onProgress,
      quantized: true,
      dtype: 'q4',
    }
  );
  return llmPipeline;
}

export function resetModels() {
  embedPipeline = null;
  llmPipeline = null;
}
