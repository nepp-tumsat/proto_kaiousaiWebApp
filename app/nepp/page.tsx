import Link from 'next/link'

export default function NeppPage() {
  return (
    <section className="home-menu">
      <h2 className="home-menu-title">NePP展示</h2>
      <p style={{ padding: '0 0 1rem', color: '#555' }}>
        準備中です。マップの NePP ピンから企画情報をご覧ください。
      </p>
      <Link href="/map" className="home-menu-item" style={{ display: 'inline-flex', maxWidth: '100%' }}>
        <span className="home-menu-label">マップへ</span>
      </Link>
    </section>
  )
}
