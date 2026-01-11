import db from '@/lib/db'

export default async function EditProfilePage({ params }) {
  const { id } = await Promise.resolve(params)

  const [[profile]] = await db.query(
    'SELECT * FROM profiles WHERE id = ?',
    [id]
  )

  if (!profile) {
    return (
      <h1 className="text-white text-center mt-10 text-2xl">
        Profil tidak ditemukan
      </h1>
    )
  }

  return (
    <div className="flex justify-center mt-10 px-4">
      {/* Card utama */}
      <div className="w-full max-w-md bg-linear-to-br from-purple-950 via-purple-900 to-purple-800 rounded-2xl p-8 shadow-lg shadow-purple-700/30">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Edit Profile
        </h1>

        <form action={`/api/profiles/${id}`} method="POST" className="flex flex-col gap-5">
          {/* METHOD SPOOFING */}
          <input type="hidden" name="_method" value="PUT" />

          {/* Nama */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-1 font-medium">Nama</label>
            <input
              type="text"
              name="name"
              defaultValue={profile.name}
              required
              className="
                bg-white/10 border border-white/20
                rounded-lg px-4 py-2 text-white
                focus:outline-none focus:ring-2 focus:ring-purple-500
                transition
              "
            />
          </div>

          {/* Slug */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-1 font-medium">Slug</label>
            <input
              type="text"
              name="slug"
              defaultValue={profile.slug}
              required
              className="
                bg-white/10 border border-white/20
                rounded-lg px-4 py-2 text-white
                focus:outline-none focus:ring-2 focus:ring-purple-500
                transition
              "
            />
          </div>

          {/* Tombol Update */}
          <button
            type="submit"
            className="
              mt-4 w-full bg-purple-600 hover:bg-purple-700
              text-white font-semibold
              px-4 py-3 rounded-xl
              shadow-md shadow-purple-700/30
              transition
            "
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  )
}
