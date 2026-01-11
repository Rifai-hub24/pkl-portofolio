import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    const { id } = await params // WAJIB pakai await di Next.js 16

    // Ambil sertifikat berdasarkan ID
    const [rows] = await db.query(
      `SELECT 
          id,
          foto AS img, 
          nama_sertifikat AS title, 
          file_pdf, 
          deskripsi,
          nama_penerima,
          nama_kelas,
          penyelenggara,
          status_kelulusan,
          tanggal_terbit,
          masa_berlaku
       FROM sertifikats
       WHERE id = ?`,
      [id]
    )

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (err) {
    console.error('API CERTIFICATE ERROR:', err)
    return NextResponse.json(
      { error: 'Internal Server Error', message: err.message },
      { status: 500 }
    )
  }
}
