import { useMemo } from 'react'

type Building = {
  position: [number, number, number]
  size: [number, number, number]
  color: string
}

// Membuat data gedung secara procedural: posisi grid + tinggi acak, warna hitam kebiruan
function generateBuildings(gridSize = 20, spacing = 3) {
  const buildings: Building[] = []

  for (let x = -gridSize; x <= gridSize; x++) {
    for (let z = -gridSize; z <= gridSize; z++) {
      // beri jalan (skip beberapa grid) biar ada pola jalan raya
      if (x % 3 === 0 || z % 3 === 0) continue

      const height = 2 + Math.random() * 20
      const width = 3 + Math.random() * 1.5
      const depth = 3 + Math.random() * 1.5

      buildings.push({
        position: [x * spacing, height / 2, z * spacing],
        size: [width, height, depth],
        color: '#0c0c14', // <-- INI warna kebiruannya, sedikit tint biru dari hitam pekat
      })
    }
  }
  return buildings
}

// Jendela-jendela kecil menyala yang nempel di 4 sisi badan gedung
function Windows({ building }: { building: Building }) {
  const { position, size } = building
  const [width, height, depth] = size

  const windows = useMemo(() => {
    const items: { pos: [number, number, number]; rot: [number, number, number]; color: string }[] = []
    const rows = Math.floor(height / 1.2)

    const sides = [
      { offset: depth / 2 + 0.01, rotY: 0, span: width },
      { offset: -(depth / 2 + 0.01), rotY: Math.PI, span: width },
      { offset: width / 2 + 0.01, rotY: Math.PI / 2, span: depth },
      { offset: -(width / 2 + 0.01), rotY: -Math.PI / 2, span: depth },
    ]

    sides.forEach((side) => {
      const cols = Math.floor(side.span / 0.5)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > 0.6) continue

          const along = -side.span / 2 + 0.3 + c * 0.5
          const wy = -height / 2 + 0.6 + r * 1.2
          const color = Math.random() > 0.85 ? '#ffb454' : '#9fd8ff'

          const isFrontBack = side.rotY === 0 || side.rotY === Math.PI
          const pos: [number, number, number] = isFrontBack
            ? [along, wy, side.offset]
            : [side.offset, wy, along]

          items.push({ pos, rot: [0, side.rotY, 0], color })
        }
      }
    })

    return items
  }, [width, height, depth])

  return (
    <group position={position}>
      {windows.map((w, i) => (
        <mesh key={i} position={w.pos} rotation={w.rot}>
          <planeGeometry args={[0.2, 0.3]} />
          <meshStandardMaterial
            color={w.color}
            emissive={w.color}
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

// Komponen utama City -- INI YANG KEMARIN HILANG
export default function City() {
  const buildings = useMemo(() => generateBuildings(), [])

  return (
    <group>
      {/* Ground / jalan -- dibuat lebih gelap dari gedung biar ada kontras */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#020204" />
      </mesh>

      {/* Gedung-gedung procedural + jendela di 4 sisi */}
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
          <Windows building={b} />
        </group>
      ))}
    </group>
  )
}