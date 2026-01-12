'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DaftarSekarangPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.message || 'Terjadi kesalahan')
      return
    }

    setSuccess('Pendaftaran berhasil. Silakan tunggu persetujuan admin.')

    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-[#120b2e] via-purple-950 to-fuchsia-950 px-4">
      <div className="w-full max-w-md bg-[#1a0e3b]/90 backdrop-blur-lg rounded-3xl p-10 shadow-xl shadow-purple-700/50">
        <h1 className="text-3xl font-bold text-white text-center mb-8 tracking-wide">
          Daftar Sekarang
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="px-5 py-4 rounded-2xl bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="px-5 py-4 rounded-2xl bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="px-5 py-4 rounded-2xl bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full py-4 rounded-2xl bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold shadow-lg shadow-purple-700/40 transition disabled:opacity-50"
          >
            {loading ? 'Mendaftar...' : 'Daftar'}
          </button>

          {error && (
            <p className="text-red-400 mt-3 text-center">{error}</p>
          )}

          {success && (
            <p className="text-green-400 mt-3 text-center">{success}</p>
          )}
        </form>

        {/* Kembali ke Login */}
        <p className="mt-6 text-center text-white/70">
          Sudah punya akun?{' '}
          <span
            onClick={() => router.push('/admin/login')}
            className="text-purple-400 font-semibold cursor-pointer hover:underline"
          >
            Kembali ke Login
          </span>
        </p>
      </div>
    </div>
  )
}
