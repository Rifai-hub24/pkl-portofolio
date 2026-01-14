export const runtime = 'nodejs'

import db from '@/lib/db'
import { redirect } from 'next/navigation'
import { writeFile } from 'fs/promises'
import fs from 'fs'
import path from 'path'

export async function POST(req, { params }) {
  const { id } = await params   // ✅ FIX UTAMA
  const form = await req.formData()
  const method = form.get('_method')
  const slug = form.get('slug')

  if (!id) {
    throw new Error('ID tidak valid')
  }

  /* ===============================
     DELETE
  =============================== */
  if (method === 'DELETE') {
    const [[sertifikat]] = await db.query(
      'SELECT foto, file_pdf FROM sertifikats WHERE id = ?',
      [id]
    )

    if (!sertifikat) {
      throw new Error('Sertifikat tidak ditemukan')
    }

    if (sertifikat.foto) {
      const fotoPath = path.join(process.cwd(), 'public', sertifikat.foto)
      if (fs.existsSync(fotoPath)) fs.unlinkSync(fotoPath)
    }

    if (sertifikat.file_pdf) {
      const pdfPath = path.join(process.cwd(), 'public', sertifikat.file_pdf)
      if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath)
    }

    await db.query('DELETE FROM sertifikats WHERE id = ?', [id])
    redirect(`/admin/profile/${slug}/sertifikat`)
  }

  /* ===============================
     UPDATE
  =============================== */
  if (method === 'PUT') {
    const nama_sertifikat = form.get('nama_sertifikat')
    const deskripsi = form.get('deskripsi') || ''
    const nama_penerima = form.get('nama_penerima')
    const nama_kelas = form.get('nama_kelas')
    const penyelenggara = form.get('penyelenggara')
    const status_kelulusan = form.get('status_kelulusan')
    const tanggal_terbit = form.get('tanggal_terbit')
    const masa_berlaku = form.get('masa_berlaku') || null

    // ✅ VALIDASI TANGGAL (INI YANG KAMU MAU)
    if (masa_berlaku && new Date(masa_berlaku) < new Date(tanggal_terbit)) {
      throw new Error('Masa berlaku tidak boleh lebih awal dari tanggal terbit')
    }

    let pdfPath = null
    const filePdf = form.get('file_pdf')

    if (filePdf && filePdf.size > 0) {
      const buffer = Buffer.from(await filePdf.arrayBuffer())
      const filename = `${Date.now()}-${filePdf.name}`
      const uploadDir = path.join(process.cwd(), 'public/uploads')

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }

      await writeFile(path.join(uploadDir, filename), buffer)
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
          file_pdf=?,
          updated_at=NOW()
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
          masa_berlaku=?,
          updated_at=NOW()
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

  throw new Error('Method tidak valid')
}