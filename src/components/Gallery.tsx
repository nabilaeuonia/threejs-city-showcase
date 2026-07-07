import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type CodeFile = {
  name: string
  content: string
}

type Demo = {
  title: string
  description: string
  tag: string
  image: string
  files: CodeFile[]
}

const demos: Demo[] = [
  {
    title: 'Rotating Cube',
    description: 'Dasar geometry + material yang berputar otomatis.',
    tag: 'Basic',
    image: 'https://picsum.photos/seed/cube/600/400',
    files: [
      { name: 'index.html', content: `<canvas id="scene"></canvas>\n<script type="module" src="script.js"></script>` },
      { name: 'script.js', content: `useFrame(() => {\n  mesh.current.rotation.x += 0.01\n  mesh.current.rotation.y += 0.01\n})` },
      { name: 'style.css', content: `body {\n  margin: 0;\n  background: #000;\n}` },
    ],
  },
  {
    title: 'Particle Rain',
    description: 'Sistem partikel sederhana yang jatuh terus-menerus.',
    tag: 'Particles',
    image: 'https://picsum.photos/seed/particles/600/400',
    files: [
      { name: 'index.html', content: `<canvas id="scene"></canvas>\n<script type="module" src="script.js"></script>` },
      { name: 'script.js', content: `const positions = new Float32Array(count * 3)\nfor (let i = 0; i < count; i++) {\n  positions[i * 3 + 1] = Math.random() * 20\n}` },
      { name: 'style.css', content: `body {\n  margin: 0;\n  background: #000;\n}` },
    ],
  },
  {
    title: 'Bloom Light',
    description: 'Post-processing bloom untuk efek cahaya menyala.',
    tag: 'Post FX',
    image: 'https://picsum.photos/seed/bloom/600/400',
    files: [
      { name: 'index.html', content: `<canvas id="scene"></canvas>\n<script type="module" src="script.js"></script>` },
      { name: 'script.js', content: `<EffectComposer>\n  <Bloom intensity={0.8} luminanceThreshold={0.2} />\n</EffectComposer>` },
      { name: 'style.css', content: `body {\n  margin: 0;\n  background: #000;\n}` },
    ],
  },
  {
    title: 'Physics Ball',
    description: 'Fisika dasar dengan gravitasi sederhana.',
    tag: 'Physics',
    image: 'https://picsum.photos/seed/physics/600/400',
    files: [
      { name: 'index.html', content: `<canvas id="scene"></canvas>\n<script type="module" src="script.js"></script>` },
      { name: 'script.js', content: `velocity.y -= gravity * delta\nposition.y += velocity.y * delta\nif (position.y < 0) velocity.y *= -bounce` },
      { name: 'style.css', content: `body {\n  margin: 0;\n  background: #000;\n}` },
    ],
  },
  {
    title: 'GLTF Model Viewer',
    description: 'Memuat dan menampilkan model 3D custom.',
    tag: 'Model',
    image: 'https://picsum.photos/seed/model/600/400',
    files: [
      { name: 'index.html', content: `<canvas id="scene"></canvas>\n<script type="module" src="script.js"></script>` },
      { name: 'script.js', content: `const { scene } = useGLTF('/model.glb')\nreturn <primitive object={scene} />` },
      { name: 'style.css', content: `body {\n  margin: 0;\n  background: #000;\n}` },
    ],
  },
  {
    title: 'Shader Playground',
    description: 'Eksperimen custom GLSL shader.',
    tag: 'Shader',
    image: 'https://picsum.photos/seed/shader/600/400',
    files: [
      { name: 'index.html', content: `<canvas id="scene"></canvas>\n<script type="module" src="script.js"></script>` },
      { name: 'script.js', content: `void main() {\n  gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);\n}` },
      { name: 'style.css', content: `body {\n  margin: 0;\n  background: #000;\n}` },
    ],
  },
]

export default function Gallery() {
  const [selected, setSelected] = useState<Demo | null>(null)
  const [showCode, setShowCode] = useState(false)
  const [activeFile, setActiveFile] = useState('index.html')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-10 overflow-y-auto bg-black/80 p-8"
    >
      {!selected && (
        <>
          <h1 className="text-white text-3xl font-bold mb-2">Projects Tree.js</h1>
          <p className="text-gray-400 mb-8">Klik salah satu kartu untuk melihat detail.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {demos.map((demo, i) => (
              <motion.div
                key={demo.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => {
                  setSelected(demo)
                  setActiveFile('index.html')
                }}
                className="rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:border-cyan-400/50 transition cursor-pointer group"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={demo.image}
                    alt={demo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs uppercase tracking-wide text-cyan-400">{demo.tag}</span>
                  <h2 className="text-white text-lg font-semibold mt-1">{demo.title}</h2>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Tampilan detail full-screen setelah card diklik */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 bg-black flex items-center justify-center"
          >
            <img
              src={selected.image}
              alt={selected.title}
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute top-8 left-8 z-10">
              <span className="text-xs uppercase tracking-wide text-cyan-400">{selected.tag}</span>
              <h2 className="text-white text-3xl font-bold">{selected.title}</h2>
              <p className="text-gray-300 mt-2 max-w-md">{selected.description}</p>
            </div>

            <button
              onClick={() => setShowCode(true)}
              className="absolute bottom-8 left-8 z-10 px-5 py-3 rounded-full bg-black/60 border border-white/20 text-white text-sm hover:bg-white hover:text-black transition"
            >
              &gt; View Code
            </button>

            <button
              onClick={() => setSelected(null)}
              className="absolute bottom-8 right-8 z-10 px-5 py-3 rounded-full bg-black/60 border border-white/20 text-white text-sm hover:bg-white hover:text-black transition"
            >
              ← Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel kode dengan sidebar file, muncul saat "View Code" diklik */}
      <AnimatePresence>
        {selected && showCode && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed inset-0 z-30 bg-black/80 flex items-center justify-center p-6"
            onClick={() => setShowCode(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1e1e1e] border border-white/10 rounded-lg max-w-3xl w-full overflow-hidden shadow-2xl flex"
              style={{ height: '420px' }}
            >
              <div className="w-48 bg-[#181818] border-r border-white/10 p-3 overflow-y-auto">
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-2 px-2">
                  {selected.title}
                </p>
                {selected.files.map((file) => (
                  <button
                    key={file.name}
                    onClick={() => setActiveFile(file.name)}
                    className={`w-full text-left px-2 py-1.5 rounded text-sm mb-1 transition ${
                      activeFile === file.name
                        ? 'bg-cyan-500/20 text-cyan-300'
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    {file.name}
                  </button>
                ))}
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 bg-[#2d2d2d] px-4 py-3">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-gray-400 text-xs ml-3">{activeFile}</span>
                </div>
                <pre className="p-5 text-sm text-cyan-300 overflow-auto flex-1">
                  <code>{selected.files.find((f) => f.name === activeFile)?.content}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}