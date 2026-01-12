import db from '@/lib/db'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import { signToken } from '@/lib/auth'

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email dan password wajib diisi' },
        { status: 400 }
      )
    }

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

    /* ================= ROLE CHECK (PENTING) ================= */
    if (admin.role !== 'admin') {
      return NextResponse.json(
        { message: 'Akun ini bukan admin' },
        { status: 403 }
      )
    }

    /* ================= PASSWORD CHECK ================= */
    let valid = false

    if (admin.password) {
      valid = await bcrypt.compare(password, admin.password)
    }

    // fallback legacy plaintext
    if (!valid && admin.password === password) {
      const newHash = await bcrypt.hash(password, 10)
      await db.query(
        'UPDATE admins SET password = ? WHERE id = ?',
        [newHash, admin.id]
      )
      valid = true
    }

    if (!valid) {
      return NextResponse.json(
        { message: 'Password salah' },
        { status: 401 }
      )
    }

    /* ================= TOKEN ================= */
    const payload = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1 jam
    }

    const token = signToken(payload)

    const secureFlag =
      process.env.NODE_ENV === 'production' ? 'Secure; ' : ''

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
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    )
  }
}
