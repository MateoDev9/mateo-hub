import { readFile } from 'node:fs/promises';
import { Readable } from 'node:stream';
import { defineConfig, loadEnv } from 'vite';
import { render, routes, sitemap } from './portfolio.mjs';
import { handleContact } from './worker/contact.mjs';

const defaultSite = 'https://mateodev9.github.io/mateo-hub/';
const template = new URL('./index.html', import.meta.url);

export default defineConfig(({ mode }) => {
  const { PORTFOLIO_SITE_URL } = loadEnv(mode, process.cwd(), 'PORTFOLIO_SITE_URL');
  const site = new URL(PORTFOLIO_SITE_URL || defaultSite);
  if (site.protocol !== 'https:' || site.username || site.password || site.search || site.hash) {
    throw new Error('PORTFOLIO_SITE_URL must be a public HTTPS URL without credentials, a query or a fragment');
  }
  if (!site.pathname.endsWith('/')) site.pathname += '/';
  const base = site.pathname;

  return {
    base,
    plugins: [{
      name: 'portfolio-pages',
      configureServer(server) {
        const contactEnv = loadEnv(mode, server.config.root, ['CONTACT_', 'RESEND_']);
        server.middlewares.use(async (request, response, next) => {
          const origin = `http://${request.headers.host}`;
          const url = new URL(request.url, origin);
          const path = url.pathname;
          if (path === base + 'sitemap.xml') {
            response.setHeader('Content-Type', 'application/xml; charset=utf-8');
            response.end(sitemap(site));
            return;
          }
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
            response.end(render(html, route, site));
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
          this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap(site) });
          if (base === '/') {
            this.emitFile({
              type: 'asset',
              fileName: 'robots.txt',
              source: `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', site).href}\n`,
            });
          }
          for (const [path, route] of routes) {
            const source = render(template, route, site);
            if (!path) entry.source = source;
            else this.emitFile({ type: 'asset', fileName: path + 'index.html', source });
          }
        },
      },
    }],
  };
});
