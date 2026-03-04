import { useState, useEffect } from 'react'
import Map from './components/Map'
import Timetable from './components/Timetable'
import './styles/App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'map' | 'timetable'>('map')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="app">
      {isLoading ? (
        <div className="app-splash">
          {/* TODO: ロゴ画像を入れる場合はここで <img> に差し替え */}
          <h1 className="app-splash-title">海王祭</h1>
          <p className="app-splash-subtitle">Loading...</p>
        </div>
      ) : (
        <>
          <header className="app-header">
            <h1>海王祭</h1>
          </header>
          
          <nav className="tab-navigation">
            <button
              className={`tab-button ${activeTab === 'map' ? 'active' : ''}`}
              onClick={() => setActiveTab('map')}
            >
              マップ
            </button>
            <button
              className={`tab-button ${activeTab === 'timetable' ? 'active' : ''}`}
              onClick={() => setActiveTab('timetable')}
            >
              タイムテーブル
            </button>
          </nav>

          <main className="app-main">
            {activeTab === 'map' && <Map />}
            {activeTab === 'timetable' && <Timetable />}
          </main>
        </>
      )}
    </div>
  )
}

export default App

