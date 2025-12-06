import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import shopsData from '../data/shops.json'
import ShopPopup from './ShopPopup'
import './Map.css'

// Leafletのデフォルトアイコンの問題を修正
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

// 現在地ボタンコンポーネント（デモ用フェイク機能）
function CurrentLocationButton() {
  const map = useMap()
  const [position] = useState<[number, number]>([35.661234, 139.791234]) // 正門の座標（デモ用）

  const handleClick = () => {
    map.setView(position, 18, {
      animate: true,
      duration: 1.0
    })
  }

  return (
    <button className="current-location-button" onClick={handleClick}>
      📍 現在地
    </button>
  )
}

// カスタムマップ画像レイヤーコンポーネント
function CustomMapImage() {
  const map = useMap()
  const imageOverlayRef = useRef<L.ImageOverlay | null>(null)

  useEffect(() => {
    const mapImageUrl = '/images/campus-map.jpg'
    
    // マップ画像の表示範囲を設定（実際のマップ画像に合わせて調整）
    const southWest = L.latLng(35.65, 139.78)
    const northEast = L.latLng(35.67, 139.80)
    const bounds = L.latLngBounds(southWest, northEast)

    // 画像オーバーレイを作成
    const imageOverlay = L.imageOverlay(mapImageUrl, bounds, {
      opacity: 1.0,
      interactive: true
    })

    imageOverlay.addTo(map)
    imageOverlayRef.current = imageOverlay

    // 画像が読み込めない場合のエラーハンドリング
    const img = new Image()
    img.onerror = () => {
      console.warn('マップ画像が見つかりません。デフォルトのタイルレイヤーを使用します。')
      if (imageOverlayRef.current) {
        map.removeLayer(imageOverlayRef.current)
      }
    }
    img.src = mapImageUrl

    return () => {
      if (imageOverlayRef.current) {
        map.removeLayer(imageOverlayRef.current)
      }
    }
  }, [map])

  return null
}

function Map() {
  const [shops] = useState<Shop[]>(shopsData as Shop[])
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null)

  // マップの中心座標（東京海洋大学の大まかな位置）
  const center: [number, number] = [35.662000, 139.792000]
  const zoom = 16

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        touchZoom={true}
        dragging={true}
        minZoom={14}
        maxZoom={20}
      >
        {/* フォールバック用のタイルレイヤー（画像が読み込めない場合） */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.3}
        />

        {/* カスタムマップ画像レイヤー */}
        <CustomMapImage />

        {/* 各店舗のマーカー */}
        {shops.map((shop) => (
          <Marker
            key={shop.id}
            position={shop.location}
            eventHandlers={{
              click: () => {
                setSelectedShop(shop)
              }
            }}
          >
            <Popup>
              <div className="marker-popup">
                <h3>{shop.name}</h3>
                <p>{shop.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 現在地ボタン */}
        <CurrentLocationButton />
      </MapContainer>

      {/* 店舗詳細モーダル */}
      {selectedShop && (
        <ShopPopup shop={selectedShop} onClose={() => setSelectedShop(null)} />
      )}
    </div>
  )
}

export default Map

