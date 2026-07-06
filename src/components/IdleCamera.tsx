import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function IdleCamera() {
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    // Kamera muter pelan mengelilingi kota dalam radius tetap,
    // sin & cos dipakai supaya gerakannya melingkar (bukan garis lurus)
    const radius = 45
    const speed = 0.05 // makin kecil = makin pelan muternya

    state.camera.position.x = Math.sin(t * speed) * radius
    state.camera.position.z = Math.cos(t * speed) * radius
    state.camera.position.y = 60 + Math.sin(t * 0.2) * 5 // sedikit naik-turun juga

    state.camera.lookAt(0, 0, 0)
  })

  return null
}