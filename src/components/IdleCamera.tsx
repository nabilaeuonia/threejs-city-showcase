import { useFrame } from '@react-three/fiber'

export default function IdleCamera() {
  useFrame((state) => {
    const t = state.clock.elapsedTime

    const speed = 1        // kecepatan maju menyusuri jalan
    const range = 150       // jarak tempuh sebelum looping ulang
    const startZ = 45      // titik mulai (jauh)

    // Kamera terus maju (Z makin kecil), lalu looping balik ke titik awal
    const z = startZ - ((t * speed) % range)

    state.camera.position.set(0, 6, z)
    state.camera.lookAt(0, -5, z - 20) // titik pandang selalu di depan kamera, agak mendongak
  })

  return null
}