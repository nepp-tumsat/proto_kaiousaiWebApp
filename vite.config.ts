import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: '海王祭Webアプリ',
        short_name: '海王祭',
        description: '東京海洋大学 海王祭のインタラクティブマップとタイムテーブル',
        theme_color: '#003366',
        background_color: '#003366',
        display: 'standalone',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: '/proto_kaiousaiWebApp/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})

