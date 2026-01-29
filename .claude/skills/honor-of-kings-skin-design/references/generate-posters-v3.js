const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 检查是否安装了canvas库
let canvas;
try {
    canvas = require('canvas');
} catch (e) {
    console.log('错误：未安装canvas库');
    console.log('请运行: npm install canvas');
    process.exit(1);
}

const { createCanvas, loadImage } = canvas;

// 辅助函数：加载图片并转换为Buffer
async function loadImageBuffer(imagePath) {
    try {
        const imageBuffer = await sharp(imagePath).png().toBuffer();
        return await loadImage(imageBuffer);
    } catch (error) {
        console.log(`加载图片失败 ${imagePath}:`, error.message);
        return null;
    }
}

// 创建哪吒海报
async function createNezhaPoster() {
    const width = 1200;
    const height = 1600;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    const refDir = __dirname;
    
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
    
    // 加载并绘制角色图片
    let heroImage = null;
    const imagePaths = [
        path.join(refDir, '哪吒.png'),
        path.join(refDir, '电影哪吒.png')
    ];
    
    for (const imagePath of imagePaths) {
        if (fs.existsSync(imagePath)) {
            heroImage = await loadImageBuffer(imagePath);
            if (heroImage) {
                console.log(`成功加载图片: ${path.basename(imagePath)}`);
                break;
            }
        }
    }
    
    if (heroImage) {
        // 计算图片尺寸和位置
        const maxWidth = 650;
        const maxHeight = 900;
        let imgWidth = heroImage.width;
        let imgHeight = heroImage.height;
        
        // 按比例缩放
        const scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
        imgWidth = imgWidth * scale;
        imgHeight = imgHeight * scale;
        
        const imgX = centerX - imgWidth / 2;
        const imgY = centerY - imgHeight / 2 + 80; // 稍微下移
        
        // 绘制角色图片
        ctx.save();
        ctx.globalAlpha = 0.98;
        ctx.drawImage(heroImage, imgX, imgY, imgWidth, imgHeight);
        ctx.restore();
        
        // 添加火焰光效叠加
        ctx.save();
        ctx.globalAlpha = 0.25;
        const flameOverlay = ctx.createRadialGradient(centerX, centerY + 150, 0, centerX, centerY + 150, 450);
        flameOverlay.addColorStop(0, '#FF4500');
        flameOverlay.addColorStop(0.5, '#8B0000');
        flameOverlay.addColorStop(1, 'transparent');
        ctx.fillStyle = flameOverlay;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    } else {
        console.log('警告：未找到哪吒角色图片，将使用占位符');
        // 绘制占位符
        ctx.fillStyle = '#8B0000';
        ctx.fillRect(centerX - 200, centerY - 200, 400, 500);
    }
    
    // 标题区域
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 90px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 添加文字阴影
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    
    ctx.fillText('哪吒', centerX, 200);
    
    // 副标题
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 55px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.fillText('魔童降世', centerX, 300);
    
    // 重置阴影
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // 品质标识背景
    ctx.fillStyle = 'rgba(139, 0, 0, 0.85)';
    ctx.fillRect(centerX - 150, 340, 300, 60);
    
    // 品质标识
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
    
    // 配色说明
    ctx.fillStyle = '#888888';
    ctx.font = '26px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.fillText('配色：深红 #8B0000 | 黑色 #000000 | 金色 #FFD700', centerX, height - 110);
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
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
async function createAoyinPoster() {
    const width = 1200;
    const height = 1600;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    const refDir = __dirname;
    
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
    
    // 加载并绘制角色图片
    let heroImage = null;
    const imagePaths = [
        path.join(refDir, '熬隐.png'),
        path.join(refDir, '电影熬丙.png')
    ];
    
    for (const imagePath of imagePaths) {
        if (fs.existsSync(imagePath)) {
            heroImage = await loadImageBuffer(imagePath);
            if (heroImage) {
                console.log(`成功加载图片: ${path.basename(imagePath)}`);
                break;
            }
        }
    }
    
    if (heroImage) {
        // 计算图片尺寸和位置
        const maxWidth = 650;
        const maxHeight = 900;
        let imgWidth = heroImage.width;
        let imgHeight = heroImage.height;
        
        // 按比例缩放
        const scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
        imgWidth = imgWidth * scale;
        imgHeight = imgHeight * scale;
        
        const imgX = centerX - imgWidth / 2;
        const imgY = centerY - imgHeight / 2 + 80; // 稍微下移
        
        // 绘制角色图片
        ctx.save();
        ctx.globalAlpha = 0.98;
        ctx.drawImage(heroImage, imgX, imgY, imgWidth, imgHeight);
        ctx.restore();
        
        // 添加水波纹光效叠加
        ctx.save();
        ctx.globalAlpha = 0.25;
        const waterOverlay = ctx.createRadialGradient(centerX, centerY + 150, 0, centerX, centerY + 150, 450);
        waterOverlay.addColorStop(0, '#4682B4');
        waterOverlay.addColorStop(0.5, '#0000CD');
        waterOverlay.addColorStop(1, 'transparent');
        ctx.fillStyle = waterOverlay;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    } else {
        console.log('警告：未找到敖隐角色图片，将使用占位符');
        // 绘制占位符
        ctx.fillStyle = '#4682B4';
        ctx.fillRect(centerX - 200, centerY - 200, 400, 500);
    }
    
    // 标题区域
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 90px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 添加文字阴影
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    
    ctx.fillText('敖隐', centerX, 200);
    
    // 副标题
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 55px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.fillText('龙族王子', centerX, 300);
    
    // 重置阴影
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // 品质标识背景
    ctx.fillStyle = 'rgba(70, 130, 180, 0.85)';
    ctx.fillRect(centerX - 150, 340, 300, 60);
    
    // 品质标识
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
    
    // 配色说明
    ctx.fillStyle = '#888888';
    ctx.font = '26px "Microsoft YaHei", "SimHei", sans-serif';
    ctx.fillText('配色：青蓝 #4682B4 | 白色 #FFFFFF | 金色 #FFD700', centerX, height - 110);
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
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

// 主函数
async function main() {
    const outputDir = __dirname;
    
    console.log('正在生成哪吒海报...');
    const nezhaCanvas = await createNezhaPoster();
    const nezhaBuffer = nezhaCanvas.toBuffer('image/png');
    fs.writeFileSync(path.join(outputDir, '哪吒-魔童降世-海报.png'), nezhaBuffer);
    console.log('✓ 已生成：哪吒-魔童降世-海报.png');
    
    console.log('正在生成敖隐海报...');
    const aoyinCanvas = await createAoyinPoster();
    const aoyinBuffer = aoyinCanvas.toBuffer('image/png');
    fs.writeFileSync(path.join(outputDir, '敖隐-龙族王子-海报.png'), aoyinBuffer);
    console.log('✓ 已生成：敖隐-龙族王子-海报.png');
    
    console.log('\n海报已生成完成！');
}

main().catch(error => {
    console.error('生成海报时出错:', error);
    process.exit(1);
});

