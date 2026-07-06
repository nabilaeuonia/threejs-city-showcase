import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type Props = {
  onFinish: () => void
  duration?: number // detik, default 5 seperti aslinya
}

// Titik awal (bird's eye, jauh di atas kota) dan titik akhir (dekat tanah, first-person)
const START = new THREE.Vector3(0, 60, 90)
const END = new THREE.Vector3(0, 1.7, 6)
const LOOK_START = new THREE.Vector3(0, 0, 0)
const LOOK_END = new THREE.Vector3(0, 1.7, 0)

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function CameraRig({ onFinish, duration = 5 }: Props) {
  const elapsed = useRef(0)
  const done = useRef(false)

  useFrame((state, delta) => {
    if (done.current) return

    elapsed.current += delta
    const t = Math.min(elapsed.current / duration, 1)
    const eased = easeInOutCubic(t)

    state.camera.position.lerpVectors(START, END, eased)

    const lookTarget = new THREE.Vector3().lerpVectors(LOOK_START, LOOK_END, eased)
    state.camera.lookAt(lookTarget)

    if (t >= 1 && !done.current) {
      done.current = true
      onFinish()
    }
  })

  return null
}
