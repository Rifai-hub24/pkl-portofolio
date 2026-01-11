import Link from 'next/link'
import db from '@/lib/db'

export default async function SertifikatPage({ params }) {
  const { slug } = await Promise.resolve(params)

  // Ambil profile
  const [[profile]] = await db.query(
    'SELECT id, name FROM profiles WHERE slug = ?',
    [slug]
  )

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <h1 className="text-white text-2xl">Profil tidak ditemukan</h1>
      </div>
    )
  }

  // Ambil semua sertifikat
  const [sertifikats] = await db.query(
    'SELECT * FROM sertifikats WHERE profile_id = ? ORDER BY created_at DESC',
    [profile.id]
  )

  return (
    <div className="px-4 md:px-10 mt-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Sertifikat</h1>
        <Link
          href={`/admin/profile/${slug}/sertifikat/create`}
          className="bg-linear-to-r from-purple-600 to-purple-700
                     hover:from-purple-500 hover:to-purple-600
                     text-white font-semibold px-5 py-2 rounded-2xl
                     shadow-lg shadow-purple-700/50 transition duration-200"
        >
          ➕ Tambah Sertifikat
        </Link>
      </div>

      {/* LIST SERTIFIKAT */}
      {sertifikats.length === 0 ? (
        <p className="text-white/70">Belum ada sertifikat</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sertifikats.map(s => (
            <div
              key={s.id}
              className="bg-linear-to-br from-purple-900 via-purple-800 to-purple-700
                         rounded-2xl p-4 shadow-md shadow-purple-700/40
                         transition hover:shadow-lg hover:shadow-purple-700/70"
            >
              {/* AREA KLIK CARD */}
              <Link
                href={`/admin/profile/${slug}/sertifikat/${s.id}`}
                className="block text-center text-white no-underline"
              >
                <img
                  src={s.foto}
                  alt={s.nama_sertifikat}
                  className="
                    w-full
                    h-auto           /* desktop proporsional */
                    rounded-xl
                    mb-3
                    max-[640px]:h-40  /* mobile tinggi 40 */
                    object-contain
                  "
                />
                <h3 className="text-lg font-semibold hover:text-yellow-400 transition">
                  {s.nama_sertifikat}
                </h3>
              </Link>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-2 mt-4">

                {/* LIHAT PDF */}
                {s.file_pdf && (
                  <a
                    href={s.file_pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-3 py-2
                               bg-linear-to-r from-blue-500 to-blue-400
                               text-white rounded-lg
                               hover:from-blue-400 hover:to-blue-500
                               transition font-medium text-sm"
                  >
                    📄 Lihat PDF
                  </a>
                )}

                {/* EDIT - warna kuning */}
                <Link
                  href={`/admin/profile/${slug}/sertifikat/${s.id}`}
                  className="flex-1 text-center px-3 py-2
                             bg-linear-to-r from-yellow-400 to-yellow-500
                             text-white rounded-lg
                             hover:from-yellow-300 hover:to-yellow-400
                             transition font-medium text-sm"
                >
                  ✏️ Edit
                </Link>

                {/* HAPUS */}
                <form action={`/api/sertifikats/${s.id}`} method="POST" className="flex-1">
                  <input type="hidden" name="_method" value="DELETE" />
                  <input type="hidden" name="slug" value={slug} />
                  <button
                    type="submit"
                    className="w-full text-center px-3 py-2
                               bg-red-600 text-white rounded-lg
                               hover:bg-red-700 transition font-medium text-sm"
                  >
                    🗑️ Hapus
                  </button>
                </form>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
