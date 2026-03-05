'use client'

import { useCallback, useState } from 'react'
import Background from '@/components/Background'
import SlideIntro from '@/components/slides/SlideIntro'
import SlideHeart from '@/components/slides/SlideHeart'
import SlideWishes from '@/components/slides/SlideWishes'
import SlideQuote from '@/components/slides/SlideQuote'
import SlideFinale from '@/components/slides/SlideFinale'

const SLIDE_DEFS = [
  { id: 'intro', bg: 'from-[#0d001a] via-[#1a0022] to-[#2d0035]', Component: SlideIntro },
  { id: 'heart', bg: 'from-[#1a0010] via-[#2d0020] to-[#1a0030]', Component: SlideHeart },
  { id: 'wishes', bg: 'from-[#150030] via-[#200040] to-[#0d001a]', Component: SlideWishes },
  { id: 'quote', bg: 'from-[#0d001a] via-[#1a0028] to-[#200015]', Component: SlideQuote },
  { id: 'finale', bg: 'from-[#1a0010] via-[#2d0030] to-[#0d0020]', Component: SlideFinale },
]

export default function ClientViewPage({ data }) {
  const [slideIndex, setSlideIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [dir, setDir] = useState('in')

  const transition = useCallback(
    (nextIndex) => {
      if (animating) return
      setAnimating(true)
      setDir('out')
      setTimeout(() => {
        setSlideIndex(nextIndex)
        setDir('in')
        setTimeout(() => setAnimating(false), 700)
      }, 500)
    },
    [animating]
  )

  const next = useCallback(
    () => transition(Math.min(slideIndex + 1, SLIDE_DEFS.length - 1)),
    [slideIndex, transition]
  )
  const restart = useCallback(() => transition(0), [transition])

  const { bg, id, Component } = SLIDE_DEFS[slideIndex]
  const progress = ((slideIndex + 1) / SLIDE_DEFS.length) * 100
  const slideData = data?.[id] || {}
  const image = data?.image || null

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden bg-gradient-to-br ${bg}`}
      style={{ transition: 'background 0.8s ease' }}
    >
      <Background />

      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-rose-400"
          style={{ width: `${progress}%`, transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </div>

      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center gap-2">
        {SLIDE_DEFS.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-500 ${
              i === slideIndex ? 'w-6 h-2 bg-pink-400' : 'w-2 h-2 bg-white/25'
            }`}
          />
        ))}
      </div>

      <div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16"
        style={{
          opacity: dir === 'out' ? 0 : 1,
          transform: dir === 'out' ? 'translateY(30px) scale(0.97)' : 'translateY(0) scale(1)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <Component next={next} restart={restart} data={slideData} image={image} />
      </div>
    </div>
  )
}
