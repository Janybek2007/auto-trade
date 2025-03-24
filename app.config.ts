import { defineConfig } from '@tanstack/react-start/config';
import tsConfigPaths from 'vite-tsconfig-paths';
import compression from 'vite-plugin-compression';

const isProd = process.env.NODE_ENV == 'production';
const isDev = process.env.NODE_ENV == 'development';

export default defineConfig({
	tsr: {
		appDirectory: 'src/app',
		target: 'react',
		autoCodeSplitting: true,
		routesDirectory: './src/app/routes'
	},
	vite: () => {
		return {
			plugins: [
				tsConfigPaths({
					projects: ['./tsconfig.json']
				}),
				compression({
					algorithm: 'brotliCompress',
					ext: '.br',
					threshold: 10240,
					deleteOriginFile: false
				})
			],
			server: {
				port: 3000,
				host: true
			},
			build: {
				target: 'esnext',
				outDir: 'dist',
				sourcemap: isDev,
				minify: isProd ? 'terser' : false,
				cssMinify: true,
				ssr: false
			}
		};
	}
});
