import db from '@/lib/db'

export default async function ProfilePage({ params }) {
  const { slug } = await Promise.resolve(params)

  const [[profile]] = await db.query(
    'SELECT id, name, github FROM profiles WHERE slug = ?',
    [slug]
  )

  if (!profile) {
    return (
      <h1 className="text-white text-center mt-10 text-2xl">
        Profil tidak ditemukan
      </h1>
    )
  }

  const [[detail]] = await db.query(
    'SELECT * FROM profile_details WHERE profile_id = ?',
    [profile.id]
  )

  return (
    <div className="flex justify-center mt-10 px-4">
      {/* Card utama */}
      <div className="w-full max-w-2xl bg-linear-to-br from-purple-950 via-purple-900 to-purple-800 
                      rounded-3xl p-8 shadow-[0_10px_30px_rgba(139,92,246,0.4)] 
                      backdrop-blur-md border border-purple-600/40">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center tracking-wide">
          Profil: {profile.name}
        </h1>

        {/* PREVIEW FOTO PROFESIONAL */}
        {detail?.foto && (
          <div className="flex justify-center mb-8">
            <img
              src={detail.foto}
              alt="Foto Profil"
              className="
                w-56 h-56 
                object-cover 
                rounded-full 
                shadow-xl shadow-purple-700/50
                border-4 border-purple-500/30
              "
            />
          </div>
        )}

        <form
          action={`/api/profile-detail/${profile.id}?slug=${slug}`}
          method="POST"
          encType="multipart/form-data"
          className="flex flex-col gap-6"
        >
          {/* GITHUB */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium tracking-wide">GitHub</label>
            <input
              type="url"
              name="github"
              defaultValue={profile.github ?? ''}
              placeholder="https://github.com/username"
              className="
                bg-white/10 border border-white/20
                rounded-xl px-4 py-3 text-white
                focus:outline-none focus:ring-2 focus:ring-purple-500
                focus:ring-offset-1 focus:ring-offset-purple-900
                transition duration-200
              "
            />
          </div>

          {/* FOTO */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium tracking-wide">Foto Profil</label>
            <input
              type="file"
              name="foto"
              className="
                text-white/70
                file:bg-purple-600 file:text-white file:px-4 file:py-2
                file:rounded-lg file:border-none file:cursor-pointer
                hover:file:bg-purple-700 transition
              "
            />
          </div>

          {/* TENTANG */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium tracking-wide">Tentang Saya</label>
            <textarea
              name="tentang"
              rows={6}
              defaultValue={detail?.tentang ?? ''}
              className="
                bg-white/10 border border-white/20
                rounded-xl px-4 py-3 text-white
                focus:outline-none focus:ring-2 focus:ring-purple-500
                focus:ring-offset-1 focus:ring-offset-purple-900
                transition duration-200 resize-none
              "
            />
          </div>

          {/* SUBMIT */}
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
