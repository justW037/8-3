import { getCard } from '@/lib/storage'
import { notFound } from 'next/navigation'
import ClientViewPage from '@/components/ClientViewPage'

export async function generateMetadata({ params }) {
  const { id } = await params
  const card = await getCard(id)
  if (!card) return { title: 'Không tìm thấy thiệp' }
  return {
    title: card.intro?.heading || 'Chúc Mừng 8/3 🌸',
    description: card.intro?.desc || 'Thiệp chúc mừng Ngày Quốc Tế Phụ Nữ'
  }
}

export default async function ViewCardPage({ params }) {
  const { id } = await params
  const card = await getCard(id)
  if (!card) notFound()
  return <ClientViewPage data={card} />
}
