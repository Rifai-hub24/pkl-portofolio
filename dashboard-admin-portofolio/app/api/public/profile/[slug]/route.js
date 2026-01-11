import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req, context) {
  try {
    const { slug } = await context.params // WAJIB pakai await di Next.js 16

    // 1️⃣ Ambil data profile + detail
    const [rows] = await db.query(
      `SELECT 
         p.id, 
         p.name, 
         p.slug,
         p.github, 
         d.foto, 
         d.tentang
       FROM profiles p
       LEFT JOIN profile_details d
         ON d.profile_id = p.id
       WHERE p.slug = ?`,
      [slug]
    )

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const profile = rows[0]

    // 2️⃣ Ambil semua sertifikats terkait profile (termasuk deskripsi)
    const [certs] = await db.query(
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
        WHERE profile_id = ?`,
      [profile.id]
    )


    profile.sertifikats = certs || []

    // 3️⃣ Kirim data profile + sertifikats
    return NextResponse.json(profile)

  } catch (err) {
    console.error('API PROFILE ERROR:', err)
    return NextResponse.json(
      { error: 'Internal Server Error', message: err.message },
      { status: 500 }
    )
  }
}
