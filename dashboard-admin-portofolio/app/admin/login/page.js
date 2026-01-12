'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message)
      return
    }

    router.push('/admin/dashboard')
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-[#120b2e] via-purple-950 to-fuchsia-950 px-4">
      <div className="w-full max-w-md bg-[#1a0e3b]/90 backdrop-blur-lg rounded-3xl p-10 shadow-xl shadow-purple-700/50">
        
        <h1 className="text-3xl font-bold text-white text-center mb-8 tracking-wide">
          Login Admin
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">

          <input
            type="email"
            placeholder="Email admin"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="
              px-5 py-4 rounded-2xl bg-white/10 text-white placeholder-white/60
              border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="
              px-5 py-4 rounded-2xl bg-white/10 text-white placeholder-white/60
              border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500
            "
          />

          <button
            type="submit"
            className="
              mt-3 w-full py-4 rounded-2xl
              bg-linear-to-r from-purple-600 to-purple-700
              hover:from-purple-500 hover:to-purple-600
              text-white font-semibold shadow-lg shadow-purple-700/40
            "
          >
            Login
          </button>

          {error && (
            <p className="text-red-400 mt-3 text-center font-medium">
              {error}
            </p>
          )}
        </form>

        {/* Daftar Sekarang (teks link) */}
        <p className="mt-6 text-center text-white/70 text-sm">
          Belum punya akun?{' '}
          <span
            onClick={() => router.push('/daftar-sekarang')}
            className="text-purple-400 font-semibold cursor-pointer hover:underline"
          >
            Daftar Sekarang
          </span>
        </p>

      </div>
    </div>
  )
}
