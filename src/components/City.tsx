import { useMemo } from 'react'

type Building = {
  position: [number, number, number]
  size: [number, number, number]
  color: string
}

// Zone-based city: tall dense core, medium ring, sparse low outskirts —
// mirrors the "central / outer" zones of treejsprojects.vercel.app
function generateBuildings(gridSize = 22, spacing = 3) {
  const buildings: Building[] = []
  const centralRadius = Math.floor(gridSize * 0.5)
  const midRadius = Math.floor(gridSize * 0.72)

  for (let x = -gridSize; x <= gridSize; x++) {
    for (let z = -gridSize; z <= gridSize; z++) {
      if (x % 3 === 0 || z % 3 === 0) continue

      const ring = Math.max(Math.abs(x), Math.abs(z))
      const isCentral = ring <= centralRadius
      const isMid = ring <= midRadius && !isCentral

      // Skip some plots in the outer zones so the skyline thins out
      if (!isCentral) {
        const keep = isMid ? Math.random() > 0.25 : Math.random() > 0.55
        if (!keep) continue
      }

      const height = isCentral
        ? Math.max(4, 14 + Math.random() * 34)
        : isMid
        ? Math.max(3, 6 + Math.random() * 18)
        : Math.max(2.5, 3 + Math.random() * 8)

      const width = 3 + Math.random() * 1.5
      const depth = 3 + Math.random() * 1.5

      buildings.push({
        position: [x * spacing, height / 2, z * spacing],
        size: [width, height, depth],
        color: '#0b0b13',
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
    // More lit windows on taller buildings so the core reads as denser
    const count = 5 + Math.floor(Math.random() * 5) + Math.floor(height / 8)
    const items: { pos: [number, number, number]; rot: [number, number, number]; color: string }[] = []

    // Warm + cool window palette lifted from the target scene
    const warm = ['#ffffee', '#ffffdd', '#fffacd', '#ffefd5', '#ffaa33']
    const cool = ['#aaddff', '#add8e6', '#afeeee', '#b0c4de', '#c0d0ff', '#e0e8ff']

    for (let i = 0; i < count; i++) {
      const onFront = Math.random() > 0.5
      const wy = -height / 2 + Math.random() * height * 0.8 + height * 0.1
      const color =
        Math.random() > 0.7
          ? warm[Math.floor(Math.random() * warm.length)]
          : cool[Math.floor(Math.random() * cool.length)]

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