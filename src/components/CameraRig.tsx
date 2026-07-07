import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type Props = {
  onFinish: () => void
  duration?: number
}

// Titik awal = posisi kamera landing terakhir (sejajar IdleCamera)
// Titik akhir = mundur sedikit + turun dikit, biar transisinya ringan & cepat
const START = new THREE.Vector3(0, 6, 45)
const END = new THREE.Vector3(0, 4, 55)

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function CameraRig({ onFinish, duration = 1.5 }: Props) {
  const elapsed = useRef(0)
  const done = useRef(false)

  useFrame((state, delta) => {
    if (done.current) return

    elapsed.current += delta
    const t = Math.min(elapsed.current / duration, 1)
    const eased = easeInOutCubic(t)

    state.camera.position.lerpVectors(START, END, eased)
    state.camera.lookAt(0, -5, END.z - -20)

    if (t >= 1 && !done.current) {
      done.current = true
      onFinish()
    }
  })

  return null
}