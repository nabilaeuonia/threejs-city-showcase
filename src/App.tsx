import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import City from './components/City'
import CameraRig from './components/CameraRig'
import Gallery from './components/Gallery'
import Landing from './components/Landing'
import IdleCamera from './components/IdleCamera'
import Cars from './components/Cars'
import GalleryCamera from './components/GalleryCamera'
import Stars from './components/Stars'

type Phase = 'landing' | 'entering' | 'gallery'

export default function App() {
  const [Phase, setPhase] = useState<Phase>('landing')

  return (
    <div className="w-screen h-screen relative">
      <Canvas
        shadows
        camera={{ fov: 60, near: 0.1, far: 500, position: [0, 2.2, 25] }}
        gl={{ antialias: true, toneMappingExposure: 1.8 }}
      >
        <fog attach="fog" args={['#020205', 22, 150]} />
        <color attach="background" args={['#020205']} />

        <ambientLight intensity={0.12} />
        <directionalLight position={[10, 30, 10]} intensity={0.25} color="#8899ff" />
        <hemisphereLight args={['#334', '#010104', 0.3]} />

        <Stars />
        <City />
        <Cars />

        {Phase === 'landing' && <IdleCamera />}
        {Phase === 'entering' && (
          <CameraRig duration={5} onFinish={() => setPhase('gallery')} />
        )}
        {Phase === 'gallery' && <GalleryCamera />}

        <EffectComposer>
          <Bloom intensity={0.8} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
        </EffectComposer>
      </Canvas>

      {Phase === 'landing' && (
        <Landing onStart={() => setPhase('entering')} />
      )}

      {Phase === 'gallery' && <Gallery />}

      {Phase === 'entering' && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-[0.3em] font-mono uppercase">
          Loading projects...
        </div>
      )}
    </div>
  )
}
