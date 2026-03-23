import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="home-menu">
      <h2 className="home-menu-title">メニュー</h2>
      <div className="home-menu-grid">
        <Link href="/map" className="home-menu-item">
          <span className="home-menu-label">マップ</span>
        </Link>
        <Link href="/timetable" className="home-menu-item">
          <span className="home-menu-label">企画一覧</span>
        </Link>
        <Link href="/nepp" className="home-menu-item">
          <span className="home-menu-label">NePP展示</span>
        </Link>
        <Link href="/about" className="home-menu-item">
          <span className="home-menu-label">About</span>
        </Link>
      </div>
    </section>
  )
}

