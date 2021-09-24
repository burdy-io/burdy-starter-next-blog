import Head from 'next/head';
import React from 'react';
import { IBurdyImage } from '../types/burdy-cms';

interface ISeoHeadProps {
  title?: string;
  description?: string;
  featured?: IBurdyImage;
}

const SeoHead: React.VoidFunctionComponent<ISeoHeadProps> = ({title, description, featured}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={description}/>
      <meta property="og:image" content={featured?.src}/>
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={featured?.src} />
      <meta name="twitter:card" content="summary_large_image"/>
    </Head>
  );
};

export default SeoHead;
