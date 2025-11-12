import * as Sentry from "@sentry/nextjs";

// Client instrumentation for Sentry. Next will call register() on the client
// instrumentation file when available.
export function register() {
  Sentry.init({
    dsn: "https://d0e455d1b5e7d096346be32af0d6fcf0@o988407.ingest.us.sentry.io/4507004151791616",
    tracesSampleRate: 1,
    debug: false,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    integrations: [
      // session replay integration kept as an example; adjust as needed
      // Sentry.replayIntegration({ maskAllText: true, blockAllMedia: true }),
    ],
  });
}

// Hook used by Sentry to instrument router transitions in Next.js
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
