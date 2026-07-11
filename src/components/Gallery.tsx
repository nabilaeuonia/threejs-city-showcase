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

const html = (title: string) =>
  `<canvas class="webgl"></canvas>\n<script type="module" src="./script.js"></script>\n<!-- ${title} -->`
const css = `* { margin: 0; padding: 0; }\nhtml, body { overflow: hidden; }\n.webgl {\n  position: fixed;\n  top: 0;\n  left: 0;\n  outline: none;\n}`

const demos: Demo[] = [
  {
    title: 'First Project',
    description: 'The very first scene: a mesh, a camera and a WebGL renderer.',
    tag: 'Basics',
    image: 'https://picsum.photos/seed/first/600/400',
    files: [
      { name: 'index.html', content: html('First Project') },
      { name: 'script.js', content: `const scene = new THREE.Scene()\nconst geometry = new THREE.BoxGeometry(1, 1, 1)\nconst material = new THREE.MeshBasicMaterial({ color: 0xff0000 })\nconst mesh = new THREE.Mesh(geometry, material)\nscene.add(mesh)` },
      { name: 'style.css', content: css },
    ],
  },
  {
    title: 'Transform Objects',
    description: 'Position, rotation, scale and grouping objects in the scene.',
    tag: 'Basics',
    image: 'https://picsum.photos/seed/transform/600/400',
    files: [
      { name: 'index.html', content: html('Transform Objects') },
      { name: 'script.js', content: `mesh.position.set(0.7, -0.6, 1)\nmesh.scale.set(2, 0.5, 0.5)\nmesh.rotation.reorder('YXZ')\nmesh.rotation.y = Math.PI * 0.25` },
      { name: 'style.css', content: css },
    ],
  },
  {
    title: 'Orbit Controls',
    description: 'Let the user rotate, pan and zoom the camera with the mouse.',
    tag: 'Camera',
    image: 'https://picsum.photos/seed/orbit/600/400',
    files: [
      { name: 'index.html', content: html('Orbit Controls') },
      { name: 'script.js', content: `const controls = new OrbitControls(camera, canvas)\ncontrols.enableDamping = true\n\nconst tick = () => {\n  controls.update()\n  renderer.render(scene, camera)\n  requestAnimationFrame(tick)\n}` },
      { name: 'style.css', content: css },
    ],
  },
  {
    title: 'Geometries',
    description: 'Built-in and custom buffer geometries with vertices.',
    tag: 'Geometry',
    image: 'https://picsum.photos/seed/geometries/600/400',
    files: [
      { name: 'index.html', content: html('Geometries') },
      { name: 'script.js', content: `const geometry = new THREE.BufferGeometry()\nconst positions = new Float32Array(count * 3 * 3)\nfor (let i = 0; i < count * 9; i++) {\n  positions[i] = (Math.random() - 0.5) * 4\n}\ngeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))` },
      { name: 'style.css', content: css },
    ],
  },
  {
    title: 'Debug UI',
    description: 'Tweak the scene live with a lil-gui debug panel.',
    tag: 'Tools',
    image: 'https://picsum.photos/seed/debug/600/400',
    files: [
      { name: 'index.html', content: html('Debug UI') },
      { name: 'script.js', content: `const gui = new GUI()\ngui.add(mesh.position, 'y').min(-3).max(3).step(0.01)\ngui.add(material, 'wireframe')\ngui.addColor(material, 'color')` },
      { name: 'style.css', content: css },
    ],
  },
  {
    title: 'Textures',
    description: 'Load and map color, normal and roughness textures.',
    tag: 'Materials',
    image: 'https://picsum.photos/seed/textures/600/400',
    files: [
      { name: 'index.html', content: html('Textures') },
      { name: 'script.js', content: `const loader = new THREE.TextureLoader()\nconst colorTexture = loader.load('/textures/color.jpg')\ncolorTexture.colorSpace = THREE.SRGBColorSpace\nconst material = new THREE.MeshStandardMaterial({ map: colorTexture })` },
      { name: 'style.css', content: css },
    ],
  },
  {
    title: '3D Text',
    description: 'Extruded 3D typography using a font and TextGeometry.',
    tag: 'Geometry',
    image: 'https://picsum.photos/seed/text3d/600/400',
    files: [
      { name: 'index.html', content: html('3D Text') },
      { name: 'script.js', content: `const fontLoader = new FontLoader()\nfontLoader.load('/fonts/helvetiker.json', (font) => {\n  const geometry = new TextGeometry('THREE.JS', { font, size: 0.5, depth: 0.2 })\n  geometry.center()\n})` },
      { name: 'style.css', content: css },
    ],
  },
  {
    title: 'Lights',
    description: 'Ambient, directional, point and spot lights in a scene.',
    tag: 'Lighting',
    image: 'https://picsum.photos/seed/lights/600/400',
    files: [
      { name: 'index.html', content: html('Lights') },
      { name: 'script.js', content: `const ambient = new THREE.AmbientLight(0xffffff, 0.5)\nconst point = new THREE.PointLight(0xff9000, 1.5)\npoint.position.set(1, -0.5, 1)\nscene.add(ambient, point)` },
      { name: 'style.css', content: css },
    ],
  },
  {
    title: 'Shadows',
    description: 'Real-time shadow mapping with configurable cameras.',
    tag: 'Lighting',
    image: 'https://picsum.photos/seed/shadows/600/400',
    files: [
      { name: 'index.html', content: html('Shadows') },
      { name: 'script.js', content: `renderer.shadowMap.enabled = true\ndirectionalLight.castShadow = true\nsphere.castShadow = true\nplane.receiveShadow = true` },
      { name: 'style.css', content: css },
    ],
  },
  {
    title: 'Haunted House',
    description: 'A small spooky scene: house, graves, fog and ghosts.',
    tag: 'Scene',
    image: 'https://picsum.photos/seed/haunted/600/400',
    files: [
      { name: 'index.html', content: html('Haunted House') },
      { name: 'script.js', content: `scene.fog = new THREE.Fog('#262837', 1, 15)\nconst ghost = new THREE.PointLight('#ff00ff', 6, 3)\nscene.add(ghost)` },
      { name: 'style.css', content: css },
    ],
  },
  {
    title: 'Particles',
    description: 'Thousands of animated points forming a particle system.',
    tag: 'Particles',
    image: 'https://picsum.photos/seed/particles/600/400',
    files: [
      { name: 'index.html', content: html('Particles') },
      { name: 'script.js', content: `const particles = new THREE.Points(geometry, material)\nfor (let i = 0; i < count; i++) {\n  positions[i * 3 + 1] = Math.random() * 20 - 10\n}` },
      { name: 'style.css', content: css },
    ],
  },
  {
    title: 'Galaxy',
    description: 'A parametric, spinning galaxy generator made of points.',
    tag: 'Particles',
    image: 'https://picsum.photos/seed/galaxy/600/400',
    files: [
      { name: 'index.html', content: html('Galaxy') },
      { name: 'script.js', content: `const radius = Math.random() * params.radius\nconst branchAngle = (i % params.branches) / params.branches * Math.PI * 2\npositions[i3] = Math.cos(branchAngle + spin) * radius\npositions[i3 + 2] = Math.sin(branchAngle + spin) * radius` },
      { name: 'style.css', content: css },
    ],
  },
  {
    title: 'Physics',
    description: 'Rigid-body physics with collisions using cannon-es.',
    tag: 'Physics',
    image: 'https://picsum.photos/seed/physics/600/400',
    files: [
      { name: 'index.html', content: html('Physics') },
      { name: 'script.js', content: `const world = new CANNON.World()\nworld.gravity.set(0, -9.82, 0)\nconst sphereBody = new CANNON.Body({ mass: 1, shape: new CANNON.Sphere(0.5) })\nworld.addBody(sphereBody)` },
      { name: 'style.css', content: css },
    ],
  },
  {
    title: 'Scroll Animation',
    description: 'Sync the 3D scene to page scroll for a scrollytelling feel.',
    tag: 'Interaction',
    image: 'https://picsum.photos/seed/scroll/600/400',
    files: [
      { name: 'index.html', content: html('Scroll Animation') },
      { name: 'script.js', content: `window.addEventListener('scroll', () => {\n  scrollY = window.scrollY\n  const section = Math.round(scrollY / sizes.height)\n})\ncamera.position.y = -scrollY / sizes.height * objectsDistance` },
      { name: 'style.css', content: css },
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
          <h1 className="text-white text-4xl font-black tracking-[0.15em] uppercase mb-2">Projects</h1>
          <p className="text-gray-400 font-mono mb-8">Notes and projects with THREE.JS — click a card to open it.</p>

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
              onClick={() => {
                setShowCode(false)
                setSelected(null)
              }}
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