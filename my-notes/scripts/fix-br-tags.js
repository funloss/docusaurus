#!/usr/bin/env node
/**
 * 修复 Markdown 文件中的 <br> 标签为 <br />
 * 跨平台兼容（macOS 和 Linux）
 */

const fs = require('fs');
const path = require('path');

function findMarkdownFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findMarkdownFiles(fullPath, files);
    } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function fixBrTags(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  
  // 替换 <br> 为 <br />
  content = content.replace(/<br>(?![\s\/])/g, '<br />');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Fixed: ${filePath}`);
    return true;
  }
  return false;
}

const docsDir = path.join(__dirname, '..', 'docs');

if (!fs.existsSync(docsDir)) {
  console.log('docs directory not found, skipping...');
  process.exit(0);
}

const markdownFiles = findMarkdownFiles(docsDir);
let fixedCount = 0;

for (const file of markdownFiles) {
  if (fixBrTags(file)) {
    fixedCount++;
  }
}

console.log(`\nFixed ${fixedCount} files.`);
