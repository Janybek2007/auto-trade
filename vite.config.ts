import { defineConfig, loadEnv } from 'vite';
import viteReact from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import compression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
   const env = loadEnv('develpoment', '.', '');
   const isProd = mode === 'production';
   const isDev = mode === 'development';
   return {
      plugins: [
         TanStackRouterVite({
            target: 'react',
            autoCodeSplitting: true,
            routesDirectory: './src/app/routes',
         }),
         viteReact(),
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
      server: {
         port: parseInt(env.APP_PORT),
         host: true,
      },
      build: {
         target: 'esnext',
         outDir: 'dist',
         sourcemap: isDev,
         minify: isProd ? 'terser' : false,
         cssMinify: true,
         ssr: false,
      },
   };
});
