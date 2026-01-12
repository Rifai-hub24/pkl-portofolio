import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req) {
  try {
    const { id } = await req.json()

    await db.query(
      'UPDATE admins SET role = "admin" WHERE id = ?',
      [id]
    )

    return NextResponse.json({ message: 'Berhasil jadi admin' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Gagal ubah role' },
      { status: 500 }
    )
  }
}
