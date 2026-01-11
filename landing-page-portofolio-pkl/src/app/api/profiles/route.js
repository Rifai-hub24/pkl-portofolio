export async function GET() {
  const res = await fetch('http://localhost:3001/api/profiles', {
    cache: 'no-store',
  })

  if (!res.ok) {
    return Response.json(
      { error: 'Gagal ambil data profile' },
      { status: 500 }
    )
  }

  const data = await res.json()
  return Response.json(data)
}