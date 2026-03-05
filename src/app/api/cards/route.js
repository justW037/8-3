import { nanoid } from 'nanoid'
import { saveCard } from '@/lib/storage'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { data } = body

    if (!data || !data.intro) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    const id = nanoid(8)
    saveCard(id, data)

    const baseUrl = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'localhost:3000'
    const protocol = request.headers.get('x-forwarded-proto') || 'http'
    const url = `${protocol}://${baseUrl}/v/${id}`

    return NextResponse.json({ id, url })
  } catch (err) {
    console.error('POST /api/cards error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
