import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import compression from 'vite-plugin-compression';

const isProd = process.env.NODE_ENV == 'production';
const isDev = process.env.NODE_ENV == 'development';

export default defineConfig({
   plugins: [
      react(),
      TanStackRouterVite({
         target: 'react',
         autoCodeSplitting: true,
         routesDirectory: './src/app/routes',
      }),
      tsConfigPaths({
         projects: ['./tsconfig.json'],
      }),
      compression({
         algorithm: 'brotliCompress',
         ext: '.br',
         threshold: 10240,
         deleteOriginFile: false,
      }),
   ],
   server: { port: 3000 },
   build: {
      target: 'esnext',
      outDir: 'dist',
      sourcemap: isDev,
      minify: isProd ? 'terser' : false,
      cssMinify: true,
      ssr: false,
   },
});
