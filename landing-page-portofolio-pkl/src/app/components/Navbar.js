'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    async function loadProfiles() {
      try {
        const res = await fetch('/api/profiles')
        const data = await res.json()
        setProfiles(data)
      } catch (err) {
        console.error('Gagal ambil data navbar')
      }
    }

    loadProfiles()
  }, [])

  return (
    <nav className="navbar">
      <strong>Portofolio</strong>
      <div className="menu">
        <Link href="/" className={pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        {profiles.map(p => (
          <Link
            key={p.slug}
            href={`/profile/${p.slug}`}
            className={pathname === `/profile/${p.slug}` ? 'active' : ''}
          >
            {p.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}
