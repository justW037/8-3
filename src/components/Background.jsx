'use client'

const PETALS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${(i * 4.7 + 3) % 100}%`,
  fontSize: `${14 + (i % 5) * 4}px`,
  animationDuration: `${8 + (i % 6) * 2}s`,
  animationDelay: `${(i * 1.3) % 10}s`,
  emoji: ['🌸', '🌺', '🌷', '💮', '🌹'][i % 5],
}))

const STARS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  top: `${(i * 7.1 + 5) % 100}%`,
  left: `${(i * 11.3 + 8) % 100}%`,
  size: `${2 + (i % 3)}px`,
  delay: `${(i * 0.4) % 3}s`,
  color: ['#ff69b4', '#ffb6c1', '#ffd700', '#ff85c2', '#fff'][i % 5],
}))

export default function Background() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(220,20,60,0.2) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(219,112,147,0.18) 0%, transparent 70%)' }}
        />
      </div>
      <div className="fixed inset-0 pointer-events-none z-0">
        {STARS.map((s) => (
          <span key={s.id} className="absolute rounded-full spark" style={{ top: s.top, left: s.left, width: s.size, height: s.size, background: s.color, animationDelay: s.delay }} />
        ))}
      </div>
      <div className="fixed inset-0 pointer-events-none z-0">
        {PETALS.map((p) => (
          <span key={p.id} className="petal fixed select-none" style={{ left: p.left, fontSize: p.fontSize, animationDuration: p.animationDuration, animationDelay: p.animationDelay }}>
            {p.emoji}
          </span>
        ))}
      </div>
    </>
  )
}
