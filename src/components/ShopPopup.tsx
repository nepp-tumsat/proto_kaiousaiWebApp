import './ShopPopup.css'
import type { Shop } from '../data/loaders'
import { assetUrl } from '../lib/assetUrl'

interface ShopPopupProps {
  shop: Shop
  onClose: () => void
}

function ShopPopup({ shop, onClose }: ShopPopupProps) {
  const imageSrc = assetUrl(`/images/${shop.image}`)

  return (
    <div className="shop-popup-overlay" onClick={onClose}>
      <div className="shop-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="shop-popup-close" onClick={onClose}>×</button>
        <img src={imageSrc} alt={shop.name} className="shop-popup-image" />
        <div className="shop-popup-info">
          <h2>{shop.name}</h2>
          <p>{shop.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ShopPopup
