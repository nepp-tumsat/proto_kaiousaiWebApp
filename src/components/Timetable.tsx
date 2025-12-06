import { useState, useEffect } from 'react'
import eventsData from '../data/events.json'
import './Timetable.css'

interface Event {
  id: number
  time: string
  title: string
  location: string
  description: string
  isNow: boolean
}

function Timetable() {
  const [events] = useState<Event[]>(eventsData as Event[])
  const [currentTime, setCurrentTime] = useState<string>('')

  // 現在時刻を更新（デモ用に特定の時刻をハードコードすることも可能）
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // 1分ごとに更新

    return () => clearInterval(interval)
  }, [])

  // イベントが開催中かどうかを判定（isNowフラグまたは現在時刻との比較）
  const isEventNow = (event: Event): boolean => {
    if (event.isNow) return true // ハードコードされた「開催中」フラグ
    
    if (!currentTime) return false
    
    const [eventHour, eventMinute] = event.time.split(':').map(Number)
    const [currentHour, currentMinute] = currentTime.split(':').map(Number)
    
    // 同じ時間帯（±30分以内）なら開催中とみなす
    const eventTotal = eventHour * 60 + eventMinute
    const currentTotal = currentHour * 60 + currentMinute
    const diff = Math.abs(eventTotal - currentTotal)
    
    return diff <= 30
  }

  return (
    <div className="timetable-container">
      <div className="timetable-header">
        <h2>タイムテーブル</h2>
        {currentTime && (
          <div className="current-time">
            現在時刻: <strong>{currentTime}</strong>
          </div>
        )}
      </div>
      
      <div className="timetable-list">
        {events.map((event) => {
          const isNow = isEventNow(event)
          
          return (
            <div
              key={event.id}
              className={`timetable-item ${isNow ? 'now' : ''}`}
            >
              <div className="timetable-time">
                {event.time}
              </div>
              <div className="timetable-content">
                <div className="timetable-title-row">
                  <h3 className="timetable-title">{event.title}</h3>
                  {isNow && (
                    <span className="now-badge">開催中 (NOW)</span>
                  )}
                </div>
                <div className="timetable-location">
                  📍 {event.location}
                </div>
                <p className="timetable-description">{event.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Timetable

