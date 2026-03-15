// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

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
  // useful metadata like html lang. For example, if your site is Chinese, you
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
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '笔记',
          },
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
            items: [
              {
                label: '小约翰可汗',
                to: '/docs/小约翰可汗/奇葩小国/小约翰008-阿尔巴尼亚_BV1Uy4y1S7Eq',
              },
              {
                label: '易经',
                to: '/docs/易经/易经壹乾卦上龙的传人下龙德用九_BV14o4y1z7wE',
              },
            ],
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
