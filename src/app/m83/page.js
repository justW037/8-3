'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { TEMPLATES, SLIDE_LABELS, DEFAULT_DATA } from '@/data/templates'

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Compress an image file client-side before sending to server.
 * Resizes to max 400px and moderate quality.
 */
function compressImage(file, maxSize = 400, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let { width, height } = img
        if (width > height) {
          if (width > maxSize) { height = Math.round((height * maxSize) / width); width = maxSize }
        } else {
          if (height > maxSize) { width = Math.round((width * maxSize) / height); height = maxSize }
        }
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(img, 0, 0, width, height)
        let dataUrl = canvas.toDataURL('image/webp', quality)
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality)
        }
        resolve(dataUrl)
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

export default function CreatePage() {
  const [data, setData] = useState(deepClone(DEFAULT_DATA))
  const [selectedTemplate, setSelectedTemplate] = useState('default')
  const [generatedUrl, setGeneratedUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageLoading, setImageLoading] = useState(false)
  const [generating, setGenerating] = useState(false)

  function applyTemplate(templateId) {
    const tpl = TEMPLATES.find((t) => t.id === templateId)
    if (tpl) {
      setData((prev) => ({ ...deepClone(tpl.data), image: prev.image }))
      setSelectedTemplate(templateId)
      setGeneratedUrl('')
    }
  }

  function updateField(slideKey, fieldKey, value) {
    setData((prev) => ({ ...prev, [slideKey]: { ...prev[slideKey], [fieldKey]: value } }))
    setGeneratedUrl('')
  }

  function updateWishItems(value) {
    const items = value.split('\n').filter((l) => l.trim())
    setData((prev) => ({ ...prev, wishes: { ...prev.wishes, items } }))
    setGeneratedUrl('')
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageLoading(true)
    try {
      const compressed = await compressImage(file, 400, 0.7)
      setImagePreview(compressed)
      setData((prev) => ({ ...prev, image: compressed }))
      setGeneratedUrl('')
    } catch (err) {
      console.error('Image compression failed:', err)
    } finally {
      setImageLoading(false)
    }
  }

  function removeImage() {
    setImagePreview(null)
    setData((prev) => { const next = { ...prev }; delete next.image; return next })
    setGeneratedUrl('')
  }

  async function generate() {
    setGenerating(true)
    try {
      const res = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      })
      const result = await res.json()
      if (result.url) {
        setGeneratedUrl(result.url)
      } else {
        alert('Lỗi tạo thiệp: ' + (result.error || 'Unknown'))
      }
      setCopied(false)
    } catch (err) {
      alert('Lỗi kết nối: ' + err.message)
    } finally {
      setGenerating(false)
    }
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const slideKeys = ['intro', 'heart', 'wishes', 'quote', 'finale']

  return (
    <div className="min-h-screen w-full" style={{ background: 'linear-gradient(135deg, #0d001a 0%, #1a0022 20%, #2d0035 40%, #1a0016 60%, #0d0020 80%, #000d1a 100%)' }}>
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-5xl text-pink-200 glow-text mb-3">Tạo Thiệp 8/3 🌸</h1>
          <p className="font-body text-pink-100/60 text-sm">Tuỳ chỉnh nội dung, chọn template, tạo link & QR để gửi tặng</p>
        </div>

        {/* Template Picker */}
        <section className="mb-8">
          <h2 className="font-display text-2xl text-pink-200 glow-text-soft mb-4">Chọn Template</h2>
          <div className="grid grid-cols-2 gap-3">
            {TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => applyTemplate(tpl.id)}
                className={`glass-card rounded-xl px-4 py-3 text-left transition-all duration-300 cursor-pointer ${selectedTemplate === tpl.id ? 'ring-2 ring-pink-400 bg-pink-500/15' : 'hover:bg-white/5'}`}
              >
                <span className="font-body text-sm text-pink-100">{tpl.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Image Upload */}
        <section className="mb-8">
          <h2 className="font-display text-2xl text-pink-200 glow-text-soft mb-4">📷 Ảnh Người Được Chúc</h2>
          <div className="glass-card rounded-2xl p-5">
            <div className="flex flex-col items-center gap-4">
              {(imagePreview || data.image) && (
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full overflow-hidden ring-3 ring-pink-400/50 shadow-lg shadow-pink-500/20">
                    <img src={imagePreview || data.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <button onClick={removeImage} className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500/80 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">✕</button>
                </div>
              )}
              <label className="cursor-pointer">
                <div className={`px-5 py-2.5 rounded-xl font-body text-sm font-semibold transition-all duration-300 ${imageLoading ? 'bg-pink-500/20 text-pink-300/50' : 'bg-pink-500/30 text-pink-200 hover:bg-pink-500/50'}`}>
                  {imageLoading ? '⏳ Đang xử lý...' : imagePreview || data.image ? '🔄 Đổi ảnh' : '📷 Chọn ảnh'}
                </div>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={imageLoading} />
              </label>
              <p className="font-body text-xs text-pink-300/40 text-center">Ảnh được lưu trên server, hiển thị nét 400px. URL luôn ngắn.</p>
            </div>
          </div>
        </section>

        {/* Slide Editors */}
        {slideKeys.map((slideKey) => {
          const labels = SLIDE_LABELS[slideKey]
          const slideData = data[slideKey]
          const fields = Object.keys(labels).filter((k) => k !== '_title')
          return (
            <section key={slideKey} className="mb-6">
              <h3 className="font-display text-xl text-pink-300 glow-text-soft mb-3">{labels._title}</h3>
              <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
                {fields.map((fieldKey) => {
                  if (slideKey === 'wishes' && fieldKey === 'items') {
                    return (
                      <label key={fieldKey} className="flex flex-col gap-1.5">
                        <span className="font-body text-xs text-pink-300/70 uppercase tracking-wider">{labels[fieldKey]}</span>
                        <textarea rows={6} value={slideData.items.join('\n')} onChange={(e) => updateWishItems(e.target.value)} className="input-field font-body text-sm resize-none" />
                      </label>
                    )
                  }
                  const isLong = fieldKey === 'desc' || fieldKey === 'text' || fieldKey === 'quote'
                  return (
                    <label key={fieldKey} className="flex flex-col gap-1.5">
                      <span className="font-body text-xs text-pink-300/70 uppercase tracking-wider">{labels[fieldKey]}</span>
                      {isLong ? (
                        <textarea rows={3} value={slideData[fieldKey]} onChange={(e) => updateField(slideKey, fieldKey, e.target.value)} className="input-field font-body text-sm resize-none" />
                      ) : (
                        <input type="text" value={slideData[fieldKey]} onChange={(e) => updateField(slideKey, fieldKey, e.target.value)} className="input-field font-body text-sm" />
                      )}
                    </label>
                  )
                })}
              </div>
            </section>
          )
        })}

        {/* Generate Button */}
        <div className="flex justify-center mt-8 mb-8">
          <button onClick={generate} disabled={generating} className="click-btn text-lg px-10 py-4">
            <span>{generating ? '⏳ Đang tạo...' : 'Tạo Link & QR 🔗'}</span>
            <div className="btn-ring" />
          </button>
        </div>

        {/* Output */}
        {generatedUrl && (
          <section className="glass-card rounded-3xl p-6 flex flex-col items-center gap-6 mb-10">
            <h3 className="font-display text-2xl text-pink-200 glow-text-soft">Link & QR Code 🎁</h3>

            {/* QR Code — URL is short so QR is always clean */}
            <div className="bg-white rounded-2xl p-4">
              <QRCodeSVG value={generatedUrl} size={280} fgColor="#9b1244" bgColor="#ffffff" level="M" includeMargin />
            </div>

            {/* URL */}
            <div className="w-full flex flex-col gap-2">
              <p className="font-body text-xs text-pink-300/70">🔗 Link chia sẻ (có ảnh nét):</p>
              <div className="flex gap-2">
                <input type="text" readOnly value={generatedUrl} className="input-field font-body text-xs flex-1 select-all" onClick={(e) => e.target.select()} />
                <button onClick={() => copyToClipboard(generatedUrl)} className={`px-4 py-2 rounded-xl font-body text-sm font-semibold transition-all duration-300 cursor-pointer ${copied ? 'bg-green-500/80 text-white' : 'bg-pink-500/30 text-pink-200 hover:bg-pink-500/50'}`}>
                  {copied ? '✓' : 'Copy'}
                </button>
              </div>
            </div>

            <a href={generatedUrl} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-pink-400 underline underline-offset-4 hover:text-pink-300 transition-colors">
              Xem trước trong tab mới ↗
            </a>
          </section>
        )}
      </div>
    </div>
  )
}
