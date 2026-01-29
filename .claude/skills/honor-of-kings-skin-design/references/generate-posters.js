const fs = require('fs');
const path = require('path');

// 检查是否安装了canvas库，如果没有则使用HTML转PNG的方式
let canvas;
try {
    canvas = require('canvas');
} catch (e) {
    console.log('未安装canvas库，将生成HTML文件供浏览器查看');
    console.log('如需生成PNG，请运行: npm install canvas');
    process.exit(0);
}

const { createCanvas } = canvas;

// 创建哪吒海报
function createNezhaPoster() {
    const width = 1200;
    const height = 1600;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // 背景渐变 - 红黑配色
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#1a0000');
    bgGradient.addColorStop(0.5, '#4d0000');
    bgGradient.addColorStop(1, '#000000');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);
    
    // 火焰背景效果
    ctx.save();
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 50 + Math.random() * 150;
        const flameGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        flameGradient.addColorStop(0, '#FF4500');
        flameGradient.addColorStop(0.5, '#8B0000');
        flameGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = flameGradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // 绘制角色轮廓（简化版）
    ctx.save();
    ctx.translate(centerX, centerY);
    
    // 身体轮廓
    ctx.fillStyle = '#8B0000';
    ctx.beginPath();
    ctx.ellipse(0, 50, 90, 130, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 头部
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(0, -80, 65, 0, Math.PI * 2);
    ctx.fill();
    
    // 发髻（两个）
    ctx.fillStyle = '#8B0000';
    ctx.beginPath();
    ctx.arc(-35, -125, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(35, -125, 28, 0, Math.PI * 2);
    ctx.fill();
    
    // 发髻火焰光效
    ctx.fillStyle = '#FF4500';
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(-35, -125, 35, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(35, -125, 35, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;
    
    // 火焰环绕效果
    ctx.strokeStyle = '#FF4500';
    ctx.lineWidth = 4;
    for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 / 12) * i;
        const startX = Math.cos(angle) * 110;
        const startY = Math.sin(angle) * 110;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + Math.cos(angle) * 40, startY + Math.sin(angle) * 40);
        ctx.stroke();
    }
    
    ctx.restore();
    
    // 标题区域
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 90px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('哪吒', centerX, 220);
    
    // 副标题
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 55px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.fillText('魔童降世', centerX, 300);
    
    // 品质标识背景
    ctx.fillStyle = '#8B0000';
    ctx.fillRect(centerX - 150, 340, 300, 60);
    
    // 品质标识
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 45px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.fillText('无双限定', centerX, 375);
    
    // 底部信息
    ctx.fillStyle = '#CCCCCC';
    ctx.font = '32px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.fillText('电影《哪吒之魔童降世》联动', centerX, height - 160);
    
    // 配色说明
    ctx.fillStyle = '#888888';
    ctx.font = '26px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.fillText('配色：深红 #8B0000 | 黑色 #000000 | 金色 #FFD700', centerX, height - 110);
    
    // 边框装饰
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 6;
    ctx.strokeRect(25, 25, width - 50, height - 50);
    
    // 内边框
    ctx.strokeStyle = '#8B0000';
    ctx.lineWidth = 3;
    ctx.strokeRect(35, 35, width - 70, height - 70);
    
    return canvas;
}

// 创建敖隐海报
function createAoyinPoster() {
    const width = 1200;
    const height = 1600;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // 背景渐变 - 青蓝配色
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#001a33');
    bgGradient.addColorStop(0.5, '#003366');
    bgGradient.addColorStop(1, '#000033');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);
    
    // 水波纹背景效果
    ctx.save();
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < 25; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 60 + Math.random() * 140;
        const waterGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        waterGradient.addColorStop(0, '#4682B4');
        waterGradient.addColorStop(0.5, '#0000CD');
        waterGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = waterGradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // 绘制角色轮廓（简化版）
    ctx.save();
    ctx.translate(centerX, centerY);
    
    // 身体轮廓（长袍）
    ctx.fillStyle = '#4682B4';
    ctx.beginPath();
    ctx.ellipse(0, 80, 105, 150, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 白色内衬
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(0, 60, 70, 100, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 头部
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(0, -60, 60, 0, Math.PI * 2);
    ctx.fill();
    
    // 龙角
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.moveTo(-25, -105);
    ctx.lineTo(-35, -140);
    ctx.lineTo(-15, -130);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(25, -105);
    ctx.lineTo(35, -140);
    ctx.lineTo(15, -130);
    ctx.closePath();
    ctx.fill();
    
    // 王冠
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(-45, -115, 90, 18);
    // 王冠装饰
    ctx.fillStyle = '#4682B4';
    for (let i = 0; i < 5; i++) {
        ctx.fillRect(-40 + i * 20, -120, 8, 8);
    }
    
    // 水波纹效果
    ctx.strokeStyle = '#4682B4';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < 8; i++) {
        const radius = 120 + i * 25;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.globalAlpha = 1.0;
    
    ctx.restore();
    
    // 标题区域
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 90px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('敖隐', centerX, 220);
    
    // 副标题
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 55px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.fillText('龙族王子', centerX, 300);
    
    // 品质标识背景
    ctx.fillStyle = '#4682B4';
    ctx.fillRect(centerX - 150, 340, 300, 60);
    
    // 品质标识
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 45px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.fillText('无双限定', centerX, 375);
    
    // 底部信息
    ctx.fillStyle = '#CCCCCC';
    ctx.font = '32px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.fillText('电影《哪吒之魔童降世》联动', centerX, height - 160);
    
    // 配色说明
    ctx.fillStyle = '#888888';
    ctx.font = '26px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.fillText('配色：青蓝 #4682B4 | 白色 #FFFFFF | 金色 #FFD700', centerX, height - 110);
    
    // 边框装饰
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 6;
    ctx.strokeRect(25, 25, width - 50, height - 50);
    
    // 内边框
    ctx.strokeStyle = '#4682B4';
    ctx.lineWidth = 3;
    ctx.strokeRect(35, 35, width - 70, height - 70);
    
    return canvas;
}

// 生成海报
const outputDir = __dirname;

const nezhaCanvas = createNezhaPoster();
const nezhaBuffer = nezhaCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(outputDir, '哪吒-魔童降世-海报.png'), nezhaBuffer);
console.log('✓ 已生成：哪吒-魔童降世-海报.png');

const aoyinCanvas = createAoyinPoster();
const aoyinBuffer = aoyinCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(outputDir, '敖隐-龙族王子-海报.png'), aoyinBuffer);
console.log('✓ 已生成：敖隐-龙族王子-海报.png');

console.log('\n海报已生成完成！');

