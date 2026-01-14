'use client'
import { useState } from 'react'

export default function SertifikatClient({ sertifikat, slug }) {
  const [tanggalTerbit, setTanggalTerbit] = useState(
    sertifikat.tanggal_terbit
      ? new Date(sertifikat.tanggal_terbit).toISOString().slice(0, 10)
      : ''
  )

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-xl bg-linear-to-br from-purple-950 via-purple-900 to-purple-800
                      rounded-3xl p-8 shadow-lg shadow-purple-700/40
                      backdrop-blur-md border border-purple-600/40">

        <h1 className="text-2xl font-bold text-white mb-6 text-center tracking-wide">
          Detail Sertifikat
        </h1>

        <form
          action={`/api/sertifikats/${sertifikat.id}`}
          method="POST"
          encType="multipart/form-data"
          className="flex flex-col gap-5"
        >
          <input type="hidden" name="_method" value="PUT" />
          <input type="hidden" name="slug" value={slug} />

          {/* FOTO */}
          {sertifikat.foto && (
            <div className="flex justify-center mb-4">
              <img
                src={sertifikat.foto}
                alt="Foto Sertifikat"
                className="w-full max-w-sm object-contain rounded-2xl
                           shadow-lg shadow-purple-700/40
                           border border-purple-500/20"
              />
            </div>
          )}

          {/* UPLOAD FOTO */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-1 font-medium">
              Upload Foto Sertifikat
            </label>
            <p className="text-white/50 text-sm mb-2">
              Foto sertifikat akan ditampilkan sebagai preview
            </p>
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
          <Input label="Nama Sertifikat" name="nama_sertifikat" defaultValue={sertifikat.nama_sertifikat} />

          {/* DESKRIPSI */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-1 font-medium">
              Deskripsi Sertifikat
            </label>
            <p className="text-white/50 text-sm mb-2">
              Jelaskan detail atau keterangan tambahan sertifikat
            </p>
            <textarea
              name="deskripsi"
              defaultValue={sertifikat.deskripsi || ''}
              rows={4}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white
                         focus:ring-2 focus:ring-purple-500 resize-vertical"
            />
          </div>

          <Input label="Nama Penerima" name="nama_penerima" defaultValue={sertifikat.nama_penerima} />
          <Input label="Nama Kelas" name="nama_kelas" defaultValue={sertifikat.nama_kelas} />
          <Input label="Penyelenggara" name="penyelenggara" defaultValue={sertifikat.penyelenggara} />

          {/* STATUS */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium">Status Kelulusan</label>
            <select
              name="status_kelulusan"
              defaultValue={sertifikat.status_kelulusan}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
            >
              <option value="Lulus">Lulus</option>
              <option value="Tidak Lulus">Tidak Lulus</option>
            </select>
          </div>

          {/* TANGGAL TERBIT */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium">Tanggal Terbit</label>
            <input
              type="date"
              name="tanggal_terbit"
              value={tanggalTerbit}
              onChange={(e) => setTanggalTerbit(e.target.value)}
              required
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
            />
          </div>

          {/* MASA BERLAKU – REALTIME LOCK */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-2 font-medium">Masa Berlaku</label>
            <input
              type="date"
              name="masa_berlaku"
              min={tanggalTerbit}
              defaultValue={
                sertifikat.masa_berlaku
                  ? new Date(sertifikat.masa_berlaku).toISOString().slice(0, 10)
                  : ''
              }
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
            />
          </div>

          {/* UPLOAD PDF */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-1 font-medium">
              Upload PDF Sertifikat
            </label>
            <p className="text-white/50 text-sm mb-2">
              File PDF akan digunakan sebagai dokumen resmi
            </p>
            <input
              type="file"
              name="file_pdf"
              accept="application/pdf"
              className="
                text-white/70
                file:bg-purple-600 file:text-white file:px-4 file:py-2
                file:rounded-lg file:border-none
                hover:file:bg-purple-700 transition
              "
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-linear-to-r from-purple-600 to-purple-700
                       hover:from-purple-500 hover:to-purple-600
                       text-white font-semibold px-5 py-3 rounded-2xl
                       shadow-lg shadow-purple-700/50 transition"
          >
            💾 Simpan
          </button>
        </form>
      </div>
    </div>
  )
}

/* Helper Input */
function Input({ label, name, defaultValue }) {
  return (
    <div className="flex flex-col">
      <label className="text-white/80 mb-2 font-medium">{label}</label>
      <input
        name={name}
        defaultValue={defaultValue}
        required
        className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
      />
    </div>
  )
}