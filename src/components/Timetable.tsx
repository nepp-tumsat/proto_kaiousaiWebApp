import eventsData from '../data/festival/events.json'
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
  const events = eventsData as Event[]

  return (
    <div className="timetable-container">
      <h2>タイムテーブル</h2>
      <div className="timetable-list">
        {events.map((event) => (
          <div key={event.id} className={`timetable-item ${event.isNow ? 'now' : ''}`}>
            <div className="timetable-time">{event.time}</div>
            <div className="timetable-content">
              <h3>{event.title}</h3>
              {event.isNow && <span className="now-badge">開催中 (NOW)</span>}
              <p>📍 {event.location}</p>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timetable
