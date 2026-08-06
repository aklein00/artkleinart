const galleryItems = [
  {
    file: 'cg001_char_a.jpg',
    alt: 'Character - full turnaround and face closeup',
    caption: 'Character - Turnaround & Detail',
    layoutClass: 'span-full',
  },
  {
    file: 'cg001_char_b.jpg',
    alt: 'Character - bust shot detail',
    caption: 'Character - Face Detail',
    layoutClass: 'tall',
  },
  {
    file: 'cg001_char_c.jpg',
    alt: 'Character - full body turnaround',
    caption: 'Character - Full Body',
    layoutClass: 'tall',
  },
  {
    file: 'cg001_char_d.jpg',
    alt: 'Character - full body',
    caption: 'Character - Full Body',
    layoutClass: 'tall',
  },
  {
    file: 'cg001_char_e.jpg',
    alt: 'Character - full body turnaround with LOD',
    caption: 'Character - Turnaround + LOD',
    layoutClass: 'tall',
  },
  {
    file: 'cg001_char_f.jpg',
    alt: 'Character - texture variants showing style system',
    caption: 'Character Texture System - Two Variants',
    layoutClass: 'span-full',
  },
];

function getGalleryItems() {
  return galleryItems.map((item) => ({ ...item }));
}

function findGalleryItem(file) {
  return galleryItems.find((item) => item.file === file);
}

function handler(req, res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Not found');
}

module.exports = handler;
module.exports.getGalleryItems = getGalleryItems;
module.exports.findGalleryItem = findGalleryItem;
