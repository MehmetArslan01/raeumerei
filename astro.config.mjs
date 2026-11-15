// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

/**
 * Ziel: Cloudflare Workers mit Static Assets.
 * Alle Inhaltsseiten sind vorgerendert; nur /api/anfrage läuft im Worker.
 */
export default defineConfig({
  site: 'https://raeumerei.at',

  adapter: cloudflare({
    imageService: 'compile',
    experimental: { headersAndRedirectsDevModeSupport: true },
  }),

  // Keine Sitzungen: sonst verlangt der Adapter beim Deploy ein KV-Binding.
  session: false,
  output: 'static',

  // Genau eine URL-Form je Seite.
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/danke') && !page.includes('/thank-you'),
      changefreq: 'monthly',
      serialize: (item) => {
        const pfad = item.url.replace(/https?:\/\/[^/]+\//, '');
        if (pfad === '') item.priority = 1.0;
        else if (/^(entruempelung|wohnungsraeumung|umzug)-wien\/$/.test(pfad)) item.priority = 0.9;
        else if (/^(impressum|datenschutz)\/$/.test(pfad)) item.priority = 0.3;
        else if (pfad === 'en/') item.priority = 0.8;
        else item.priority = 0.7;
        return item;
      },
    }),
  ],

  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },

  vite: { build: { cssMinify: 'lightningcss' } },
});
