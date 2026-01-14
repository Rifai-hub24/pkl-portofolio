'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [profiles, setProfiles] = useState([])
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  // 🔄 Ambil data profile
  useEffect(() => {
    async function loadProfiles() {
      try {
        const res = await fetch('/api/profiles')
        const data = await res.json()
        setProfiles(data)
      } catch (err) {
        console.error('Gagal ambil data profile')
      }
    }

    loadProfiles()
  }, [])

  // ❌ Tutup accordion kalau klik di luar
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav>
      {/* LOGO / JUDUL */}
      <strong>Portofolio</strong>

      <div className="menu" style={{ display: 'flex', alignItems: 'center' }}>
        {/* HOME */}
        <Link href="/" className={pathname === '/' ? 'active' : ''}>
          Home
        </Link>

        {/* ACCORDION PROFIL */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontWeight: 600,
              marginLeft: '25px',
              cursor: 'pointer',
            }}
          >
            Profil ▾
          </button>

          {open && (
            <div className="nav-accordion">
              {profiles.map((p) => (
                <Link
                  key={p.slug}
                  href={`/profile/${p.slug}`}
                  onClick={() => setOpen(false)}
                  className={pathname === `/profile/${p.slug}` ? 'active' : ''}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}