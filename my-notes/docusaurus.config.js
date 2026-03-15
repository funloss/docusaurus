// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const fs = require('fs');
const path = require('path');

// 动态读取 docs 文件夹结构生成导航栏
function generateNavbarItems() {
  const navbarItems = [];
  const docsPath = path.join(__dirname, 'docs');
  
  // 如果 docs 文件夹不存在（比如在构建前），返回空数组
  if (!fs.existsSync(docsPath)) {
    return navbarItems;
  }
  
  // 读取 docs 下的所有一级文件夹
  const categories = fs.readdirSync(docsPath)
    .filter(item => {
      const itemPath = path.join(docsPath, item);
      return fs.statSync(itemPath).isDirectory() && !item.startsWith('.');
    })
    .sort();
  
  for (const category of categories) {
    const categoryPath = path.join(docsPath, category);
    
    // 递归查找第一个 markdown 文件
    function findFirstMarkdownFile(dir) {
      const items = fs.readdirSync(dir).sort();
      
      for (const item of items) {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
          const result = findFirstMarkdownFile(itemPath);
          if (result) return result;
        } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
          return itemPath;
        }
      }
      return null;
    }
    
    const firstFile = findFirstMarkdownFile(categoryPath);
    
    if (firstFile) {
      // 构建 URL 路径
      const relativePath = path.relative(docsPath, firstFile);
      const urlPath = relativePath
        .replace(/\\/g, '/') // Windows 兼容
        .replace(/\.mdx?$/, ''); // 移除扩展名
      
      navbarItems.push({
        to: `/docs/${urlPath}`,
        position: 'left',
        label: category,
      });
    }
  }
  
  return navbarItems;
}

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '知识笔记库',
  tagline: '记录学习的点滴，分享知识的乐趣',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://funloss.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'funloss', // Usually your GitHub org/user name.
  projectName: 'funKnowledge', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/funloss/funKnowledge/tree/main/B站视频笔记/',
          // 禁用数字前缀解析，保留完整文件名
          numberPrefixParser: false,
          sidebarItemsGenerator: async ({defaultSidebarItemsGenerator, ...args}) => {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            
            // 递归处理侧边栏项目
            function processItem(item) {
              if (item.type === 'doc') {
                // 从 doc id 提取文件名信息
                // id 格式如: 易经/11_易经拾壹泰卦上大泰来吉下君子谋和_BV14o4y1z7wE
                const parts = item.id.split('/');
                const fileName = parts[parts.length - 1];
                // 移除 BV 号部分，保留主要内容
                const cleanName = fileName.replace(/_BV[\w]+$/, '');
                return {
                  ...item,
                  label: cleanName,
                };
              }
              if (item.type === 'category' && item.items) {
                return {
                  ...item,
                  items: item.items.map(processItem),
                };
              }
              return item;
            }
            
            return sidebarItems.map(processItem);
          },
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: '知识笔记库',
        logo: {
          alt: '知识笔记库 Logo',
          src: 'img/logo.svg',
        },
        items: [
          ...generateNavbarItems(),
          {
            href: 'https://github.com/funloss/funKnowledge',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '笔记分类',
            items: generateNavbarItems().map(item => ({
              label: item.label,
              to: item.to,
            })),
          },
          {
            title: '相关链接',
            items: [
              {
                label: 'GitHub 仓库',
                href: 'https://github.com/funloss/funKnowledge',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} funloss. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
