import './globals.css'

export const metadata = {
  title: 'Chúc Mừng 8/3 🌸',
  description: 'Thiệp chúc mừng Ngày Quốc Tế Phụ Nữ 8/3',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Quicksand:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
