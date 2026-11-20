import { readFile } from 'node:fs/promises';
import { Readable } from 'node:stream';
import { defineConfig, loadEnv } from 'vite';
import { render, routes } from './portfolio.mjs';
import { handleContact } from './worker/contact.mjs';

const base = '/mateo-hub/';
const template = new URL('./index.html', import.meta.url);

export default defineConfig(({ mode }) => ({
  base,
  plugins: [{
    name: 'portfolio-pages',
    configureServer(server) {
      const contactEnv = loadEnv(mode, server.config.root, ['CONTACT_', 'RESEND_']);
      server.middlewares.use(async (request, response, next) => {
        const origin = `http://${request.headers.host}`;
        const url = new URL(request.url, origin);
        const path = url.pathname;
        if (path === base + 'api/contact') {
          try {
            const body = request.method === 'POST' ? Readable.toWeb(request) : undefined;
            const input = new Request(url, { method: request.method, headers: request.headers, body, duplex: 'half' });
            const output = await handleContact(input, { ...contactEnv, CONTACT_ORIGIN: origin });
            response.writeHead(output.status, Object.fromEntries(output.headers));
            response.end(await output.text());
          } catch (error) {
            next(error);
          }
          return;
        }
        const route = path.startsWith(base) && routes.get(path.slice(base.length).replace(/index\.html$/, ''));
        if (!route) return next();
        try {
          const html = await server.transformIndexHtml(path, await readFile(template, 'utf8'));
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.end(render(html, route, base));
        } catch (error) {
          next(error);
        }
      });
    },
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        const entry = bundle['index.html'];
        const template = String(entry.source);
        for (const [path, route] of routes) {
          const source = render(template, route, base);
          if (!path) entry.source = source;
          else this.emitFile({ type: 'asset', fileName: path + 'index.html', source });
        }
      },
    },
  }],
}));
