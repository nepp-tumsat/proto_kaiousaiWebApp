import Link from 'next/link'

export default function AboutPage() {
  return (
    <section className="home-menu">
      <h2 className="home-menu-title">About</h2>
      <p style={{ padding: '0 0 1rem', color: '#555' }}>
        東京海洋大学 海王祭の公式 Web アプリです。
      </p>
      <Link href="/" className="home-menu-item" style={{ display: 'inline-flex', maxWidth: '100%' }}>
        <span className="home-menu-label">トップへ</span>
      </Link>
    </section>
  )
}
