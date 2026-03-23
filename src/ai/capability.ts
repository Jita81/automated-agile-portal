/**
 * capability.ts — Detect whether the device can run local AI via WebGPU.
 */

export type CapabilityResult =
  | { ok: true; tier: 'fast' | 'slow' }
  | { ok: false; reason: 'no_webgpu' | 'no_adapter' | 'gpu_init_failed' | 'unsupported_browser' };

export async function checkCapability(): Promise<CapabilityResult> {
  // Check WebGPU API availability
  if (typeof navigator === 'undefined' || !('gpu' in navigator)) {
    return { ok: false, reason: 'no_webgpu' };
  }

  try {
    const gpu = (navigator as any).gpu;
    const adapter = await gpu.requestAdapter();
    if (!adapter) {
      return { ok: false, reason: 'no_adapter' };
    }

    // Heuristic: check if it's a software (low-perf) adapter
    const info = await adapter.requestAdapterInfo?.().catch(() => null);
    const isSoftware = info?.description?.toLowerCase().includes('software') ||
      info?.description?.toLowerCase().includes('swiftshader') ||
      info?.description?.toLowerCase().includes('llvmpipe');

    return { ok: true, tier: isSoftware ? 'slow' : 'fast' };
  } catch {
    return { ok: false, reason: 'gpu_init_failed' };
  }
}
