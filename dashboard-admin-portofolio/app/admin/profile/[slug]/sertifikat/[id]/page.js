import db from '@/lib/db'

export default async function DetailSertifikat({ params }) {
  const { slug, id } = await Promise.resolve(params)

  const [[s]] = await db.query(
    'SELECT * FROM sertifikats WHERE id=?',
    [id]
  )

  if (!s) {
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <h1 className="text-white text-2xl">Sertifikat tidak ditemukan</h1>
      </div>
    )
  }

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-xl bg-linear-to-br from-purple-950 via-purple-900 to-purple-800
                      rounded-3xl p-8 shadow-lg shadow-purple-700/40
                      backdrop-blur-md border border-purple-600/40">
        <h1 className="text-2xl font-bold text-white mb-6 text-center tracking-wide">
          Detail Sertifikat
        </h1>

        <form
          action={`/api/sertifikats/${id}`}
          method="POST"
          encType="multipart/form-data"
          className="flex flex-col gap-5"
        >
          <input type="hidden" name="_method" value="PUT" />
          <input type="hidden" name="slug" value={slug} />

          {/* FOTO SERTIFIKAT */}
          {s.foto && (
            <div className="flex justify-center mb-4">
              <img
                src={s.foto}
                alt="Foto Sertifikat"
                className="
                  w-full max-w-sm   /* lebih kecil */
                  h-auto
                  object-contain
                  rounded-2xl
                  shadow-lg shadow-purple-700/40
                  border border-purple-500/20
                "
              />
            </div>
          )}

          {/* UPLOAD FOTO */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium tracking-wide">Upload Foto Sertifikat</label>
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

          {/* NAMA SERTIFIKAT */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium tracking-wide">Nama Sertifikat</label>
            <input
              name="nama_sertifikat"
              defaultValue={s.nama_sertifikat}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         focus:ring-offset-1 focus:ring-offset-purple-900 transition duration-200"
              required
            />
          </div>

          {/* DESKRIPSI */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium tracking-wide">Deskripsi Sertifikat</label>
            <textarea
              name="deskripsi"
              defaultValue={s.deskripsi || ''}
              rows={4}
              placeholder="Isi deskripsi sertifikat"
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         focus:ring-offset-1 focus:ring-offset-purple-900 transition duration-200 resize-vertical"
            />
          </div>

          {/* NAMA PENERIMA */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium tracking-wide">Nama Penerima</label>
            <input
              name="nama_penerima"
              defaultValue={s.nama_penerima}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         focus:ring-offset-1 focus:ring-offset-purple-900 transition duration-200"
              required
            />
          </div>

          {/* NAMA KELAS */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium tracking-wide">Nama Kelas</label>
            <input
              name="nama_kelas"
              defaultValue={s.nama_kelas}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         focus:ring-offset-1 focus:ring-offset-purple-900 transition duration-200"
              required
            />
          </div>

          {/* PENYELENGGARA */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium tracking-wide">Penyelenggara</label>
            <input
              name="penyelenggara"
              defaultValue={s.penyelenggara}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         focus:ring-offset-1 focus:ring-offset-purple-900 transition duration-200"
              required
            />
          </div>

          {/* STATUS KELULUSAN */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium tracking-wide">Status Kelulusan</label>
            <select
              name="status_kelulusan"
              defaultValue={s.status_kelulusan}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         focus:ring-offset-1 focus:ring-offset-purple-900 transition duration-200"
            >
              <option value="Lulus">Lulus</option>
              <option value="Tidak Lulus">Tidak Lulus</option>
            </select>
          </div>

          {/* TANGGAL TERBIT */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium tracking-wide">Tanggal Terbit</label>
            <input
              type="date"
              name="tanggal_terbit"
              defaultValue={s.tanggal_terbit?.toISOString().slice(0, 10)}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         focus:ring-offset-1 focus:ring-offset-purple-900 transition duration-200"
              required
            />
          </div>

          {/* MASA BERLAKU */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium tracking-wide">Masa Berlaku</label>
            <input
              type="date"
              name="masa_berlaku"
              defaultValue={s.masa_berlaku?.toISOString().slice(0, 10) || ''}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         focus:ring-offset-1 focus:ring-offset-purple-900 transition duration-200"
            />
          </div>

          {/* UPLOAD PDF */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium tracking-wide">Upload PDF Sertifikat</label>
            <input
              type="file"
              name="file_pdf"
              accept="application/pdf"
              className="
                text-white/70
                file:bg-purple-600 file:text-white file:px-4 file:py-2
                file:rounded-lg file:border-none file:cursor-pointer
                hover:file:bg-purple-700 transition
              "
            />
          </div>

          {/* PREVIEW PDF */}
          {s.file_pdf && (
            <div className="mt-4">
              <p className="text-white font-semibold mb-2">Preview PDF:</p>
              <iframe
                src={s.file_pdf}
                width="100%"
                height="250"   /* lebih kecil */
                className="border border-white/20 rounded-xl"
              />
            </div>
          )}

          {/* BUTTON SIMPAN */}
          <button
            type="submit"
            className="mt-6 w-full bg-linear-to-r from-purple-600 to-purple-700
                       hover:from-purple-500 hover:to-purple-600
                       text-white font-semibold px-5 py-3 rounded-2xl
                       shadow-lg shadow-purple-700/50 transition duration-200"
          >
            💾 Simpan
          </button>
        </form>
      </div>
    </div>
  )
}
