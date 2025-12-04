import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express, { NextFunction, Response, Request } from 'express';
import { join } from 'node:path';
import { renderApplication } from '@angular/platform-server';
import bootstrap from './main.server';
import { APP_BASE_HREF } from '@angular/common';

const browserDistFolder = join(import.meta.dirname, '../browser');
// const serverDistFolder = join(import.meta.dirname, '../server');
const errorPagePath = join(browserDistFolder, '500.html');

const app = express();
const angularApp = new AngularNodeAppEngine();
// const indexHtml = join(serverDistFolder, 'index.server.html');

/**
 * PERF: SSR render-time logging
 */
function logSSRTime(start: number, url: string) {
  const duration = performance.now() - start;
  console.log(`[SSR] ${url} rendered in ${duration.toFixed(0)}ms`);
}

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/* ---------------------------------------------------------
 * MAIN SSR HANDLER
 * (Streaming enabled by default in AngularNodeAppEngine)
 * --------------------------------------------------------- */
app.use(async (req, res, next) => {
  const start = performance.now(); // ← Start SSR timer

  try {
    const response = await angularApp.handle(req, {
      // --- STREAMING ---
      // HTML will begin streaming before the whole app is ready
      enableStreaming: true,
    });

    if (!response) return next();

    logSSRTime(start, req.url); // ← Log SSR time

    return writeResponseToNodeResponse(response, res);
  } catch (err) {
    next(err);
  }
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}


/**
 * ERROR HANDLING MIDDLEWARE
 * */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[SSR ERROR] Uncaught error during render for ${req.url}:`, err);

  // Serve the static 500.html file and set the status code
  res.status(500).sendFile(errorPagePath, (fileError) => {
    debugger
    if (fileError) {
      debugger
      console.error(`[SSR ERROR] Failed to send 500.html:`, fileError);
      // Fallback: This line now uses the correct Express 'res.send' method.
      res.send('<h1>500 - Internal Server Error</h1><p>A server error occurred.</p>');
    }
  });
});


/**
 * Perf guardrails - slow routes
 * */
// app.get('*', async (req, res) => {
//   const start = performance.now();
//
//   try {
//     const html = await renderApplication(bootstrap, {
//       url: req.originalUrl,
//       document: indexHtml,
//       platformProviders: [
//         { provide: APP_BASE_HREF, useValue: req.baseUrl }
//       ],
//     });
//
//     const duration = performance.now() - start;
//     const status = duration > 1500 ? '⚠️ slow' : '✅ ok';
//     console.log(`[SSR] ${status} ${req.originalUrl} (${Math.round(duration)}ms)`);
//
//     res.status(200).send(html);
//   } catch (err) {
//     console.error('[SSR] render failed', err);
//     res.status(500).send('<h1>500 — Server Error</h1>');
//   }
// });

/**
 * Perf guardrails - monitoring alerts
 * */
app.get('/healthz', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    memory: process.memoryUsage().rss,
    timestamp: new Date().toISOString(),
  });
});

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
