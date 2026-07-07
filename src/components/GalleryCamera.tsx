import { useFrame } from '@react-three/fiber'

export default function GalleryCamera() {
  useFrame((state) => {
    const t = state.clock.elapsedTime

    const radius = 40
    const speed = 0.06

    state.camera.position.x = Math.sin(t * speed) * radius
    state.camera.position.z = Math.cos(t * speed) * radius
    state.camera.position.y = 25

    state.camera.lookAt(0, 10, 0)
  })

  return null
}