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

  // Hintergrundfarbe (weiß)
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, targetSize, targetSize);

  // Bild mittig platzieren
  const dx = (targetSize - drawWidth) / 2;
  const dy = (targetSize - drawHeight) / 2;
  ctx.drawImage(img, dx, dy, drawWidth, drawHeight);

  // === VIGNETTEN-EFFEKT ===
  // Radialer Verlauf: Mitte durchsichtig → Ränder leicht dunkel
  const vignette = ctx.createRadialGradient(
    targetSize / 2, targetSize / 2, targetSize * 0.4, // innerer Kreis
    targetSize / 2, targetSize / 2, targetSize * 0.7  // äußerer Kreis
  );
  vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');       // Mitte transparent
  vignette.addColorStop(1, 'rgba(0, 0, 0, 0.4)');    // Ränder leicht dunkel (0.35 ≈ 35% Deckkraft)

  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, targetSize, targetSize);

  return canvas;
};
