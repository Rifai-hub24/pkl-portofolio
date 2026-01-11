import { FaGithub, FaFilePdf } from 'react-icons/fa'
import './profile.css'

const API_BASE = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3001'

export default async function ProfilePage({ params }) {
  // ⚠️ Tunggu params.slug karena bisa Promise
  const { slug } = await params

  // Ambil data profile dari API
  const res = await fetch(`${API_BASE}/api/public/profile/${slug}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    return <p>Profil tidak ditemukan</p>
  }

  const profile = await res.json()

  const fotoURL = profile.foto ? `${API_BASE}${profile.foto}` : '/default.jpg'

  return (
    <div className="container">
      <h1 className="hero-title">{profile.name}</h1>
      {profile.title && <p className="hero-text">{profile.title}</p>}

      <div className="card about">
        <img src={fotoURL} alt={profile.name} className="profile-img" />
        <div className="about-content">
          <h2>Tentang Saya</h2>
          <div
            className="about-text"
            dangerouslySetInnerHTML={{ __html: profile.tentang || '' }}
          />
        </div>
      </div>

      {/* SERTIFIKAT */}
      {profile.sertifikats?.length > 0 && (
        <div className="card">
          <h2>Sertifikat</h2>
          <div className="cert-wrapper">
            {profile.sertifikats.map((cert) => {
              const certImg = cert.img.startsWith('http') ? cert.img : `${API_BASE}${cert.img}`
              const pdfURL = cert.file_pdf ? `${API_BASE}${cert.file_pdf}` : null
              return (
                <div key={cert.id} className="card cert-card">
                  <img src={certImg} alt={cert.title} className="cert-img" />
                  <p className="cert-title">{cert.title}</p>
                  {pdfURL && (
                    <a href={pdfURL} target="_blank" className="btn btn-pdf">
                      <FaFilePdf size={12} /> Lihat PDF
                    </a>
                  )}
                  <a href={`/certificates/${cert.id}`} className="btn">Selengkapnya</a>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* GITHUB */}
      <div className="card github">
        <h2>GitHub</h2>
        <a href={profile.github} target="_blank" className="btn github-btn">
          <FaGithub size={22} /> Kunjungi GitHub
        </a>
      </div>
    </div>
  )
}
