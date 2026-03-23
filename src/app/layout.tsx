import type { ReactNode } from 'react'
import '@/styles/globals.css'
import '@/styles/App.css'
import 'leaflet/dist/leaflet.css'
import Link from 'next/link'

export const metadata = {
  title: '海王祭Webアプリ',
  description: '東京海洋大学 海王祭のインタラクティブマップとタイムテーブル',
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <div className="app">
          <header className="app-header">
            <h1>海王祭</h1>
          </header>
          <main className="app-main">{children}</main>
          <footer className="app-footer">
            <nav className="app-footer-nav">
              <Link href="/" className="app-footer-link">
                Top
              </Link>
              <Link href="/map" className="app-footer-link">
                マップ
              </Link>
              <Link href="/timetable" className="app-footer-link">
                企画一覧
              </Link>
            </nav>
          </footer>
        </div>
      </body>
    </html>
  )
}

