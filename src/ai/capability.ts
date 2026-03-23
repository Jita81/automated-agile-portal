/**
 * capability.ts — Detect whether the device can run local AI.
 * Transformers.js works on CPU/WASM on all modern browsers.
 * WebGPU is only needed for the 'fast' tier — absence means 'slow', not unsupported.
 */

export type CapabilityResult =
  | { ok: true; tier: 'fast' | 'slow' }
  | { ok: false; reason: 'unsupported_browser' };

export async function checkCapability(): Promise<CapabilityResult> {
  // Must have a modern browser with WebAssembly (essentially all browsers since 2017)
  if (typeof WebAssembly === 'undefined') {
    return { ok: false, reason: 'unsupported_browser' };
  }

  // Try WebGPU for fast tier
  try {
    if ('gpu' in navigator) {
      const gpu = (navigator as any).gpu;
      const adapter = await gpu.requestAdapter();
      if (adapter) {
        const info = await adapter.requestAdapterInfo?.().catch(() => null);
        const isSoftware =
          info?.description?.toLowerCase().includes('software') ||
          info?.description?.toLowerCase().includes('swiftshader') ||
          info?.description?.toLowerCase().includes('llvmpipe');

        return { ok: true, tier: isSoftware ? 'slow' : 'fast' };
      }
    }
  } catch {
    // WebGPU failed — fall through to CPU/WASM
  }

  // CPU/WASM fallback — works on all modern browsers, just slower
  return { ok: true, tier: 'slow' };
}
