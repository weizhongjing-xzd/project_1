const pptxgen = require('pptxgenjs');
const html2pptx = require('../.claude/skills/pptx/scripts/html2pptx.js');
const path = require('path');

async function createPresentation() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'AI Assistant';
  pptx.title = '人工智能助手的未来发展趋势';

  // 幻灯片 1: 封面
  await html2pptx('workspace/slides/slide1.html', pptx);

  // 幻灯片 2: 目录
  await html2pptx('workspace/slides/slide2.html', pptx);

  // 幻灯片 3: 章节一
  await html2pptx('workspace/slides/slide3.html', pptx);

  // 幻灯片 4: 章节二
  await html2pptx('workspace/slides/slide4.html', pptx);

  // 幻灯片 5: 章节三
  await html2pptx('workspace/slides/slide5.html', pptx);

  // 幻灯片 6: 结束页
  await html2pptx('workspace/slides/slide6.html', pptx);

  // 保存演示文稿
  await pptx.writeFile({ fileName: 'workspace/ai-assistant-future.pptx' });
  console.log('演示文稿已成功创建：workspace/ai-assistant-future.pptx');
}

createPresentation().catch(console.error);

