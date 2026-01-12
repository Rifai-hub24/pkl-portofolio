import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import db from '@/lib/db'

export async function POST(req) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Semua field wajib diisi' },
        { status: 400 }
      )
    }

    // Cek email sudah terdaftar
    const [exist] = await db.query(
      'SELECT id FROM admins WHERE email = ?',
      [email]
    )

    if (exist.length > 0) {
      return NextResponse.json(
        { message: 'Email sudah terdaftar' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.query(
      `INSERT INTO admins (name, email, password, role)
       VALUES (?, ?, ?, 'pengguna')`,
      [name, email, hashedPassword]
    )

    return NextResponse.json({
      message: 'Pendaftaran berhasil. Silakan menunggu persetujuan admin.'
    })
  } catch (error) {
    console.error('REGISTER ERROR:', error)
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    )
  }
}
