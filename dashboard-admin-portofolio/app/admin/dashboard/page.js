import Link from 'next/link'
import db from '@/lib/db'

export default async function Dashboard() {
  const [profiles] = await db.query(
    'SELECT id, name, slug FROM profiles ORDER BY name ASC'
  )

  return (
    <>
      {/* JUDUL */}
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-white">
        Dashboard Admin
      </h1>

      {/* KETIKA BELUM ADA PROFIL */}
      {profiles.length === 0 ? (
        <p className="text-white/60">
          Belum ada profil. Tambahkan lewat menu sidebar.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map(profile => (
            <div
              key={profile.id}
              className="
                bg-linear-to-br from-purple-950 via-purple-900 to-purple-800
                border border-purple-500/30
                rounded-2xl p-6
                transition
                flex flex-col justify-between
                relative
                before:absolute before:inset-0 before:rounded-2xl
                before:border before:border-purple-500/40
                before:shadow-[0_0_15px_rgba(139,92,246,0.4)]
                before:pointer-events-none
                hover:before:shadow-[0_0_25px_rgba(139,92,246,0.6)]
                hover:border-purple-500/50
              "
            >
              {/* INFO PROFILE */}
              <Link href={`/admin/profile/${profile.slug}`}>
                <h3 className="text-xl font-semibold text-white hover:text-purple-300 transition">
                  {profile.name}
                </h3>
                <p className="text-sm text-white/60 mt-1">
                  Kelola portofolio
                </p>
              </Link>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-6">
                {/* EDIT - warna kuning */}
                <Link
                  href={`/admin/profiles/${profile.id}/edit`}
                  className="
                    flex-1 text-center
                    bg-linear-to-r from-yellow-400 to-yellow-500
                    hover:from-yellow-300 hover:to-yellow-400
                    px-4 py-2 rounded-lg
                    text-sm font-medium text-white
                    transition
                  "
                >
                  ✏️ Edit
                </Link>

                {/* DELETE */}
                <form action={`/api/profiles/${profile.id}`} method="POST" className="flex-1">
                  <input type="hidden" name="_method" value="DELETE" />
                  <button
                    className="
                      w-full text-center
                      bg-red-600 hover:bg-red-700
                      px-4 py-2 rounded-lg
                      text-sm font-medium text-white
                      transition
                    "
                  >
                    🗑 Hapus
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
