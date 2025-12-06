import { useState } from 'react'
import Map from './components/Map'
import Timetable from './components/Timetable'
import './styles/App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'timetable'>('map')

  return (
    <div className="app">
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
    </div>
  )
}

export default App

