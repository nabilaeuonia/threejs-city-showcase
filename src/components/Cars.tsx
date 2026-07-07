import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type Car = {
  road: 'x' | 'z' // sumbu jalan yang dilalui mobil ini
  lane: number     // posisi jalan (tetap di satu sisi)
  speed: number
  offset: number   // biar tiap mobil nggak mulai bareng
  color: string
}

// Jalan ada tiap kelipatan 9 (3 grid x spacing 3), sesuai pola di City.tsx
const CARS: Car[] = [
  { road: 'z', lane: 0, speed: 4, offset: 0, color: '#ff5555' },
  { road: 'z', lane: 9, speed: 5, offset: 20, color: '#ffffff' },
  { road: 'z', lane: -9, speed: 4, offset: 40, color: '#ffe066' },
  { road: 'x', lane: 18, speed: 3, offset: 10, color: '#55aaff' },
]

const RANGE = 80 // mobil bolak-balik dari -80 sampai 80 lalu ulang dari awal

function CarMesh({ car }: { car: Car }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = (state.clock.elapsedTime * car.speed + car.offset) % (RANGE * 2)
    const pos = t - RANGE

    if (car.road === 'z') {
      ref.current.position.set(car.lane, 0.35, pos)
      ref.current.rotation.y = 0
    } else {
      ref.current.position.set(pos, 0.35, car.lane)
      ref.current.rotation.y = Math.PI / 2
    }
  })

  return (
    <group ref={ref}>
      {/* Badan bawah mobil */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[0.9, 0.3, 1.8]} />
        <meshStandardMaterial color={car.color} emissive={car.color} emissiveIntensity={0.4} />
      </mesh>
      {/* Kabin/atap */}
      <mesh position={[0, 0.42, -0.1]} castShadow>
        <boxGeometry args={[0.7, 0.24, 0.9]} />
        <meshStandardMaterial color={car.color} emissive={car.color} emissiveIntensity={0.4} />
      </mesh>
      {/* 4 roda */}
      {[
        [0.42, 0.05, 0.6],
        [-0.42, 0.05, 0.6],
        [0.42, 0.05, -0.6],
        [-0.42, 0.05, -0.6],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 8]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
      ))}
    </group>
  )
}

export default function Cars() {
  return (
    <group>
      {CARS.map((car, i) => (
        <CarMesh key={i} car={car} />
      ))}
    </group>
  )
}