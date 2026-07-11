import { useMemo } from 'react'
import * as THREE from 'three'

// Star field high above the city, matching the target's deep-space backdrop
export default function Stars({ count = 1200 }: { count?: number }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 120 + Math.random() * 180
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random()) // upper hemisphere bias
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = 40 + Math.abs(r * Math.cos(phi)) * 0.6
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [count])

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.5}
        color="#cdd4ff"
        sizeAttenuation
        transparent
        opacity={0.8}
        toneMapped={false}
      />
    </points>
  )
}
