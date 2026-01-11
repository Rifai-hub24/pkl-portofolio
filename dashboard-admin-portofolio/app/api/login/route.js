import db from '@/lib/db'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import { signToken } from '@/lib/auth'

export async function POST(req) {
  const { email, password } = await req.json()

  const [rows] = await db.query(
    'SELECT * FROM admins WHERE email = ?',
    [email]
  )

  if (rows.length === 0) {
    return NextResponse.json(
      { message: 'Email tidak ditemukan' },
      { status: 401 }
    )
  }

  const admin = rows[0]
  let valid = false
  if (admin.password) {
    try {
      valid = await bcrypt.compare(password, admin.password)
    } catch (e) {
      valid = false
    }
  }

  // Fallback: if password stored in DB is plaintext (legacy), accept and re-hash it
  if (!valid) {
    const looksHashed = typeof admin.password === 'string' && admin.password.startsWith('$2')
    if (!looksHashed && admin.password === password) {
      // re-hash and update DB for future
      const newHash = await bcrypt.hash(password, 10)
      await db.query('UPDATE admins SET password = ? WHERE id = ?', [newHash, admin.id])
      valid = true
    }
  }

  if (!valid) {
    return NextResponse.json(
      { message: 'Password salah' },
      { status: 401 }
    )
  }

  const payload = {
    id: admin.id,
    email: admin.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1 hour
  }

  const token = signToken(payload)
  const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
  const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax; ${secureFlag}`

  return NextResponse.json(
    { success: true },
    {
      status: 200,
      headers: {
        'Set-Cookie': cookie
      }
    }
  )
}
