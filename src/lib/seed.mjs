/**
 * Seed script: creates pre-built template cards in data/cards/
 * Run once: node src/lib/seed.js
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..')
const CARDS_DIR = path.join(ROOT, 'data', 'cards')

// Import templates inline to avoid import alias issues in standalone script
const DEFAULT_DATA = {
  intro: { badge: 'Ngày Quốc Tế Phụ Nữ · 8/3/2026', heading: 'Chúc Mừng', subheading: '8 tháng 3 💖', desc: 'Hôm nay là ngày đặc biệt dành cho những người phụ nữ tuyệt vời.' },
  heart: { title: 'Chị Thật Đặc Biệt', text: 'Trong cuộc đời này, có những người con gái mang theo ánh sáng riêng của mình — và chị chính là một trong số đó.' },
  wishes: { title: 'Những Điều Chúc Chị', items: ['Luôn rạng rỡ, tự tin vào vẻ đẹp và giá trị của bản thân','Mạnh mẽ và kiên cường vượt qua mọi thử thách cuộc đời','Mỗi ngày được tràn đầy niềm vui và tiếng cười','Luôn được yêu thương, trân trọng bởi những người xung quanh','Thành công rực rỡ trong mọi điều chị theo đuổi','Cuộc đời luôn đẹp và tươi mới như mùa xuân'] },
  quote: { quote: '"Những người phụ nữ mạnh mẽ không được sinh ra — họ được tôi luyện qua từng thử thách, từng nụ cười và từng giọt nước mắt."', quoteAuthor: '— Dành tặng chị 🌷', title: 'Sức Mạnh Của Chị', text: 'Chị không cần ai định nghĩa sức mạnh của chị. Mỗi ngày chị thức dậy, tiếp tục bước đi, nở nụ cười — đó đã là điều phi thường rồi.' },
  finale: { heading: 'Chúc Mừng 8/3!', text: 'Chúc chị — người con gái tuyệt vời, mạnh mẽ và rực rỡ — luôn hạnh phúc, luôn toả sáng, và luôn biết rằng chị xứng đáng được yêu thương.', badge: '🎀 Happy Women\'s Day 🎀', date: '08 · 03 · 2026' },
}

const TEMPLATES = [
  { id: 'default', data: DEFAULT_DATA },
  { id: 'romantic', data: {
    intro: { badge: 'Ngày Quốc Tế Phụ Nữ · 8/3/2026', heading: 'Chúc Mừng', subheading: '8 tháng 3 💖', desc: 'Hôm nay anh muốn dành những lời yêu thương nhất cho em.' },
    heart: { title: 'Anh Yêu Em', text: 'Trong vô vàn ngôi sao trên trời, anh chọn em — ngôi sao sáng nhất, ấm áp nhất và đặc biệt nhất trong cuộc đời anh.' },
    wishes: { title: 'Anh Chúc Em', items: ['Luôn rạng rỡ và tự tin vào vẻ đẹp của bản thân','Được yêu thương và trân trọng mỗi ngày','Nụ cười luôn thường trực trên môi','Hạnh phúc trong mọi khoảnh khắc bên nhau','Thành công và toả sáng trong mọi điều em mong ước','Cuộc đời luôn ngọt ngào như tình yêu của chúng mình'] },
    quote: { quote: '"Em không chỉ là người anh yêu — em là người anh chọn, mỗi ngày, mỗi khoảnh khắc, mãi mãi."', quoteAuthor: '— Gửi em yêu dấu 💕', title: 'Em Là Tất Cả', text: 'Bên cạnh em, anh học được rằng hạnh phúc không phải là điểm đến, mà là mỗi khoảnh khắc nhỏ xinh ta cùng chia sẻ.' },
    finale: { heading: 'Anh Yêu Em 💗', text: 'Không phải chỉ hôm nay, không phải chỉ ngày 8/3 — mà là mỗi giây phút, khi mặt trời mọc, khi sao đêm lên, anh yêu em.', badge: '🎀 Happy Women\'s Day 🎀', date: '08 · 03 · 2026' },
  }},
  { id: 'mom', data: {
    intro: { badge: 'Ngày Quốc Tế Phụ Nữ · 8/3/2026', heading: 'Con Yêu Mẹ', subheading: '8 tháng 3 💐', desc: 'Ngày hôm nay con muốn gửi đến mẹ tất cả yêu thương.' },
    heart: { title: 'Mẹ Là Tuyệt Vời Nhất', text: 'Trên đời này không ai có thể thay thế mẹ — người đã dành cả cuộc đời để yêu thương và che chở cho con.' },
    wishes: { title: 'Con Chúc Mẹ', items: ['Luôn khỏe mạnh, vui vẻ mỗi ngày','Được hạnh phúc và bình an trong cuộc sống','Nụ cười luôn nở trên môi mẹ','Được yêu thương xứng đáng với những gì mẹ đã cho đi','Mọi ước mong của mẹ đều thành hiện thực','Luôn có con bên cạnh trong mọi lúc mẹ cần'] },
    quote: { quote: '"Trái tim mẹ là ngôi trường đầu tiên dạy con biết yêu thương, và đó mãi là bài học đẹp nhất."', quoteAuthor: '— Con yêu mẹ 💐', title: 'Ơn Nghĩa Sinh Thành', text: 'Mẹ đã hy sinh bao nhiêu để con có ngày hôm nay. Không có lời nào đủ để nói hết tình yêu và lòng biết ơn con dành cho mẹ.' },
    finale: { heading: 'Yêu Mẹ Nhiều! 💗', text: 'Cảm ơn mẹ vì tất cả — vì tình yêu vô bờ, vì sự hy sinh thầm lặng, vì đã là người mẹ tuyệt vời nhất.', badge: '🎀 Happy Women\'s Day 🎀', date: '08 · 03 · 2026' },
  }},
  { id: 'friend', data: {
    intro: { badge: 'Ngày Quốc Tế Phụ Nữ · 8/3/2026', heading: 'Happy 8/3!', subheading: 'Gửi bạn thân ✨', desc: 'Hôm nay là ngày để tôn vinh bạn — một người con gái tuyệt vời!' },
    heart: { title: 'Bạn Thật Tuyệt Vời', text: 'Có một người bạn như bạn là điều may mắn nhất — bạn luôn toả sáng bằng chính cách riêng của mình.' },
    wishes: { title: 'Chúc Bạn', items: ['Tự tin toả sáng theo cách riêng của bạn','Mạnh mẽ chinh phục mọi mục tiêu','Cười thật nhiều, buồn thật ít','Luôn có người bên cạnh khi cần','Thành công rực rỡ trong sự nghiệp và cuộc sống','Mỗi ngày đều là một ngày tuyệt vời'] },
    quote: { quote: '"Phụ nữ mạnh mẽ nhất không phải là người không bao giờ gục ngã — mà là người luôn đứng dậy sau mỗi lần vấp ngã."', quoteAuthor: '— Gửi bạn thân mến 🌷', title: 'Girl Power! 💪', text: 'Bạn xứng đáng được hạnh phúc, xứng đáng với mọi điều tốt đẹp nhất. Đừng bao giờ quên điều đó nhé!' },
    finale: { heading: 'Happy Women\'s Day! 🎉', text: 'Chúc bạn — người con gái tuyệt vời — luôn hạnh phúc, luôn toả sáng, và luôn là chính mình!', badge: '🎀 Happy Women\'s Day 🎀', date: '08 · 03 · 2026' },
  }},
]

// Seed
if (!fs.existsSync(CARDS_DIR)) {
  fs.mkdirSync(CARDS_DIR, { recursive: true })
}

for (const tpl of TEMPLATES) {
  const filePath = path.join(CARDS_DIR, `${tpl.id}.json`)
  fs.writeFileSync(filePath, JSON.stringify(tpl.data), 'utf-8')
  console.log(`✓ Seeded: ${tpl.id} → ${filePath}`)
}

console.log('\n🌸 All templates seeded!')
