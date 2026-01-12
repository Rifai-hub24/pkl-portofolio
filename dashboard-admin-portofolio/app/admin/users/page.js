'use client'

import { useEffect, useState } from 'react'

export default function KelolaUserPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadUsers() {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch {
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  async function makeAdmin(id) {
    if (!confirm('Jadikan user ini sebagai admin?')) return
    await fetch('/api/users/role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    loadUsers()
  }

  async function deleteUser(id) {
    if (!confirm('Yakin hapus user ini?')) return
    await fetch('/api/users/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    loadUsers()
  }

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <p className="text-white/70 text-center mt-32 animate-pulse">
        Memuat data user...
      </p>
    )
  }

  return (
    <div className="space-y-10">
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          👥 Kelola User
        </h1>

        <span className="
          px-4 py-1.5 rounded-full text-sm
          bg-white/10 text-white/70
        ">
          Total: {users.length}
        </span>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {users.length === 0 && (
        <div className="
          flex flex-col items-center justify-center
          py-32 text-center
          border border-dashed border-white/10
          rounded-3xl
        ">
          <div className="
            w-24 h-24 rounded-3xl
            bg-violet-600/20
            flex items-center justify-center
            text-5xl mb-6
            shadow-[0_0_35px_rgba(139,92,246,0.4)]
          ">
            👤
          </div>

          <h2 className="text-xl font-semibold text-white mb-2">
            Belum ada user
          </h2>

          <p className="text-white/60 max-w-sm">
            User yang mendaftar akan muncul di halaman ini
            dan dapat dikelola oleh admin.
          </p>
        </div>
      )}

      {/* ================= GRID USER ================= */}
      {users.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {users.map(user => (
            <div
              key={user.id}
              className="
                group relative
                bg-white/5 backdrop-blur-xl
                border border-white/10
                rounded-3xl p-6
                transition
                hover:-translate-y-1
                hover:shadow-[0_20px_40px_rgba(139,92,246,0.25)]
              "
            >
              {/* ===== ROLE BADGE ===== */}
              <div className="absolute top-4 right-4">
                {user.role === 'admin' ? (
                  <span className="
                    px-3 py-1 rounded-full text-xs font-semibold
                    bg-green-500/20 text-green-400
                  ">
                    Admin
                  </span>
                ) : (
                  <span className="
                    px-3 py-1 rounded-full text-xs font-semibold
                    bg-violet-500/20 text-violet-300
                  ">
                    User
                  </span>
                )}
              </div>

              {/* ===== USER INFO ===== */}
              <h3 className="text-lg font-semibold text-white">
                {user.name}
              </h3>

              <p className="text-sm text-white/60 mt-1 break-all">
                {user.email}
              </p>

              {/* ===== ACTION BUTTON ===== */}
              <div className="flex gap-3 mt-8">
                {user.role !== 'admin' && (
                  <button
                    onClick={() => makeAdmin(user.id)}
                    className="
                      flex-1 py-2.5 rounded-xl text-sm font-medium
                      bg-blue-600/20 text-blue-300
                      hover:bg-blue-600/30
                      transition
                    "
                  >
                    Jadikan Admin
                  </button>
                )}

                <button
                  onClick={() => deleteUser(user.id)}
                  className="
                    flex-1 py-2.5 rounded-xl text-sm font-medium
                    bg-red-600/20 text-red-300
                    hover:bg-red-600/30
                    transition
                  "
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
