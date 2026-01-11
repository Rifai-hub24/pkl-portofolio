import db from '@/lib/db'
import { redirect } from 'next/navigation'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req, { params }) {
  const { id } = await params
  const formData = await req.formData()
  const slug = req.nextUrl.searchParams.get('slug')

  const tentang = formData.get('tentang')
  const github = formData.get('github') // ✅ AMBIL GITHUB
  const foto = formData.get('foto')

  /* ==========================
     1️⃣ UPDATE TABLE PROFILES
     ========================== */
  await db.query(
    'UPDATE profiles SET github = ? WHERE id = ?',
    [github, id]
  )

  /* ==========================
     2️⃣ HANDLE FOTO
     ========================== */
  let fotoPath = null

  if (foto && foto.size > 0) {
    const bytes = await foto.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const fileName = `${Date.now()}-${foto.name}`
    const uploadPath = path.join(process.cwd(), 'public/uploads', fileName)

    await writeFile(uploadPath, buffer)
    fotoPath = `/uploads/${fileName}`
  }

  /* ==========================
     3️⃣ UPSERT profile_details
     ========================== */
  const [[existing]] = await db.query(
    'SELECT id FROM profile_details WHERE profile_id = ?',
    [id]
  )

  if (existing) {
    await db.query(
      `UPDATE profile_details 
       SET tentang = ?, foto = COALESCE(?, foto)
       WHERE profile_id = ?`,
      [tentang, fotoPath, id]
    )
  } else {
    await db.query(
      `INSERT INTO profile_details (profile_id, foto, tentang)
       VALUES (?, ?, ?)`,
      [id, fotoPath, tentang]
    )
  }

  // ✅ redirect aman
  redirect(`/admin/profile/${slug}`)
}
