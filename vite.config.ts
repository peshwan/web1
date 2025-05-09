import { defineConfig, type PluginOption, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import type { IncomingMessage, ServerResponse } from 'http';

// Combined plugin for security headers and directory listing protection
const securityPlugin = (): PluginOption => {
  return {
    name: 'vite-plugin-security',
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
        // Block directory listing, but allow the root path '/'
        if (req.url?.endsWith('/') && req.url !== '/' && !req.url.endsWith('index.html')) {
          res.statusCode = 404;
          return res.end('Not Found');
        }
        // Add image caching headers
        if (req.url && /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(req.url)) {
          const oneYearInSeconds = 31536000;
          res.setHeader('Cache-Control', `public, max-age=${oneYearInSeconds}, immutable`);
          res.setHeader('Expires', new Date(Date.now() + oneYearInSeconds * 1000).toUTCString());
        }
        next();
      });
    },
  };
};

export default defineConfig({
  base: '/web/', // Set the base path for the custom domain
  build: {
    outDir: 'dist', // Specifies the output directory for the build
  },
  plugins: [
    react(),
    viteCompression({
      verbose: true,
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
      deleteOriginFile: false
    }),
    securityPlugin()
  ],
  server: {
    fs: {
      strict: true
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
