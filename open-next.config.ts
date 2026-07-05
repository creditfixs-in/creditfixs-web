import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// Serves SSG pages (generateStaticParams) from Workers static assets.
// Required: without an incremental cache, every prerendered route 404s.
// Read-only — swap for r2IncrementalCache if ISR/revalidation is ever added.
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
