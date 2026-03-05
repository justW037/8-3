'use client'
const FLOWERS = ['🌸', '💖', '🌸', '💖', '🌸']
export default function SlideQuote({ next, data = {} }) {
  const quote = data.quote ?? '"Những người phụ nữ mạnh mẽ không được sinh ra — họ được tôi luyện qua từng thử thách, từng nụ cười và từng giọt nước mắt."'
  const quoteAuthor = data.quoteAuthor ?? '— Dành tặng chị 🌷'
  const title = data.title ?? 'Sức Mạnh Của Chị'
  const text = data.text ?? 'Chị không cần ai định nghĩa sức mạnh của chị. Mỗi ngày chị thức dậy, tiếp tục bước đi, nở nụ cười — đó đã là điều phi thường rồi.'
  return (
    <div className="flex flex-col items-center gap-8 text-center max-w-lg w-full">
      <div className="flex items-center gap-2 text-3xl">
        {FLOWERS.map((e, i) => (
          <span key={i} style={{ animation: 'floatHeart ease-in-out infinite', animationDuration: `${1.8 + i * 0.25}s`, animationDelay: `${i * 0.2}s` }}>{e}</span>
        ))}
      </div>
      <blockquote className="glass-card shimmer rounded-3xl px-8 py-10 w-full">
        <p className="font-display text-2xl md:text-3xl text-pink-200 glow-text-soft leading-relaxed">{quote}</p>
        <div className="mt-4 text-pink-400/60 font-body text-sm">{quoteAuthor}</div>
      </blockquote>
      <div className="glass-card shimmer rounded-2xl px-7 py-6 w-full">
        <h3 className="font-display text-2xl text-rose-300 mb-3">{title}</h3>
        <p className="font-body text-pink-100/80 text-sm leading-relaxed">{text}</p>
      </div>
      <button onClick={next} className="click-btn"><span>Lời cuối 💟</span><div className="btn-ring" /></button>
    </div>
  )
}
