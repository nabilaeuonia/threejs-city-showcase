import { motion } from 'framer-motion'

// Ganti/tambah item ini sesuai demo Three.js yang sudah dibuat tiap anggota tim
const demos = [
  { title: 'Rotating Cube', description: 'Dasar geometry + material', tag: 'Basic' },
  { title: 'Particle Rain', description: 'Sistem partikel sederhana', tag: 'Particles' },
  { title: 'Bloom Light', description: 'Post-processing bloom', tag: 'Post FX' },
  { title: 'Physics Ball', description: 'Fisika dasar dengan gravitasi', tag: 'Physics' },
  { title: 'GLTF Model Viewer', description: 'Load model 3D custom', tag: 'Model' },
  { title: 'Shader Playground', description: 'Custom GLSL shader', tag: 'Shader' },
]

export default function Gallery() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-10 overflow-y-auto bg-black/80 backdrop-blur-md p-8"
    >
      <h1 className="text-white text-3xl font-bold mb-2">Galeri Demo Three.js</h1>
      <p className="text-gray-400 mb-8">
        Kumpulan eksperimen Three.js dari tim — klik untuk melihat detail (isi link/route sendiri).
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {demos.map((demo, i) => (
          <motion.div
            key={demo.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition cursor-pointer"
          >
            <span className="text-xs uppercase tracking-wide text-cyan-400">{demo.tag}</span>
            <h2 className="text-white text-lg font-semibold mt-1">{demo.title}</h2>
            <p className="text-gray-400 text-sm mt-1">{demo.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
