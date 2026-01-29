const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 检查是否安装了canvas库
let canvas;
try {
    canvas = require('canvas');
} catch (e) {
    console.log('错误：未安装canvas库');
    process.exit(1);
}

const { createCanvas, loadImage } = canvas;

// 辅助函数：加载图片
async function loadImageBuffer(imagePath) {
    try {
        const imageBuffer = await sharp(imagePath).png().toBuffer();
        return await loadImage(imageBuffer);
    } catch (error) {
        console.log(`加载图片失败 ${imagePath}:`, error.message);
        return null;
    }
}

// 绘制融合后的哪吒角色（不使用原图，而是绘制融合设计）
function drawFusionNezha(ctx, centerX, centerY) {
    ctx.save();
    ctx.translate(centerX, centerY);
    
    // === 身体部分 ===
    // 身体轮廓（保持游戏中的体型）
    ctx.fillStyle = '#8B0000';
    ctx.beginPath();
    ctx.ellipse(0, 80, 85, 125, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 黑色紧身衣打底
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.ellipse(0, 80, 75, 115, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 红色火焰纹理覆盖
    ctx.fillStyle = '#8B0000';
    ctx.globalAlpha = 0.7;
    for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i;
        const x = Math.cos(angle) * 60;
        const y = Math.sin(angle) * 60 + 80;
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1.0;
    
    // === 头部 ===
    // 头部轮廓
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(0, -70, 60, 0, Math.PI * 2);
    ctx.fill();
    
    // 面部（魔童面容）
    ctx.fillStyle = '#FFE4B5';
    ctx.beginPath();
    ctx.arc(0, -60, 50, 0, Math.PI * 2);
    ctx.fill();
    
    // 眼睛（红色光效）
    ctx.fillStyle = '#FF4500';
    ctx.beginPath();
    ctx.arc(-15, -65, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(15, -65, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // === 发型：两个标志性发髻（融合设计）===
    // 左发髻
    ctx.fillStyle = '#8B0000';
    ctx.beginPath();
    ctx.arc(-30, -115, 28, 0, Math.PI * 2);
    ctx.fill();
    // 发髻火焰光效
    ctx.fillStyle = '#FF4500';
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(-30, -115, 35, 0, Math.PI * 2);
    ctx.fill();
    
    // 右发髻
    ctx.fillStyle = '#8B0000';
    ctx.globalAlpha = 1.0;
    ctx.beginPath();
    ctx.arc(30, -115, 28, 0, Math.PI * 2);
    ctx.fill();
    // 发髻火焰光效
    ctx.fillStyle = '#FF4500';
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(30, -115, 35, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;
    
    // === 肩甲：火焰形状（融合设计）===
    ctx.fillStyle = '#8B0000';
    ctx.beginPath();
    ctx.moveTo(-50, 20);
    ctx.lineTo(-70, 10);
    ctx.lineTo(-60, 30);
    ctx.lineTo(-45, 35);
    ctx.closePath();
    ctx.fill();
    // 金色装饰
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(50, 20);
    ctx.lineTo(70, 10);
    ctx.lineTo(60, 30);
    ctx.lineTo(45, 35);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // === 混天绫（融合设计：传统元素 + 现代光效）===
    ctx.fillStyle = '#8B0000';
    ctx.globalAlpha = 0.8;
    // 左侧混天绫
    ctx.beginPath();
    ctx.moveTo(-40, 50);
    ctx.quadraticCurveTo(-60, 100, -50, 150);
    ctx.quadraticCurveTo(-40, 200, -30, 250);
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#8B0000';
    ctx.stroke();
    // 右侧混天绫
    ctx.beginPath();
    ctx.moveTo(40, 50);
    ctx.quadraticCurveTo(60, 100, 50, 150);
    ctx.quadraticCurveTo(40, 200, 30, 250);
    ctx.stroke();
    ctx.globalAlpha = 1.0;
    
    // === 双枪武器（融合设计：现代武器 + 火焰元素）===
    // 左枪
    ctx.fillStyle = '#333333';
    ctx.fillRect(-80, 30, 12, 80);
    // 枪头火焰形状
    ctx.fillStyle = '#FF4500';
    ctx.beginPath();
    ctx.moveTo(-74, 30);
    ctx.lineTo(-80, 20);
    ctx.lineTo(-68, 20);
    ctx.closePath();
    ctx.fill();
    // 火焰纹理
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.strokeRect(-80, 30, 12, 80);
    
    // 右枪
    ctx.fillStyle = '#333333';
    ctx.fillRect(68, 30, 12, 80);
    // 枪头火焰形状
    ctx.fillStyle = '#FF4500';
    ctx.beginPath();
    ctx.moveTo(74, 30);
    ctx.lineTo(80, 20);
    ctx.lineTo(68, 20);
    ctx.closePath();
    ctx.fill();
    // 火焰纹理
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.strokeRect(68, 30, 12, 80);
    
    // === 火焰环绕特效 ===
    ctx.strokeStyle = '#FF4500';
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 / 12) * i;
        const startX = Math.cos(angle) * 120;
        const startY = Math.sin(angle) * 120;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + Math.cos(angle) * 50, startY + Math.sin(angle) * 50);
        ctx.stroke();
    }
    ctx.globalAlpha = 1.0;
    
    // === 风火轮（脚部特效）===
    ctx.fillStyle = '#FF4500';
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.arc(-25, 200, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(25, 200, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;
    
    ctx.restore();
}

// 绘制融合后的敖隐角色（不使用原图，而是绘制融合设计）
function drawFusionAoyin(ctx, centerX, centerY) {
    ctx.save();
    ctx.translate(centerX, centerY);
    
    // === 身体部分：长袍 ===
    // 外层长袍（青蓝色）
    ctx.fillStyle = '#4682B4';
    ctx.beginPath();
    ctx.ellipse(0, 100, 100, 140, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 白色内衬
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(0, 70, 70, 100, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 龙鳞纹理（融合设计）
    ctx.fillStyle = '#5A9BD4';
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            const x = -60 + i * 24;
            const y = 40 + j * 35;
            ctx.beginPath();
            ctx.arc(x, y, 12, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    ctx.globalAlpha = 1.0;
    
    // === 头部 ===
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(0, -50, 58, 0, Math.PI * 2);
    ctx.fill();
    
    // 面部
    ctx.fillStyle = '#FFE4B5';
    ctx.beginPath();
    ctx.arc(0, -40, 48, 0, Math.PI * 2);
    ctx.fill();
    
    // 眼睛（蓝色光效）
    ctx.fillStyle = '#4682B4';
    ctx.beginPath();
    ctx.arc(-15, -45, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(15, -45, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // === 龙角（融合设计：传统元素 + 现代光效）===
    // 左龙角
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.moveTo(-20, -95);
    ctx.lineTo(-30, -130);
    ctx.lineTo(-15, -125);
    ctx.lineTo(-10, -120);
    ctx.closePath();
    ctx.fill();
    // 金色描边
    ctx.strokeStyle = '#FFA500';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 右龙角
    ctx.beginPath();
    ctx.moveTo(20, -95);
    ctx.lineTo(30, -130);
    ctx.lineTo(15, -125);
    ctx.lineTo(10, -120);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // === 王冠（融合设计）===
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(-45, -110, 90, 18);
    // 王冠装饰（龙纹）
    ctx.fillStyle = '#4682B4';
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(-40 + i * 20, -105, 6, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // === 肩部龙鳞装饰 ===
    ctx.fillStyle = '#5A9BD4';
    ctx.beginPath();
    ctx.arc(-60, 30, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(60, 30, 20, 0, Math.PI * 2);
    ctx.fill();
    // 金色装饰
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // === 袖口：龙爪形状 ===
    ctx.fillStyle = '#4682B4';
    ctx.beginPath();
    ctx.moveTo(-50, 180);
    ctx.lineTo(-60, 200);
    ctx.lineTo(-55, 210);
    ctx.lineTo(-45, 205);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(50, 180);
    ctx.lineTo(60, 200);
    ctx.lineTo(55, 210);
    ctx.lineTo(45, 205);
    ctx.closePath();
    ctx.fill();
    
    // === 武器（根据游戏风格，融入龙族元素）===
    // 假设是法杖类武器
    ctx.fillStyle = '#4682B4';
    ctx.fillRect(-15, 50, 30, 120);
    // 龙形装饰
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(-10, 40);
    ctx.lineTo(10, 40);
    ctx.closePath();
    ctx.fill();
    
    // === 水波纹特效 ===
    ctx.strokeStyle = '#4682B4';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < 8; i++) {
        const radius = 130 + i * 25;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.globalAlpha = 1.0;
    
    // === 水珠特效 ===
    ctx.fillStyle = '#4682B4';
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < 10; i++) {
        const angle = (Math.PI * 2 / 10) * i;
        const x = Math.cos(angle) * 150;
        const y = Math.sin(angle) * 150;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1.0;
    
    ctx.restore();
}

// 创建哪吒融合海报
async function createFusionNezhaPoster() {
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
    const centerY = height / 2 + 100;
    
    // 绘制融合后的角色
    drawFusionNezha(ctx, centerX, centerY);
    
    // 标题区域
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 90px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    
    ctx.fillText('哪吒', centerX, 200);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 55px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.fillText('魔童降世', centerX, 300);
    
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // 品质标识
    ctx.fillStyle = 'rgba(139, 0, 0, 0.85)';
    ctx.fillRect(centerX - 150, 340, 300, 60);
    
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 45px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText('无双限定', centerX, 375);
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // 底部信息
    ctx.fillStyle = '#CCCCCC';
    ctx.font = '32px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText('电影《哪吒之魔童降世》联动', centerX, height - 160);
    
    ctx.fillStyle = '#888888';
    ctx.font = '26px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.fillText('融合设计：游戏英雄 × 电影角色', centerX, height - 110);
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // 边框
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 6;
    ctx.strokeRect(25, 25, width - 50, height - 50);
    
    ctx.strokeStyle = '#8B0000';
    ctx.lineWidth = 3;
    ctx.strokeRect(35, 35, width - 70, height - 70);
    
    return canvas;
}

// 创建敖隐融合海报
async function createFusionAoyinPoster() {
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
    const centerY = height / 2 + 100;
    
    // 绘制融合后的角色
    drawFusionAoyin(ctx, centerX, centerY);
    
    // 标题区域
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 90px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    
    ctx.fillText('敖隐', centerX, 200);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 55px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.fillText('龙族王子', centerX, 300);
    
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // 品质标识
    ctx.fillStyle = 'rgba(70, 130, 180, 0.85)';
    ctx.fillRect(centerX - 150, 340, 300, 60);
    
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 45px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText('无双限定', centerX, 375);
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // 底部信息
    ctx.fillStyle = '#CCCCCC';
    ctx.font = '32px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText('电影《哪吒之魔童降世》联动', centerX, height - 160);
    
    ctx.fillStyle = '#888888';
    ctx.font = '26px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.fillText('融合设计：游戏英雄 × 电影角色', centerX, height - 110);
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // 边框
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 6;
    ctx.strokeRect(25, 25, width - 50, height - 50);
    
    ctx.strokeStyle = '#4682B4';
    ctx.lineWidth = 3;
    ctx.strokeRect(35, 35, width - 70, height - 70);
    
    return canvas;
}

// 主函数
async function main() {
    const outputDir = __dirname;
    
    console.log('正在生成融合设计的哪吒海报...');
    const nezhaCanvas = await createFusionNezhaPoster();
    const nezhaBuffer = nezhaCanvas.toBuffer('image/png');
    fs.writeFileSync(path.join(outputDir, '哪吒-魔童降世-海报.png'), nezhaBuffer);
    console.log('✓ 已生成：哪吒-魔童降世-海报.png（融合设计）');
    
    console.log('正在生成融合设计的敖隐海报...');
    const aoyinCanvas = await createFusionAoyinPoster();
    const aoyinBuffer = aoyinCanvas.toBuffer('image/png');
    fs.writeFileSync(path.join(outputDir, '敖隐-龙族王子-海报.png'), aoyinBuffer);
    console.log('✓ 已生成：敖隐-龙族王子-海报.png（融合设计）');
    
    console.log('\n融合设计海报已生成完成！');
    console.log('设计理念：融合王者荣耀英雄特点与电影角色特点，创造全新形象');
}

main().catch(error => {
    console.error('生成海报时出错:', error);
    process.exit(1);
});

