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

function drawGuojiaPoster() {
  const width = 1080;
  const height = 1920;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 背景：深靛蓝到近黑的竖向渐变
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, '#101427');
  bg.addColorStop(0.5, '#050714');
  bg.addColorStop(1, '#02030a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // 背景星点
  ctx.fillStyle = 'rgba(180, 200, 255, 0.6)';
  for (let i = 0; i < 180; i++) {
    const x = Math.random() * width;
    const y = Math.random() * (height * 0.7);
    const r = Math.random() * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // 背后星图大圆
  const cx = width / 2;
  const cy = height * 0.45;
  ctx.strokeStyle = 'rgba(120,170,255,0.45)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, 380, 0, Math.PI * 2);
  ctx.stroke();

  // 星图内圈和若干轨道
  const rings = [260, 320, 350];
  ctx.strokeStyle = 'rgba(80,140,230,0.6)';
  ctx.setLineDash([6, 10]);
  rings.forEach(r => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  // 角色主体位置稍下方
  const bx = cx;
  const by = height * 0.58;

  // 角色剪影：躯干
  ctx.strokeStyle = '#e3e8ff';
  ctx.lineWidth = 4;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  // 躯干（上身略前倾）
  ctx.beginPath();
  ctx.moveTo(bx, by - 260); // 颈部
  ctx.lineTo(bx - 12, by - 80); // 胸
  ctx.lineTo(bx - 4, by + 40); // 腰
  ctx.lineTo(bx + 8, by + 120); // 髋
  ctx.stroke();

  // 头部
  const headY = by - 310;
  ctx.beginPath();
  ctx.arc(bx, headY, 55, 0, Math.PI * 2);
  ctx.stroke();

  // 发髻 + 发冠轮廓
  ctx.beginPath();
  ctx.moveTo(bx - 40, headY - 10);
  ctx.lineTo(bx - 20, headY - 70);
  ctx.lineTo(bx, headY - 90);
  ctx.lineTo(bx + 25, headY - 70);
  ctx.lineTo(bx + 45, headY - 10);
  ctx.stroke();
  // 发冠半环
  ctx.beginPath();
  ctx.arc(bx, headY - 55, 26, Math.PI * 0.15, Math.PI * 0.85);
  ctx.stroke();

  // 右臂：伸出操控法阵
  ctx.beginPath();
  ctx.moveTo(bx - 10, by - 200); // 肩
  ctx.lineTo(bx - 120, by - 160); // 肘
  ctx.lineTo(bx - 220, by - 120); // 手
  ctx.stroke();

  // 左臂：持折扇
  ctx.beginPath();
  ctx.moveTo(bx + 10, by - 210); // 肩
  ctx.lineTo(bx + 120, by - 170); // 肘
  ctx.lineTo(bx + 190, by - 125); // 手
  ctx.stroke();

  // 折扇简易轮廓
  ctx.beginPath();
  ctx.moveTo(bx + 190, by - 125);
  ctx.lineTo(bx + 250, by - 165);
  ctx.lineTo(bx + 245, by - 110);
  ctx.closePath();
  ctx.stroke();

  // 下身：长袍外轮廓
  const skirtTop = by + 110;
  const skirtBottom = height * 0.9;
  ctx.beginPath();
  ctx.moveTo(bx - 40, skirtTop);
  ctx.lineTo(bx - 140, skirtBottom);
  ctx.lineTo(bx + 140, skirtBottom);
  ctx.lineTo(bx + 20, skirtTop);
  ctx.closePath();
  ctx.stroke();

  // 双腿简线
  ctx.beginPath();
  ctx.moveTo(bx - 8, skirtTop);
  ctx.lineTo(bx - 40, skirtBottom);
  ctx.moveTo(bx + 8, skirtTop);
  ctx.lineTo(bx + 50, skirtBottom - 40);
  ctx.stroke();

  // 腰间星盘简化轮廓
  ctx.beginPath();
  ctx.ellipse(bx, by + 80, 55, 32, 0, 0, Math.PI * 2);
  ctx.stroke();

  // 地面主法阵（控制型标志）
  const gz = height * 0.82;
  const gr = 260;
  ctx.strokeStyle = 'rgba(120,180,255,0.9)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, gz, gr, 0, Math.PI * 2);
  ctx.stroke();

  // 内圈
  ctx.beginPath();
  ctx.arc(cx, gz, gr * 0.6, 0, Math.PI * 2);
  ctx.stroke();

  // 四向阵线
  ctx.beginPath();
  ctx.moveTo(cx - gr, gz);
  ctx.lineTo(cx + gr, gz);
  ctx.moveTo(cx, gz - gr);
  ctx.lineTo(cx, gz + gr);
  ctx.stroke();

  // 中心阵眼
  ctx.beginPath();
  ctx.arc(cx, gz, 32, 0, Math.PI * 2);
  ctx.stroke();

  // 若干小刻度
  ctx.save();
  ctx.translate(cx, gz);
  for (let i = 0; i < 16; i++) {
    const angle = (Math.PI * 2 * i) / 16;
    const r1 = gr * 0.75;
    const r2 = gr * 0.85;
    const x1 = Math.cos(angle) * r1;
    const y1 = Math.sin(angle) * r1;
    const x2 = Math.cos(angle) * r2;
    const y2 = Math.sin(angle) * r2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  ctx.restore();

  // 从郭嘉右手到法阵中心的能量连线
  ctx.strokeStyle = 'rgba(140,200,255,0.9)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(bx - 220, by - 120);
  ctx.lineTo(cx, gz);
  ctx.stroke();

  // 顶部标题：郭嘉
  ctx.fillStyle = '#F3E7C0';
  ctx.font = 'bold 72px "Microsoft YaHei", "SimHei"';
  ctx.textAlign = 'center';
  ctx.fillText('郭嘉', width / 2, 150);

  // 副标题与定位
  ctx.fillStyle = '#C0C8FF';
  ctx.font = '36px "Microsoft YaHei", "SimHei"';
  ctx.fillText('星辰阵算师 · 远程法阵控制型法师', width / 2, 220);

  return canvas;
}

function main() {
  const canvas = drawGuojiaPoster();
  const buffer = canvas.toBuffer('image/png');
  const outPath = path.join(__dirname, 'guojia-poster.png');
  fs.writeFileSync(outPath, buffer);
  console.log('已生成英雄海报草图：', outPath);
}

main();


