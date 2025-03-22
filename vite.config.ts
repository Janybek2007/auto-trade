import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';
import compression from 'vite-plugin-compression';
import { reactRouter } from '@react-router/dev/vite';

export default defineConfig(({ mode }) => {
   const env = loadEnv(mode, process.cwd(), '');
   const isProd = mode === 'production';
   const isDev = mode === 'development';

   return {
      plugins: [
         tsconfigPaths(),
         checker({
            typescript: {
               tsconfigPath: './tsconfig.json',
            },
            eslint: {
               lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
               useFlatConfig: true,
               dev: {
                  logLevel: ['error', 'warning'],
               },
            },
         }),
         compression({
            algorithm: 'brotliCompress',
            ext: '.br',
            threshold: 10240,
            deleteOriginFile: false,
         }),
         reactRouter(),
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
