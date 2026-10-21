export const PRODUCTION_URL = "https://diogogmatos.dev";

// The URL the site is currently served from, so links in the metadata (like the
// Open Graph images) also work on Vercel's preview deployments and locally.
// VERCEL_ENV and the other variables are set by Vercel on every deployment
export function getSiteUrl() {
  switch (process.env.VERCEL_ENV) {
    case "production":
      return new URL(PRODUCTION_URL);
    case "preview":
      // The branch's URL, or the deployment's own URL if it has none
      return new URL(
        `https://${process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL}`,
      );
    default:
      return new URL(`http://localhost:${process.env.PORT || 3000}`);
  }
}
