export default function CreateProfilePage() {
  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-md bg-linear-to-br from-purple-950 via-purple-900 to-purple-800 rounded-2xl p-8 shadow-lg shadow-purple-700/30">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white text-center">
          Tambah Profil
        </h1>

        <form action="/api/profiles" method="POST" className="flex flex-col gap-5">
          {/* NAMA */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-1 font-medium">Nama</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Contoh: Rifai"
              className="
                bg-white/10 border border-white/20
                rounded-lg px-4 py-2 text-white
                focus:outline-none focus:ring-2 focus:ring-purple-500
                transition
              "
            />
          </div>

          {/* SLUG */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-1 font-medium">Slug</label>
            <input
              type="text"
              name="slug"
              required
              placeholder="contoh: rifai"
              className="
                bg-white/10 border border-white/20
                rounded-lg px-4 py-2 text-white
                focus:outline-none focus:ring-2 focus:ring-purple-500
                transition
              "
            />
            <small className="text-white/60 mt-1">
              Digunakan untuk URL publik
            </small>
          </div>

          {/* SUBMIT */}
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
            ➕ Simpan
          </button>
        </form>
      </div>
    </div>
  )
}
