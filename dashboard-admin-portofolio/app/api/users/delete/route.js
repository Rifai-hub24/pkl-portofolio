import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req) {
  try {
    const { id } = await req.json()

    await db.query(
      'DELETE FROM admins WHERE id = ?',
      [id]
    )

    return NextResponse.json({ message: 'User dihapus' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Gagal hapus user' },
      { status: 500 }
    )
  }
}
