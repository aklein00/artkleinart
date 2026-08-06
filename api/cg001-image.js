const fs = require('fs');
const path = require('path');
const { findGalleryItem } = require('./cg001-gallery');
const { verifyToken } = require('./cg001-token');

const ASSET_ROOT = path.join(process.cwd(), 'protected-assets', 'company-game-001');

const contentTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

function sendText(res, statusCode, message) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(message);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendText(res, 405, 'Method not allowed');
  }

  const url = new URL(req.url, `https://${req.headers.host || 'artkleinart.com'}`);
  const file = url.searchParams.get('file') || '';
  const token = url.searchParams.get('token') || '';
  const item = findGalleryItem(file);

  if (!verifyToken(token)) {
    return sendText(res, 401, 'Unauthorized');
  }

  if (!item || path.basename(file) !== file) {
    return sendText(res, 404, 'Not found');
  }

  const assetPath = path.join(ASSET_ROOT, item.file);
  if (!assetPath.startsWith(ASSET_ROOT)) {
    return sendText(res, 404, 'Not found');
  }

  try {
    const image = await fs.promises.readFile(assetPath);
    const extension = path.extname(item.file).toLowerCase();

    res.statusCode = 200;
    res.setHeader('Content-Type', contentTypes[extension] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'private, max-age=900');
    res.end(image);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Unable to serve CG001 protected image', error);
    }

    return sendText(res, 404, 'Not found');
  }
};
