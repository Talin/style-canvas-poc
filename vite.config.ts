// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { Readable } from 'node:stream';

export default defineConfig({
  plugins: [
    react(),

    {
      name: 'mock-openai-image',
      configureServer(server) {
        server.middlewares.use('/api/generate', (req, res, next) => {
          if (req.method !== 'POST') return next();

          // no need to read body for mock
          const url = `https://picsum.photos/seed/${Date.now()}/1024`;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ imageUrl: url }));
        });
      },
    },
    {
      name: 'image-proxy',
      configureServer(server) {
        server.middlewares.use('/api/fetch-image', async (req, res) => {
          if (req.method !== 'POST') return res.end('Only POST');
    
          try {
            const { url } = await getJsonBody<{ url: string }>(req);
    
            const upstream = await fetch(url);
            if (!upstream.ok) throw new Error(`upstream ${upstream.status}`);
    
            // pipe bytes straight back to the client
            res.setHeader('Content-Type', upstream.headers.get('content-type') || 'image/jpeg');
            Readable.fromWeb(upstream.body as any).pipe(res);
          } catch (err) {
            console.error(err);
            res.statusCode = 500;
            res.end('proxy‑err');
          }
        });
    
        // helper to read JSON body
        async function getJsonBody<T>(req: import('http').IncomingMessage): Promise<T> {
          return new Promise((resolve, reject) => {
            let buf = '';
            req.on('data', (c) => (buf += c));
            req.on('end', () => {
              try {
                resolve(JSON.parse(buf));
              } catch (e) {
                reject(e);
              }
            });
          });
        }
      },
    },
  ],
});

