'use client'
export default function SlideIntro({ next, data = {} }) {
  const badge = data.badge ?? 'Ngày Quốc Tế Phụ Nữ · 8/3/2026'
  const heading = data.heading ?? 'Chúc Mừng'
  const subheading = data.subheading ?? '8 tháng 3 💖'
  const desc = data.desc ?? 'Hôm nay là ngày đặc biệt dành cho những người phụ nữ tuyệt vời.'
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="text-7xl animate-bounce" style={{ animationDuration: '2s' }}>🌸</div>
      <div>
        <p className="font-body text-pink-300 tracking-widest uppercase text-sm mb-3">{badge}</p>
        <h1 className="font-display text-6xl md:text-8xl text-pink-200 glow-text leading-tight">{heading}</h1>
        <h2 className="font-display text-4xl md:text-6xl text-rose-300 glow-text-soft mt-2">{subheading}</h2>
      </div>
      <p className="font-body text-pink-100/70 text-lg max-w-sm leading-relaxed">{desc}</p>
      <button onClick={next} className="click-btn group mt-4">
        <span>Bắt đầu 🌷</span>
        <div className="btn-ring" />
      </button>
    </div>
  )
}
