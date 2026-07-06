import { motion } from 'framer-motion'

type Props = {
  onStart: () => void
}

export default function Landing({ onStart }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none"
    >
      <h1 className="text-blue-400 font-extrabold tracking-tight text-4xl sm:text-8xl drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
        TUGAS MAGANG
      </h1>
      <p className="text-gray-400 text-lg sm:text-2xl tracking-[0.3em] mt-2">
        WITH THREE.JS
      </p>

      <p className="text-gray-400 text-sm mt-8">
        Project by <span className="text-white">Enuma Technology</span>
      </p>

      <motion.button
        onClick={onStart}
        className="pointer-events-auto mt-5 px-8 py-4 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white hover:text-black transition"
        animate={{
          scale: [1, 1.35, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        View Projects
      </motion.button>
    </motion.div>
  )
}