'use client'

import dynamic from 'next/dynamic'

const MapFeature = dynamic(() => import('../../src/features/map/Map'), {
  ssr: false,
})

export default function MapPage() {
  return <MapFeature />
}

