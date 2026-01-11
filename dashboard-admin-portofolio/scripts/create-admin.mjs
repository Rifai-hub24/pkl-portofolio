import bcrypt from 'bcryptjs'
import db from '../lib/db.js'

const [,, email, password] = process.argv

if (!email || !password) {
  console.error('Usage: node scripts/create-admin.mjs <email> <password>')
  process.exit(1)
}

async function main() {
  const hash = await bcrypt.hash(password, 10)
  await db.query('INSERT INTO admins (email, password) VALUES (?, ?)', [email, hash])
  console.log('Admin created:', email)
  process.exit(0)
}

main().catch(err => { console.error(err); process.exit(1) })
