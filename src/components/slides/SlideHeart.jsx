'use client'
export default function SlideHeart({ next, data = {}, image }) {
  const title = data.title ?? 'Chị Thật Đặc Biệt'
  const text = data.text ?? 'Trong cuộc đời này, có những người con gái mang theo ánh sáng riêng của mình — và chị chính là một trong số đó.'
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-40 h-40 rounded-full bg-pink-500/20 animate-ping" style={{ animationDuration: '2.5s' }} />
        <div className="absolute w-28 h-28 rounded-full bg-rose-500/25 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
        {image ? (
          <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-pink-400/60 shadow-xl shadow-pink-500/30" style={{ animation: 'heartbeat 1.4s ease-in-out infinite' }}>
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        ) : (
          <span className="text-8xl relative" style={{ animation: 'heartbeat 1.4s ease-in-out infinite' }}>💗</span>
        )}
      </div>
      <div className="glass-card shimmer rounded-3xl px-8 py-8 max-w-md">
        <h2 className="font-display text-3xl text-pink-200 glow-text-soft mb-4">{title}</h2>
        <p className="font-body text-pink-100/80 text-base leading-relaxed">{text}</p>
      </div>
      <button onClick={next} className="click-btn"><span>Tiếp theo ✨</span><div className="btn-ring" /></button>
    </div>
  )
}
