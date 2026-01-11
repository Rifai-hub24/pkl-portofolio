import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Portofolio Kami',
  description: 'Portofolio Rifa’i, Iqbal, dan Zaki',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
