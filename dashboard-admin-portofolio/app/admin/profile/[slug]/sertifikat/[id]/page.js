import db from '@/lib/db'
import SertifikatClient from './sertifikat-client'

export default async function DetailSertifikat({ params }) {

  // ✅ WAJIB await
  const { slug, id } = await params

  const [[sertifikat]] = await db.query(
    'SELECT * FROM sertifikats WHERE id = ?',
    [id]
  )

  if (!sertifikat) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-white text-xl">Sertifikat tidak ditemukan</h1>
      </div>
    )
  }

  return (
    <SertifikatClient
      sertifikat={JSON.parse(JSON.stringify(sertifikat))}
      slug={slug}
    />
  )
}