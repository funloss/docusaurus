import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

// 默认链接（用于 SSR 和备用）- 使用完整的文件名（包含数字前缀）
const DEFAULT_DOC_LINK = '/docs/小约翰可汗/奇葩小国/01_小约翰008-阿尔巴尼亚_BV1Uy4y1S7Eq';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [docLink, setDocLink] = useState(DEFAULT_DOC_LINK);

  useEffect(() => {
    // 在客户端运行时，从导航栏获取第一个文档链接
    if (typeof window !== 'undefined') {
      // 尝试从导航栏获取第一个链接
      const navLinks = document.querySelectorAll('.navbar__items--left .navbar__item');
      for (const link of navLinks) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/docs/')) {
          setDocLink(href);
          break;
        }
      }
    }
  }, []);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to={docLink}>
            浏览笔记 📚
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`首页`}
      description="个人知识笔记库，记录学习的点滴">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
