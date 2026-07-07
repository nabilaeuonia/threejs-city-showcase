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

      const height = 2 + Math.random() * 20
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

// GANTI: dari komponen "Windows" (banyak jendela, berat) jadi "CornerGlow" (1 garis neon, ringan)
function CornerGlow({ building }: { building: Building }) {
  const { position, size } = building
  const [width, height, depth] = size
  const color = '#4fd8ff'

  return (
    <mesh
      position={[
        position[0] + width / 2,
        position[1],
        position[2] + depth / 2,
      ]}
    >
      <boxGeometry args={[0.08, height, 0.08]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2.5}
        toneMapped={false}
      />
    </mesh>
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
          {/* GANTI: cuma 1 dari 3 gedung yang dikasih glow, biar ringan */}
          {i % 3 === 0 && <CornerGlow building={b} />}
        </group>
      ))}
    </group>
  )
}