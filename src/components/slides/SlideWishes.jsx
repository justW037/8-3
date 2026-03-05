'use client'
const ICONS = ['🌟', '💪', '😊', '💘', '✨', '🌸', '💫', '🎯', '🌈', '🎀']
const DEFAULT_ITEMS = ['Luôn rạng rỡ, tự tin vào vẻ đẹp và giá trị của bản thân','Mạnh mẽ và kiên cường vượt qua mọi thử thách cuộc đời','Mỗi ngày được tràn đầy niềm vui và tiếng cười','Luôn được yêu thương, trân trọng bởi những người xung quanh','Thành công rực rỡ trong mọi điều chị theo đuổi','Cuộc đời luôn đẹp và tươi mới như mùa xuân']

export default function SlideWishes({ next, data = {} }) {
  const title = data.title ?? 'Những Điều Chúc Chị'
  const items = data.items ?? DEFAULT_ITEMS
  return (
    <div className="flex flex-col items-center gap-8 text-center max-w-lg w-full">
      <div className="text-5xl" style={{ animation: 'floatHeart 2s ease-in-out infinite' }}>🌺</div>
      <h2 className="font-display text-4xl text-pink-200 glow-text-soft">{title}</h2>
      <div className="glass-card shimmer rounded-3xl px-7 py-8 w-full">
        <ul className="flex flex-col gap-4 text-left">
          {items.map((text, i) => (
            <li key={i} className="flex items-start gap-3 text-pink-100/85 text-sm font-body" style={{ animation: 'fadeInUp 0.5s ease-out forwards', animationDelay: `${i * 0.1}s`, opacity: 0 }}>
              <span className="text-xl flex-shrink-0">{ICONS[i % ICONS.length]}</span>
              <span className="leading-relaxed pt-0.5">{text}</span>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={next} className="click-btn"><span>Xem thêm 💌</span><div className="btn-ring" /></button>
    </div>
  )
}
