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
  if (embedPipeline) {
    console.log('[AskWebsite] getEmbedder: returning cached pipeline');
    return embedPipeline;
  }
  console.log('[AskWebsite] getEmbedder: loading Xenova/bge-small-en-v1.5…');
  embedPipeline = await pipeline(
    'feature-extraction',
    'Xenova/bge-small-en-v1.5',
    {
      progress_callback: (p: any) => {
        if (p?.status) console.log('[AskWebsite] embedder progress:', p.status, p.file ?? '', p.progress != null ? `${Math.round(p.progress)}%` : '');
        onProgress?.(p);
      },
      quantized: true,
    }
  );
  console.log('[AskWebsite] getEmbedder: pipeline ready');
  return embedPipeline;
}

export async function getLLM(onProgress?: ProgressCallback) {
  if (llmPipeline) {
    console.log('[AskWebsite] getLLM: returning cached pipeline');
    return llmPipeline;
  }
  console.log('[AskWebsite] getLLM: loading Xenova/Qwen2.5-0.5B-Instruct…');
  llmPipeline = await pipeline(
    'text-generation',
    'Xenova/Qwen2.5-0.5B-Instruct',
    {
      progress_callback: (p: any) => {
        if (p?.status) console.log('[AskWebsite] LLM progress:', p.status, p.file ?? '', p.progress != null ? `${Math.round(p.progress)}%` : '');
        onProgress?.(p);
      },
      quantized: true,
    }
  );
  console.log('[AskWebsite] getLLM: pipeline ready');
  return llmPipeline;
}

export function resetModels() {
  console.log('[AskWebsite] resetModels: clearing cached pipelines');
  embedPipeline = null;
  llmPipeline = null;
}
