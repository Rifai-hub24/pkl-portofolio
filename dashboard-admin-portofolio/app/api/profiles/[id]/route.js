import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req, { params }) {
  // ✅ WAJIB
  const { id } = await params

  const form = await req.formData()
  const method = form.get('_method')

  // ======================
  // UPDATE
  // ======================
  if (method === 'PUT') {
    const name = form.get('name')
    const slug = form.get('slug')

    await db.query(
      'UPDATE profiles SET name = ?, slug = ? WHERE id = ?',
      [name, slug, id]
    )

    return NextResponse.redirect(
      new URL('/admin/dashboard', req.url)
    )
  }

  // ======================
  // DELETE (yang tadi)
  // ======================
  if (method === 'DELETE') {
    await db.query(
      'DELETE FROM profiles WHERE id = ?',
      [id]
    )

    return NextResponse.redirect(
      new URL('/admin/dashboard', req.url)
    )
  }

  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
