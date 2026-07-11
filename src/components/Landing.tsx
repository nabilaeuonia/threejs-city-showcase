import { useState } from 'react'

type Props = {
  onStart: () => void
}

export default function Landing({ onStart }: Props) {
  const [transitioning, setTransitioning] = useState(false)

  const handleStart = () => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(onStart, 500)
  }

  return (
    <div
      className="fixed inset-0 z-20 flex flex-col items-center justify-center text-center"
      style={{ pointerEvents: transitioning ? 'none' : 'auto' }}
    >
      <div
        className={`animated-text-container flex flex-col items-center justify-center${
          transitioning ? ' transitioning' : ''
        }`}
      >
        <h1 className="main-title">ANIMATIONS</h1>
        <p className="wavy-text">WITH THREE.JS</p>

        <p className="description-text">
          Notes and projects with{' '}
          <span className="description-link">THREE.JS</span>
        </p>

        <div
          className="view-projects-button"
          onClick={handleStart}
          role="button"
        >
          VIEW PROJECTS
        </div>
      </div>
    </div>
  )
}
