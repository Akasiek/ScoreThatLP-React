import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init() {
    Sentry.init({
        dsn: "https://f274741b8faf4992a13a1757dd539025@o1118067.ingest.sentry.io/6221943",
        integrations: [new BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}

function log(error) {
    Sentry.captureException(error);
}

const logMethods = {
    init,
    log,
};

export default logMethods;
