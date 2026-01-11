'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // LOGIN TANPA SIDEBAR
  if (pathname === '/admin/login') return <>{children}</>

  const isDashboard = pathname === '/admin/dashboard'
  const isProfile = pathname.startsWith('/admin/profile/')
  const slug = pathname.split('/')[3]

  // Fungsi untuk menentukan hover berdasarkan halaman
  const getHoverClass = (href) => {
    if (isProfile && href.includes('/profile/')) {
      return 'bg-pink-600/30 text-pink-300'
    }
    if (isDashboard && href.includes('/dashboard')) {
      return 'bg-green-600/25 text-green-100'
    }
    return 'bg-violet-600/20 text-white' // default
  }

  return (
    <div className="h-screen w-full flex overflow-hidden text-white">

      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          w-56 md:w-64
          bg-linear-to-b
          from-[#05040a]
          via-[#0b0716]
          to-[#120a22]
          border-r border-violet-500/15
          p-6 flex flex-col
          transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* LOGO */}
        <div className="flex flex-col items-center mb-10 shrink-0">
          <div
            className="
              w-14 h-14 rounded-xl
              bg-violet-600
              shadow-[0_0_20px_rgba(139,92,246,0.7)]
              flex items-center justify-center text-xl
            "
          >
            📊
          </div>
          <span className="mt-3 font-semibold tracking-wide text-white">
            Admin Panel
          </span>
        </div>

        {/* MENU */}
        <nav className="flex flex-col justify-between flex-1">
          <div className="flex flex-col gap-2">
            <MenuLink
              href="/admin/dashboard"
              active={isDashboard}
              hoverClass={getHoverClass('/admin/dashboard')}
            >
              🏠 Dashboard
            </MenuLink>

            {isDashboard && (
              <MenuLink
                href="/admin/profiles/create"
                hoverClass={getHoverClass('/admin/profiles/create')}
              >
                ➕ Tambah Profil
              </MenuLink>
            )}

            {isProfile && slug && (
              <>
                <MenuLink
                  href={`/admin/profile/${slug}`}
                  active={pathname === `/admin/profile/${slug}`}
                  hoverClass={getHoverClass(`/admin/profile/${slug}`)}
                >
                  👤 Profil
                </MenuLink>
                <MenuLink
                  href={`/admin/profile/${slug}/sertifikat`}
                  active={pathname === `/admin/profile/${slug}/sertifikat`}
                  hoverClass={getHoverClass(`/admin/profile/${slug}/sertifikat`)}
                >
                  📄 Sertifikat
                </MenuLink>
              </>
            )}
          </div>

          {/* LOGOUT */}
          <Link
            href="/admin/login"
            className="
              mt-6 px-4 py-3 rounded-xl text-center font-medium
              text-red-300 bg-red-500/15 hover:bg-red-500/25
              transition
            "
          >
            🚪 Logout
          </Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <div
        className="
          flex-1 ml-0 md:ml-64 flex flex-col
          bg-linear-to-br
          from-[#120b2e]
          via-purple-950
          to-fuchsia-950
        "
      >
        {/* HEADER MOBILE */}
        <header
          className="
            md:hidden h-14 flex items-center gap-4 px-4
            bg-[#120b2e]/80 backdrop-blur
            border-b border-violet-500/20
          "
        >
          <button className="text-2xl" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <span className="font-semibold tracking-wide">Admin Panel</span>
        </header>

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}

/* MENU LINK */
function MenuLink({ href, children, active, hoverClass }) {
  return (
    <Link
      href={href}
      className={`
        px-4 py-3 rounded-xl font-medium transition
        ${active
          ? 'bg-violet-600/25 text-white shadow-[0_0_12px_rgba(139,92,246,0.5)]'
          : `text-white/70 bg-white/5 hover:${hoverClass || 'bg-violet-600/20 text-white'}`}
      `}
    >
      {children}
    </Link>
  )
}
