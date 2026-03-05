'use client'
const ORBIT_FLOWERS = ['🌸', '🌺', '🌹', '🌷', '💐', '🌸', '🌺', '🌹']
export default function SlideFinale({ restart, data = {}, image }) {
  const heading = data.heading ?? 'Chúc Mừng 8/3!'
  const text = data.text ?? 'Chúc chị — người con gái tuyệt vời, mạnh mẽ và rực rỡ — luôn hạnh phúc, luôn toả sáng, và luôn biết rằng chị xứng đáng được yêu thương.'
  const badge = data.badge ?? '🎀 Happy Women\'s Day 🎀'
  const date = data.date ?? '08 · 03 · 2026'
  return (
    <div className="flex flex-col items-center gap-8 text-center max-w-lg w-full">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {ORBIT_FLOWERS.map((emoji, i) => {
          const angle = (i / ORBIT_FLOWERS.length) * 360
          const rad = (angle * Math.PI) / 180
          return (
            <span key={i} className="absolute text-3xl" style={{ top: `${50 + 40 * Math.sin(rad)}%`, left: `${50 + 40 * Math.cos(rad)}%`, transform: 'translate(-50%, -50%)', animation: 'floatHeart ease-in-out infinite', animationDuration: `${2 + (i % 3) * 0.4}s`, animationDelay: `${i * 0.15}s` }}>
              {emoji}
            </span>
          )
        })}
        {image ? (
          <div className="relative w-20 h-20 rounded-full overflow-hidden ring-3 ring-pink-400/60 shadow-lg shadow-pink-500/30 z-10" style={{ animation: 'heartbeat 1.4s ease-in-out infinite' }}>
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        ) : (
          <span className="text-5xl z-10" style={{ animation: 'heartbeat 1.4s ease-in-out infinite' }}>💗</span>
        )}
      </div>
      <div>
        <p className="font-display text-5xl md:text-6xl text-pink-300 glow-text leading-tight mb-2">{heading}</p>
        <p className="font-body text-pink-100/70 text-base max-w-sm leading-relaxed mx-auto">{text}</p>
      </div>
      <div className="glass-card shimmer rounded-3xl px-8 py-6 w-full">
        <p className="font-display text-2xl text-rose-300 mb-2">{badge}</p>
        <p className="font-body text-pink-100/60 text-sm">{date}</p>
      </div>
      <button onClick={restart} className="click-btn opacity-70 hover:opacity-100"><span>Xem lại từ đầu 🔄</span><div className="btn-ring" /></button>
    </div>
  )
}
