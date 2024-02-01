import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    //https: true,
    hmr: {
      //host: 'dev-id.kao-kirei.com',
      host: 'localhost',
    },
  },
  // build時はminifyする
  build: {
    minify: 'esbuild',
  },
  plugins: [
    laravel({
      input: [
        // ページ毎、コンポーネント毎に追記
        'resources/sass/app.scss',
        'resources/ts/app.tsx',
        'resources/js/pico.js',
      ],
      refresh: true,
    }),
    react(),
  ],
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "resources/sass/common.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/resources/ts',
    },
  },
})
