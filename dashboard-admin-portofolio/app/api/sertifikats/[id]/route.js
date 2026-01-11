import db from '@/lib/db'
import { redirect } from 'next/navigation'
import { writeFile } from 'fs/promises'
import fs from 'fs'
import path from 'path'

export async function POST(req, { params }) {
  const { id } = await params
  const form = await req.formData()
  const method = form.get('_method')
  const slug = form.get('slug')

  /* ===============================
     DELETE
  =============================== */
  if (method === 'DELETE') {
    const [[sertifikat]] = await db.query(
      'SELECT file_pdf FROM sertifikats WHERE id = ?',
      [id]
    )

    if (sertifikat?.file_pdf) {
      const filePath = path.join(process.cwd(), 'public', sertifikat.file_pdf)
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }

    await db.query('DELETE FROM sertifikats WHERE id = ?', [id])
    redirect(`/admin/profile/${slug}/sertifikat`)
  }

  /* ===============================
     UPDATE
  =============================== */
  if (method === 'PUT') {
    const nama_sertifikat = form.get('nama_sertifikat')
    const deskripsi = form.get('deskripsi') || '' // ✅ deskripsi baru
    const nama_penerima = form.get('nama_penerima')
    const nama_kelas = form.get('nama_kelas')
    const penyelenggara = form.get('penyelenggara')
    const status_kelulusan = form.get('status_kelulusan')
    const tanggal_terbit = form.get('tanggal_terbit')
    const masa_berlaku = form.get('masa_berlaku') || null

    // Upload PDF
    let pdfPath = null
    const filePdf = form.get('file_pdf')
    if (filePdf && filePdf.size > 0) {
      const bytes = await filePdf.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `${Date.now()}-${filePdf.name}`
      const uploadPath = path.join(process.cwd(), 'public', 'uploads', filename)
      await writeFile(uploadPath, buffer)
      pdfPath = `/uploads/${filename}`
    }

    if (pdfPath) {
      await db.query(
        `UPDATE sertifikats SET
          nama_sertifikat=?,
          deskripsi=?,
          nama_penerima=?,
          nama_kelas=?,
          penyelenggara=?,
          status_kelulusan=?,
          tanggal_terbit=?,
          masa_berlaku=?,
          file_pdf=?
         WHERE id=?`,
        [
          nama_sertifikat,
          deskripsi,
          nama_penerima,
          nama_kelas,
          penyelenggara,
          status_kelulusan,
          tanggal_terbit,
          masa_berlaku,
          pdfPath,
          id
        ]
      )
    } else {
      await db.query(
        `UPDATE sertifikats SET
          nama_sertifikat=?,
          deskripsi=?,
          nama_penerima=?,
          nama_kelas=?,
          penyelenggara=?,
          status_kelulusan=?,
          tanggal_terbit=?,
          masa_berlaku=?
         WHERE id=?`,
        [
          nama_sertifikat,
          deskripsi,
          nama_penerima,
          nama_kelas,
          penyelenggara,
          status_kelulusan,
          tanggal_terbit,
          masa_berlaku,
          id
        ]
      )
    }

    redirect(`/admin/profile/${slug}/sertifikat`)
  }
}
