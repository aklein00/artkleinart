const crypto = require('crypto');
const { getGalleryItems } = require('./cg001-gallery');
const { createToken, TOKEN_TTL_MS } = require('./cg001-token');

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}

function passwordsMatch(submittedPassword, expectedPassword) {
  if (!submittedPassword || !expectedPassword) {
    return false;
  }

  const submittedHash = crypto.createHash('sha256').update(submittedPassword).digest();
  const expectedHash = crypto.createHash('sha256').update(expectedPassword).digest();
  return crypto.timingSafeEqual(submittedHash, expectedHash);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1024) {
        reject(new Error('Request body is too large'));
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const expectedPassword = process.env.CG001_PASSWORD || '';
  if (!expectedPassword || !process.env.CG001_TOKEN_SECRET) {
    console.error('CG001 password protection env vars are not configured');
    return sendJson(res, 500, { error: 'Protected gallery is not configured yet.' });
  }

  try {
    const { password } = await readJsonBody(req);

    if (!passwordsMatch(String(password || ''), expectedPassword)) {
      return sendJson(res, 401, { error: 'Incorrect password.' });
    }

    const { token, expiresAt } = createToken();
    return sendJson(res, 200, {
      token,
      expiresAt,
      ttlMs: TOKEN_TTL_MS,
      gallery: getGalleryItems(),
    });
  } catch (error) {
    console.error('Unable to unlock CG001 gallery', error);
    return sendJson(res, 400, { error: 'Unable to unlock this gallery.' });
  }
};
