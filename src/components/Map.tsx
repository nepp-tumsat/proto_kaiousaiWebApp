import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, ImageOverlay, CircleMarker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import shopsData from '../data/festival/shops.json'
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

// 現在地ボタン（1回だけ現在地を取得）
function CurrentLocationButton({
  onLocationUpdate,
}: {
  onLocationUpdate?: (lat: number, lng: number) => void
}) {
  const handleClick = () => {
    if (!navigator.geolocation) {
      alert('このブラウザでは現在地を取得できません。')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        if (onLocationUpdate) {
          onLocationUpdate(latitude, longitude)
        }
      },
      () => {
        alert('現在地を取得できませんでした。位置情報の許可を確認してください。')
      },
    )
  }
  return (
    <button className="current-location-button" onClick={handleClick}>
      📍 現在地取得
    </button>
  )
}

// キャンパス詳細エリアに画像を重ねるレイヤー
function CampusSvgOverlay() {
  const svgBounds: L.LatLngBoundsExpression = [
    [35.66432, 139.78905], // 南西
    [35.669875, 139.796872], // 北東
  ]

  const baseUrl = (import.meta as any).env?.BASE_URL ?? '/'
  const imageUrl = `${baseUrl.replace(/\/$/, '')}/images/campus-map.png`

  return (
    <ImageOverlay
      url={imageUrl}
      bounds={svgBounds}
      opacity={1}
      zIndex={500}
    />
  )
}

// 現在のズームレベル表示
function ZoomIndicator() {
  const [zoom, setZoom] = useState<number>(16)

  useMapEvents({
    zoomend(e) {
      setZoom(e.target.getZoom())
    },
    load(e) {
      setZoom(e.target.getZoom())
    },
  })

  return <div className="zoom-indicator">{zoom}</div>
}

function Map() {
  const [shops] = useState<Shop[]>(shopsData as Shop[])
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const markerRefs = useRef<Record<number, L.Marker<any> | null>>({})

  // 初期表示時に全てのマーカーの吹き出しを開く
  useEffect(() => {
    const refs = markerRefs.current
    // Map や Marker のマウント完了後に実行されるよう、少し遅延させる
    const timer = setTimeout(() => {
      Object.values(refs).forEach((marker) => {
        if (marker) {
          marker.openPopup()
        }
      })
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="map-container">
      <MapContainer
        center={[35.667957411840746, 139.79262060541004]}
        zoom={16}
        maxZoom={19}
        style={{ height: '100%', width: '100%' }}
        closePopupOnClick={false}
      >
        <ZoomIndicator />
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxNativeZoom={19}
          maxZoom={19}
          opacity={0.4}
        />
        <CampusSvgOverlay />
        {shops.map((shop) => (
          <Marker
            key={shop.id}
            position={shop.location}
            ref={(marker) => {
              if (marker) {
                markerRefs.current[shop.id] = marker
              }
            }}
            eventHandlers={{
              click: () => setSelectedShop(shop),
              popupclose: () => {
                const marker = markerRefs.current[shop.id]
                if (marker) {
                  marker.openPopup()
                }
              },
            }}
          >
            <Popup autoClose={false} closeOnClick={false}>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedShop(shop)}
              >
                {shop.name}
              </div>
            </Popup>
          </Marker>
        ))}
        {userLocation && (
          <>
            {/* 外側の赤いリング */}
            <CircleMarker
              center={userLocation}
              radius={10}
              pathOptions={{
                color: 'red',
                weight: 3,
                fillColor: 'transparent',
                fillOpacity: 0,
              }}
            >
              <Popup autoClose={false} closeOnClick={false}>
                あなたの現在地
              </Popup>
            </CircleMarker>
            {/* 内側の赤い点 */}
            <CircleMarker
              center={userLocation}
              radius={4}
              pathOptions={{
                color: 'red',
                weight: 1,
                fillColor: 'red',
                fillOpacity: 1,
              }}
            />
          </>
        )}
        <CurrentLocationButton
          onLocationUpdate={(lat, lng) => setUserLocation([lat, lng])}
        />
      </MapContainer>
      {selectedShop && (
        <ShopPopup shop={selectedShop} onClose={() => setSelectedShop(null)} />
      )}
    </div>
  )
}

export default Map
