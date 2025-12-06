import './ShopPopup.css'

interface Shop {
  id: number
  name: string
  description: string
  location: [number, number]
  image: string
}

interface ShopPopupProps {
  shop: Shop
  onClose: () => void
}

function ShopPopup({ shop, onClose }: ShopPopupProps) {
  return (
    <div className="shop-popup-overlay" onClick={onClose}>
      <div className="shop-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="shop-popup-close" onClick={onClose}>
          ×
        </button>
        <div className="shop-popup-image-container">
          <img
            src={shop.image}
            alt={shop.name}
            className="shop-popup-image"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              // 画像が読み込めない場合のフォールバック
              const target = e.target as HTMLImageElement
              target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(shop.name)
            }}
          />
        </div>
        <div className="shop-popup-info">
          <h2 className="shop-popup-title">{shop.name}</h2>
          <p className="shop-popup-description">{shop.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ShopPopup

