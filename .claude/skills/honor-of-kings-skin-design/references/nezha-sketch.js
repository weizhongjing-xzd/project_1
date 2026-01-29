const fs = require('fs');
const path = require('path');

let canvasLib;
try {
  canvasLib = require('canvas');
} catch (e) {
  console.error('请先安装 canvas：npm install canvas');
  process.exit(1);
}

const { createCanvas } = canvasLib;

function drawNezhaSketch() {
  const width = 800;
  const height = 1200;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 背景
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, width, height);

  // 方便查看的辅助线（角色大致站在中间偏下）
  const cx = width / 2;
  const cy = height * 0.6;

  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, height);
  ctx.stroke();
  ctx.setLineDash([]);

  // 统一线条样式
  ctx.strokeStyle = '#f5f5f5';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // === 1. 身体轴线（保持原英雄体型的大概比例） ===
  ctx.beginPath();
  ctx.moveTo(cx, cy - 260); // 头顶附近
  ctx.lineTo(cx, cy + 220); // 脚底附近
  ctx.stroke();

  // === 2. 头部 + 双发髻 ===
  // 头部圆
  const headY = cy - 220;
  ctx.beginPath();
  ctx.arc(cx, headY, 55, 0, Math.PI * 2);
  ctx.stroke();

  // 发髻位置（左右各一个）
  const bunOffsetX = 45;
  const bunY = headY - 55;

  function drawBun(x, y) {
    // 发髻主体
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.stroke();
    // 外圈金属环
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.stroke();
  }

  drawBun(cx - bunOffsetX, bunY);
  drawBun(cx + bunOffsetX, bunY);

  // 顶部长发的火焰轮廓（简化）
  ctx.beginPath();
  ctx.moveTo(cx - 60, headY - 10);
  ctx.lineTo(cx - 30, headY - 80);
  ctx.lineTo(cx, headY - 110);
  ctx.lineTo(cx + 35, headY - 85);
  ctx.lineTo(cx + 65, headY - 5);
  ctx.stroke();

  // === 3. 上身轮廓 ===
  const chestY = cy - 120;
  const waistY = cy - 20;

  ctx.beginPath();
  ctx.moveTo(cx - 60, chestY);
  ctx.lineTo(cx - 45, waistY);
  ctx.lineTo(cx + 45, waistY);
  ctx.lineTo(cx + 60, chestY);
  ctx.closePath();
  ctx.stroke(); // 躯干大致轮廓

  // 胸口火焰徽章（倒三角形轮廓）
  ctx.beginPath();
  ctx.moveTo(cx, chestY + 10);
  ctx.lineTo(cx - 18, chestY + 55);
  ctx.lineTo(cx + 18, chestY + 55);
  ctx.closePath();
  ctx.stroke();

  // 左右火焰肩甲轮廓
  function drawShoulder(dx) {
    const sign = dx > 0 ? 1 : -1;
    ctx.beginPath();
    ctx.moveTo(cx + dx, chestY - 10);
    ctx.lineTo(cx + dx + sign * 45, chestY - 25);
    ctx.lineTo(cx + dx + sign * 30, chestY + 15);
    ctx.lineTo(cx + dx, chestY + 20);
    ctx.closePath();
    ctx.stroke();
  }

  drawShoulder(-70);
  drawShoulder(70);

  // === 4. 腰封 + 战裙轮廓 ===
  const skirtTop = waistY + 5;
  const skirtBottom = cy + 80;

  // 腰封
  ctx.beginPath();
  ctx.moveTo(cx - 65, waistY);
  ctx.lineTo(cx + 65, waistY);
  ctx.lineTo(cx + 55, skirtTop);
  ctx.lineTo(cx - 55, skirtTop);
  ctx.closePath();
  ctx.stroke();

  // 外层战裙
  ctx.beginPath();
  ctx.moveTo(cx - 55, skirtTop);
  ctx.lineTo(cx - 90, skirtBottom);
  ctx.lineTo(cx + 90, skirtBottom);
  ctx.lineTo(cx + 55, skirtTop);
  ctx.closePath();
  ctx.stroke();

  // === 5. 四肢简化（保持动作结构，不画肌肉细节） ===
  // 右腿（画面左侧）
  ctx.beginPath();
  ctx.moveTo(cx - 20, skirtBottom);
  ctx.lineTo(cx - 40, cy + 170);
  ctx.stroke();

  // 左腿（画面右侧）
  ctx.beginPath();
  ctx.moveTo(cx + 20, skirtBottom);
  ctx.lineTo(cx + 60, cy + 160);
  ctx.stroke();

  // 右臂（上举持武器）
  ctx.beginPath();
  ctx.moveTo(cx - 30, chestY - 10); // 肩
  ctx.lineTo(cx - 100, chestY - 80); // 肘
  ctx.lineTo(cx - 150, chestY - 160); // 手
  ctx.stroke();

  // 左臂（向后）
  ctx.beginPath();
  ctx.moveTo(cx + 30, chestY - 10); // 肩
  ctx.lineTo(cx + 110, chestY); // 肘
  ctx.lineTo(cx + 170, chestY + 40); // 手
  ctx.stroke();

  // === 6. 武器轮廓（右手斜上方） ===
  // 武器杆
  ctx.beginPath();
  ctx.moveTo(cx - 150, chestY - 160);
  ctx.lineTo(cx - 210, chestY - 260);
  ctx.stroke();

  // 枪头：龙头+火焰的剪影
  ctx.beginPath();
  ctx.moveTo(cx - 210, chestY - 260);
  ctx.lineTo(cx - 250, chestY - 290);
  ctx.lineTo(cx - 220, chestY - 310);
  ctx.lineTo(cx - 190, chestY - 295);
  ctx.closePath();
  ctx.stroke();

  // === 7. 混天绫大致走向 ===
  ctx.beginPath();
  ctx.moveTo(cx - 40, skirtTop); // 腰部后侧起点
  ctx.quadraticCurveTo(cx - 140, cy + 40, cx - 60, cy + 190);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx + 40, skirtTop);
  ctx.quadraticCurveTo(cx + 150, cy + 20, cx + 70, cy + 200);
  ctx.stroke();

  // === 8. 风火轮占位 ===
  function drawWheel(x, y) {
    ctx.beginPath();
    ctx.ellipse(x, y, 28, 16, 0.3, 0, Math.PI * 2);
    ctx.stroke();
  }

  drawWheel(cx - 40, cy + 190);
  drawWheel(cx + 60, cy + 185);

  return canvas;
}

function main() {
  const canvas = drawNezhaSketch();
  const buffer = canvas.toBuffer('image/png');
  const outPath = path.join(__dirname, '哪吒-草图.png');
  fs.writeFileSync(outPath, buffer);
  console.log('已生成草图：', outPath);
}

main();


