import {
  FaUser,
  FaBuilding,
  FaStar,
  FaCheckCircle,
  FaCalendarAlt,
  FaClock,
} from 'react-icons/fa'

import styles from './certificate.module.css'

const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3001'

export default async function Page({ params }) {
  const { id } = await params

  const res = await fetch(
    `${API_BASE}/api/public/certificate/${id}`,
    { cache: 'no-store' }
  )

  if (!res.ok) return <p>Certificate not found</p>

  const cert = await res.json()

  return (
    <div className={styles.page}>
      {/* JUDUL */}
      <h1 className={styles.title}>
        Detail Sertifikat: {cert.title}
      </h1>

      {/* KONTEN */}
      <div className={styles.wrapper}>
        {/* KIRI */}
        <div className={styles.card}>
          <img
            src={`${API_BASE}${cert.img}`}
            alt={cert.title}
            className={styles.image}
          />

          {cert.file_pdf && (
            <div className={styles.pdfWrapper}>
              <a
                href={`${API_BASE}${cert.file_pdf}`}
                target="_blank"
                className={styles.pdf}
              >
                Lihat PDF
              </a>
            </div>
          )}
        </div>

        {/* KANAN */}
        <div className={styles.card}>
          <Info icon={<FaUser color="#38bdf8" />} label="Nama Penerima">
            {cert.nama_penerima}
          </Info>

          <Info icon={<FaBuilding color="#a855f7" />} label="Penyelenggara">
            {cert.penyelenggara}
          </Info>

          <Info icon={<FaStar color="#facc15" />} label="Nama Kelas">
            {cert.nama_kelas}
          </Info>

          <Info
            icon={<FaCheckCircle color="#22c55e" />}
            label="Status Kelulusan"
          >
            {cert.status_kelulusan}
          </Info>

          <Info
            icon={<FaCalendarAlt color="#fb923c" />}
            label="Tanggal Terbit"
          >
            {new Date(cert.tanggal_terbit).toLocaleDateString()}
          </Info>

          <Info
            icon={<FaClock color="#60a5fa" />}
            label="Masa Berlaku"
          >
            {new Date(cert.masa_berlaku).toLocaleDateString()}
          </Info>

          {/* DESKRIPSI */}
          <p className={styles.desc}>
            {cert.deskripsi}
          </p>
        </div>
      </div>
    </div>
  )
}

/* KOMPONEN INFO */
function Info({ icon, label, children }) {
  return (
    <p className={styles.info}>
      {icon}
      <span>
        <b>{label}:</b> {children}
      </span>
    </p>
  )
}
