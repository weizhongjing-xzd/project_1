const { chromium } = require('playwright');
const path = require('path');

async function main() {
  const htmlPath = path.resolve(__dirname, 'aoyin-poster.html');
  const outputPath = path.resolve(__dirname, 'aoyin_poster.png');

  const browser = await chromium.launch({
    args: [
      '--allow-file-access-from-files',
      '--disable-web-security'
    ]
  });
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1920 },
  });

  // 打印页面中的 console，便于调试图片加载问题
  page.on('console', msg => {
    console.log('[page]', msg.type(), msg.text());
  });

  // 使用 file:// 协议加载本地 HTML
  await page.goto('file://' + htmlPath, { waitUntil: 'load' });

  // 等待前端标记绘制完成（包括图片加载并绘制到 Canvas）
  await page.waitForFunction('window.__posterDone === true', { timeout: 20000 });

  const canvas = await page.$('#poster');
  await canvas.screenshot({ path: outputPath });

  await browser.close();
  console.log('海报已生成：', outputPath);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


