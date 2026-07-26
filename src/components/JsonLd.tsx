interface PersonSchemaProps {
  name: string;
  url: string;
  description: string;
  email: string;
  image: string;
  sameAs?: string[];
}

export function PersonSchema({ name, url, description, email, image, sameAs }: PersonSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url,
    description,
    email,
    image,
    ...(sameAs?.length ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BlogPostSchemaProps {
  title: string;
  url: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl: string;
  tags?: string[];
}

export function BlogPostSchema({
  title, url, description, image, datePublished, dateModified, authorName, authorUrl, tags,
}: BlogPostSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    url,
    description,
    image,
    datePublished,
    ...(dateModified ? { dateModified } : {}),
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
    ...(tags?.length ? { keywords: tags.join(', ') } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebSiteSchemaProps {
  name: string;
  url: string;
  description: string;
}

export function WebSiteSchema({ name, url, description }: WebSiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
