import db from '@/lib/db'
import { NextResponse } from 'next/server'

/* ================= GET ================= */
export async function GET() {
  const [profiles] = await db.query(
    'SELECT id, name, slug FROM profiles ORDER BY name ASC'
  )

  return NextResponse.json(profiles)
}

/* ================= POST ================= */
export async function POST(req) {
  try {
    const form = await req.formData()

    const name = form.get('name')
    const slug = form.get('slug')

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Nama dan slug wajib diisi' },
        { status: 400 }
      )
    }

    await db.query(
      'INSERT INTO profiles (name, slug) VALUES (?, ?)',
      [name, slug]
    )

    return NextResponse.redirect(
      new URL('/admin/dashboard', req.url)
    )

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Gagal menambahkan profile' },
      { status: 500 }
    )
  }
}
