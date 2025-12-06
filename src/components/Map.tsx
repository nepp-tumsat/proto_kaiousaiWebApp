import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import shopsData from '../data/shops.json'
import ShopPopup from './ShopPopup'
import './Map.css'

// Leafletアイコンの設定
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface Shop {
  id: number
  name: string
  description: string
  location: [number, number]
  image: string
}

// 現在地ボタン
function CurrentLocationButton() {
  const map = useMap()
  const handleClick = () => {
    map.setView([35.661234, 139.791234], 18)
  }
  return (
    <button className="current-location-button" onClick={handleClick}>
      📍 現在地
    </button>
  )
}

// カスタムマップ画像レイヤー
function MapImage() {
  const map = useMap()
  useEffect(() => {
    const bounds = L.latLngBounds([35.65, 139.78], [35.67, 139.80])
    const overlay = L.imageOverlay('/images/campus-map.jpg', bounds)
    overlay.addTo(map)
    return () => {
      map.removeLayer(overlay)
    }
  }, [map])
  return null
}

function Map() {
  const [shops] = useState<Shop[]>(shopsData as Shop[])
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null)

  return (
    <div className="map-container">
      <MapContainer
        center={[35.662000, 139.792000]}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.3}
        />
        <MapImage />
        {shops.map((shop) => (
          <Marker
            key={shop.id}
            position={shop.location}
            eventHandlers={{ click: () => setSelectedShop(shop) }}
          >
            <Popup>{shop.name}</Popup>
          </Marker>
        ))}
        <CurrentLocationButton />
      </MapContainer>
      {selectedShop && (
        <ShopPopup shop={selectedShop} onClose={() => setSelectedShop(null)} />
      )}
    </div>
  )
}

export default Map
