import { useMemo } from 'react'

type Building = {
  position: [number, number, number]
  size: [number, number, number]
  color: string
}

function generateBuildings(gridSize = 20, spacing = 3) {
  const buildings: Building[] = []

  for (let x = -gridSize; x <= gridSize; x++) {
    for (let z = -gridSize; z <= gridSize; z++) {
      if (x % 3 === 0 || z % 3 === 0) continue
      
      const isTall = Math.random() > 0.75
      const height = isTall ? 25 + Math.random() * 25 : 3 + Math.random() * 10
      const width = 3 + Math.random() * 1.5
      const depth = 3 + Math.random() * 1.5

      buildings.push({
        position: [x * spacing, height / 2, z * spacing],
        size: [width, height, depth],
        color: '#0c0c14',
      })
    }
  }
  return buildings
}

// Garis glow di SEMUA sudut gedung (4 sudut), geometri sangat ringan
function CornerGlows({ building }: { building: Building }) {
  const { position, size } = building
  const [width, height, depth] = size
  const color = '#4fd8ff'

  const corners: [number, number][] = [
    [width / 2, depth / 2],
    [-width / 2, depth / 2],
    [width / 2, -depth / 2],
    [-width / 2, -depth / 2],
  ]

  return (
    <group position={position}>
      {corners.map(([cx, cz], i) => (
        <mesh key={i} position={[cx, 0, cz]}>
          <boxGeometry args={[0.06, height, 0.06]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2.2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

// Jendela versi RINGAN -- cuma 2-3 titik nyala acak per gedung, bukan grid penuh
function SparseWindows({ building }: { building: Building }) {
  const { position, size } = building
  const [width, height, depth] = size

  const windows = useMemo(() => {
    const count = 5 + Math.floor(Math.random() * 5) // 2 atau 3 jendela saja
    const items: { pos: [number, number, number]; rot: [number, number, number]; color: string }[] = []

    for (let i = 0; i < count; i++) {
      const onFront = Math.random() > 0.5
      const wy = -height / 2 + Math.random() * height * 0.8 + height * 0.1
      const color = Math.random() > 0.85 ? '#ffb454' : '#9fd8ff'

      if (onFront) {
        const wx = (Math.random() - 0.5) * (width * 0.6)
        items.push({ pos: [wx, wy, depth / 2 + 0.01], rot: [0, 0, 0], color })
      } else {
        const wz = (Math.random() - 0.5) * (depth * 0.6)
        items.push({ pos: [width / 2 + 0.01, wy, wz], rot: [0, Math.PI / 2, 0], color })
      }
    }
    return items
  }, [width, height, depth])

  return (
    <group position={position}>
      {windows.map((w, i) => (
        <mesh key={i} position={w.pos} rotation={w.rot}>
          <planeGeometry args={[0.25, 0.35]} />
          <meshStandardMaterial
            color={w.color}
            emissive={w.color}
            emissiveIntensity={0.7}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

// Garis jalan kuning putus-putus di sepanjang jalan (kelipatan 3 grid)
function RoadMarkings() {
  const lines = useMemo(() => {
    const items: [number, number, number][] = []
    for (let i = -60; i <= 60; i += 3) {
      items.push([0, 0.01, i])
    }
    return items
  }, [])

  return (
    <group>
      {lines.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.3, 1.2]} />
          <meshStandardMaterial color="#ffe066" />
        </mesh>
      ))}
    </group>
  )
}

export default function City() {
  const buildings = useMemo(() => generateBuildings(), [])

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#020204" />
      </mesh>

      <RoadMarkings />

      {buildings.map((b, i) => (
        <group key={i}>
          <mesh position={b.position} castShadow receiveShadow>
            <boxGeometry args={b.size} />
            <meshStandardMaterial
              color={b.color}
              roughness={0.7}
              metalness={0.3}
            />
          </mesh>
          {Math.random() > 0.6 && <CornerGlows building={b} />}
          <SparseWindows building={b} />
        </group>
      ))}
    </group>
  )
}