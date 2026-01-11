export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/profiles`,
    { cache: 'no-store' }
  )

  const profiles = await res.json()

  return (
    <div className="container">
      <div className="flex">

        <img src="/group.jpg" width="420" alt="Tim RPL" />

        <div>
          <h1 className="hero-title">
            Selamat Datang di Portofolio Kami
          </h1>

          <p className="hero-text">
            Kami adalah siswa RPL yang tertarik pada Web Development
            dan siap berkembang di dunia teknologi.
          </p>

          <div style={{ marginTop: 20 }}>
            {profiles.map(p => (
              <a
                key={p.slug}
                href={`/profile/${p.slug}`}  // ⚡ gunakan /profile/[slug]
                className="btn"
                style={{ marginRight: 12 }}
              >
                {p.name.split(' ')[0]}
              </a>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
