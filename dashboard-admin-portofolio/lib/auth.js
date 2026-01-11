import crypto from 'crypto'

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function base64urlDecode(input) {
  let str = input.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4) str += '='
  return Buffer.from(str, 'base64').toString('utf8')
}

export function signToken(payload) {
  const header = { alg: 'HS256', typ: 'JWT' }
  const headerB = base64url(JSON.stringify(header))
  const payloadB = base64url(JSON.stringify(payload))
  const data = `${headerB}.${payloadB}`
  const sig = crypto.createHmac('sha256', SECRET).update(data).digest('base64')
  const sigB = sig.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  return `${data}.${sigB}`
}

export function verifyToken(token) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const [headerB, payloadB, sig] = parts
    const data = `${headerB}.${payloadB}`
    const expectedSig = crypto.createHmac('sha256', SECRET).update(data).digest('base64')
      .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

    const sigBuf = Buffer.from(sig)
    const expBuf = Buffer.from(expectedSig)
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null
    }

    const payloadJson = base64urlDecode(payloadB)
    const payload = JSON.parse(payloadJson)

    if (payload.exp && Date.now() / 1000 > payload.exp) return null

    return payload
  } catch (e) {
    return null
  }
}
