import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  lang?: string;
  publishedTime?: string;
  tags?: string[];
}

export default function SEOHead({
  title = 'mobi · 沉思型策略师',
  description = '用逻辑拆解复杂问题，用洞察降低决策风险。跨学科背景（经济学/心理学/行为科学），8年认知积累。',
  image = '/og-image.png',
  url = 'https://mobi520.cn',
  type = 'website',
  lang = 'zh-CN',
  publishedTime,
  tags,
}: SEOHeadProps) {
  const fullTitle = title.includes('mobi') ? title : `${title} | mobi`;
  const fullImage = image.startsWith('http') ? image : `https://mobi520.cn${image}`;
  const fullUrl = url.startsWith('http') ? url : `https://mobi520.cn${url}`;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="mobi" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Alternate language */}
      {lang === 'zh-CN' && (
        <link rel="alternate" hrefLang="en" href={`https://mobi520.cn/en${url}`} />
      )}
    </Helmet>
  );
}
