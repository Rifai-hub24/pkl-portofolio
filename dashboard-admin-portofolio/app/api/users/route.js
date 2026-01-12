import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
  try {
    const [users] = await db.query(`
      SELECT id, name, email, role
      FROM admins
      ORDER BY id DESC
    `)

    return NextResponse.json(users)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Gagal mengambil data user' },
      { status: 500 }
    )
  }
}
