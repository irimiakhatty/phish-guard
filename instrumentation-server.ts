import * as Sentry from "@sentry/nextjs";

// This register function will be automatically picked up by Next.js during
// server instrumentation initialization. Move any server-side Sentry init
// logic here following the Next.js instrumentation file convention.
export function register() {
  Sentry.init({
    dsn: "https://d0e455d1b5e7d096346be32af0d6fcf0@o988407.ingest.us.sentry.io/4507004151791616",
    tracesSampleRate: 1,
    debug: false,
  });
}
