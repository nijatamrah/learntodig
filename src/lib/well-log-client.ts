/**
 * Base URL for WellLog API requests from the browser.
 * Defaults to Next.js rewrite proxy (/api/welllog → FastAPI).
 * Set NEXT_PUBLIC_WELLLOG_API_URL to call the API directly (e.g. http://localhost:8000).
 */
export function getWellLogApiBase(): string {
  const base = process.env.NEXT_PUBLIC_WELLLOG_API_URL ?? "/api/welllog";
  return base.replace(/\/$/, "");
}
