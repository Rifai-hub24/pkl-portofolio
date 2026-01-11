export const runtime = 'nodejs'

import db from '@/lib/db'
import fs from 'fs'
import path from 'path'
import { redirect } from 'next/navigation'

export async function POST(req) {
  const form = await req.formData()

  const profile_id = form.get('profile_id')
  const slug = form.get('slug')
  const nama_sertifikat = form.get('nama_sertifikat')
  const foto = form.get('foto')

  // 🔴 VALIDASI WAJIB
  if (!profile_id || !nama_sertifikat) {
    throw new Error('Data tidak lengkap')
  }

  let fotoPath = null

  if (foto && foto.name) {
    const buffer = Buffer.from(await foto.arrayBuffer())
    const fileName = Date.now() + '-' + foto.name
    const uploadDir = path.join(process.cwd(), 'public/uploads')

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    fs.writeFileSync(path.join(uploadDir, fileName), buffer)
    fotoPath = `/uploads/${fileName}`
  }

  await db.query(
    `INSERT INTO sertifikats 
     (profile_id, foto, nama_sertifikat, created_at, updated_at)
     VALUES (?, ?, ?, NOW(), NOW())`,
    [profile_id, fotoPath, nama_sertifikat]
  )

  redirect(`/admin/profile/${slug}/sertifikat`)
}
