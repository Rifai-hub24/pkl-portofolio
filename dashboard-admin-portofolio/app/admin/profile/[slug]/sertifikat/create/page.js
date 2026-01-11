import db from '@/lib/db'

export default async function CreateSertifikat({ params }) {
  const { slug } = await Promise.resolve(params)

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

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-md bg-linear-to-br from-purple-950 via-purple-900 to-purple-800 
                      rounded-3xl p-8 shadow-lg shadow-purple-700/30
                      backdrop-blur-md border border-purple-600/40">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Tambah Sertifikat</h1>
          <p className="text-white/70 text-sm">Profil: {profile.name}</p>
        </div>

        {/* FORM */}
        <form
          action="/api/sertifikats"
          method="POST"
          encType="multipart/form-data"
          className="flex flex-col gap-5"
        >
          {/* DATA HIDDEN */}
          <input type="hidden" name="profile_id" value={profile.id} />
          <input type="hidden" name="slug" value={slug} />

          {/* FOTO SERTIFIKAT */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium tracking-wide">Foto Sertifikat</label>
            <input
              type="file"
              name="foto"
              required
              className="
                text-white/70
                file:bg-purple-600 file:text-white file:px-4 file:py-2
                file:rounded-lg file:border-none file:cursor-pointer
                hover:file:bg-purple-700 transition
              "
            />
          </div>

          {/* NAMA SERTIFIKAT */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium tracking-wide">Nama Sertifikat</label>
            <input
              name="nama_sertifikat"
              required
              placeholder="Contoh: Full Stack Developer"
              className="
                bg-white/10 border border-white/20
                rounded-xl px-4 py-3 text-white
                focus:outline-none focus:ring-2 focus:ring-purple-500
                focus:ring-offset-1 focus:ring-offset-purple-900
                transition duration-200
              "
            />
          </div>

          {/* BUTTON SIMPAN */}
          <button
            type="submit"
            className="
              mt-4 w-full bg-linear-to-r from-purple-600 to-purple-700
              hover:from-purple-500 hover:to-purple-600
              text-white font-semibold
              px-5 py-3 rounded-2xl
              shadow-lg shadow-purple-700/50
              transition duration-200
            "
          >
            💾 Simpan
          </button>
        </form>
      </div>
    </div>
  )
}
