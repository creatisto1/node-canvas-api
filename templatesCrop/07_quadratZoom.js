const { createCanvas } = require('canvas');

module.exports = async function resizeToSquare(img) {
  const targetSize = 1000;
  const zoomFactor = 1.15; // +15% Zoom

  const imgWidth = img.width;
  const imgHeight = img.height;
  const imgRatio = imgWidth / imgHeight;

  let drawWidth, drawHeight;

  if (imgRatio > 1) {
    // Bild ist breiter → Höhe = 1000
    drawHeight = targetSize;
    drawWidth = imgRatio * targetSize;
  } else {
    // Bild ist höher oder quadratisch → Breite = 1000
    drawWidth = targetSize;
    drawHeight = targetSize / imgRatio;
  }

  // Zoom anwenden
  drawWidth *= zoomFactor;
  drawHeight *= zoomFactor;

  // Canvas auf Zielgröße
  const canvas = createCanvas(targetSize, targetSize);
  const ctx = canvas.getContext('2d');

  // Hintergrund (weiß)
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, targetSize, targetSize);

  // Neu zentrieren (weil das Bild größer ist als die Fläche)
  const dx = (targetSize - drawWidth) / 2;
  const dy = (targetSize - drawHeight) / 2;

  ctx.drawImage(img, dx, dy, drawWidth, drawHeight);

  return canvas;
};
