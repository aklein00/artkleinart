const crypto = require('crypto');

const TOKEN_TTL_MS = 15 * 60 * 1000;
const TOKEN_SCOPE = 'cg001';

function getTokenSecret() {
  return process.env.CG001_TOKEN_SECRET || '';
}

function signPayload(encodedPayload, secret) {
  return crypto
    .createHmac('sha256', secret)
    .update(encodedPayload)
    .digest('base64url');
}

function createToken() {
  const secret = getTokenSecret();
  if (!secret) {
    throw new Error('CG001_TOKEN_SECRET is not configured');
  }

  const expiresAt = Date.now() + TOKEN_TTL_MS;
  const payload = Buffer.from(
    JSON.stringify({ scope: TOKEN_SCOPE, exp: expiresAt }),
    'utf8'
  ).toString('base64url');
  const signature = signPayload(payload, secret);

  return {
    token: `${payload}.${signature}`,
    expiresAt,
  };
}

function safeCompare(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function verifyToken(token) {
  const secret = getTokenSecret();
  if (!secret || !token || typeof token !== 'string') {
    return false;
  }

  const [payload, signature] = token.split('.');
  if (!payload || !signature) {
    return false;
  }

  const expectedSignature = signPayload(payload, secret);
  if (!safeCompare(signature, expectedSignature)) {
    return false;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return decoded.scope === TOKEN_SCOPE && Number(decoded.exp) > Date.now();
  } catch (error) {
    console.error('Unable to decode CG001 token', error);
    return false;
  }
}

function handler(req, res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Not found');
}

module.exports = handler;
module.exports.createToken = createToken;
module.exports.verifyToken = verifyToken;
module.exports.TOKEN_TTL_MS = TOKEN_TTL_MS;
