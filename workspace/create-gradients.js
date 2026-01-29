const sharp = require('sharp');
const path = require('path');

async function createGradients() {
  // 封面渐变：深蓝到深灰蓝
  const coverGradient = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720">
    <defs>
      <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1C2833"/>
        <stop offset="100%" style="stop-color:#181B24"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g1)"/>
  </svg>`;

  // 结束页渐变：深灰蓝到深蓝
  const endGradient = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720">
    <defs>
      <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#181B24"/>
        <stop offset="100%" style="stop-color:#1C2833"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g2)"/>
  </svg>`;

  await sharp(Buffer.from(coverGradient))
    .png()
    .toFile('workspace/assets/cover-bg.png');
  
  await sharp(Buffer.from(endGradient))
    .png()
    .toFile('workspace/assets/end-bg.png');

  console.log('渐变背景图片已创建');
}

createGradients().catch(console.error);

