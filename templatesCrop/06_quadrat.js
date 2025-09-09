const { createCanvas } = require('canvas');

module.exports = async function resizeToSquare(img) {
  const targetSize = 1000;

  const imgWidth = img.width;
  const imgHeight = img.height;
  const imgRatio = imgWidth / imgHeight;

  let drawWidth, drawHeight;

  if (imgRatio > 1) {
    // Bild ist breiter als hoch → Höhe = 1000
    drawHeight = targetSize;
    drawWidth = imgRatio * targetSize;
  } else {
    // Bild ist höher als breit oder quadratisch → Breite = 1000
    drawWidth = targetSize;
    drawHeight = targetSize / imgRatio;
  }

  // Canvas mit Zielgröße 1000x1000
  const canvas = createCanvas(targetSize, targetSize);
  const ctx = canvas.getContext('2d');

  // optional: Hintergrund (weiß oder transparent)
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, targetSize, targetSize);

  // Bild mittig platzieren
  const dx = (targetSize - drawWidth) / 2;
  const dy = (targetSize - drawHeight) / 2;

  ctx.drawImage(img, dx, dy, drawWidth, drawHeight);

  return canvas;
};
