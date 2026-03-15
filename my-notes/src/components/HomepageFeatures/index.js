import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '视频笔记',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        整理B站优质视频内容，包括小约翰可汗的历史系列、
        易经讲解等，方便随时查阅和学习。
      </>
    ),
  },
  {
    title: '知识分类',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        内容按主题分类整理，涵盖历史、文化、哲学等多个领域，
        帮助建立系统化的知识体系。
      </>
    ),
  },
  {
    title: '持续更新',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        笔记库持续更新，跟随视频发布节奏同步整理新内容，
        保持知识的时效性和完整性。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
