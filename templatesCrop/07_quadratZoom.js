const { createCanvas } = require('canvas');

module.exports = async function quadratZoom(img) {
  const targetSize = 1000;
  const zoomFactor = 1.15; // +15% Zoom

  const imgWidth = img.width;
  const imgHeight = img.height;
  const imgRatio = imgWidth / imgHeight;

  let drawWidth, drawHeight;

  // Größe basierend auf Verhältnis berechnen
  if (imgRatio > 1) {
    // Bild breiter als hoch → Höhe = targetSize
    drawHeight = targetSize;
    drawWidth = imgRatio * targetSize;
  } else {
    // Bild höher oder quadratisch → Breite = targetSize
    drawWidth = targetSize;
    drawHeight = targetSize / imgRatio;
  }

  // Zoom anwenden
  drawWidth *= zoomFactor;
  drawHeight *= zoomFactor;

  // Canvas erstellen
  const canvas = createCanvas(targetSize, targetSize);
  const ctx = canvas.getContext('2d');

  // Hintergrund weiß
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, targetSize, targetSize);

  // Bild zentrieren
  const dx = (targetSize - drawWidth) / 2;
  const dy = (targetSize - drawHeight) / 2;

  ctx.drawImage(img, dx, dy, drawWidth, drawHeight);

  return canvas;
};
