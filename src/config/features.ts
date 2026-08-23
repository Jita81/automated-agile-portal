/**
 * Feature toggles.
 * Flip to `true` to re-enable a surface without restoring deleted code.
 */
export const FEATURES = {
  /** Athena product page (/athena) + homepage banner + header "Book a Demo" CTA */
  athena: false,
  /** "Ask this website" browser-side AI assistant widget */
  askWebsite: false,
} as const;
