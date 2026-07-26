import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

const SITE_URL = 'https://mobi520.cn';
const SITE_NAME = 'mobi · 沉思型策略师';
const SITE_DESC = '用逻辑拆解复杂问题，用洞察降低决策风险。跨学科背景（经济学/心理学/行为科学），8年认知积累。';

// Blog post data (mirrored from src/data/blog/posts.ts)
const posts = [
  {
    slug: 'thinking-in-structures',
    title: '结构化思考：从模糊问题到可执行方案',
    date: '2026-07-20',
    tags: ['方法论', '思维方式', '问题拆解'],
    excerpt: '面对模糊的商业挑战时，大多数人第一反应是"找答案"。但真正有价值的第一步，是"定义正确的问题"。',
  },
  {
    slug: 'reading-and-thinking',
    title: '阅读与思考：为什么跨学科阅读是策略师的必修课',
    date: '2026-07-15',
    tags: ['阅读', '跨学科', '认知'],
    excerpt: '从《窄门》到《贪婪的多巴胺》，看似不相关的书其实指向同一个母题——理解"人"这个物种如何运作。',
  },
];

// ===== Generate RSS =====
function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function generateRss() {
  const items = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid>${SITE_URL}/blog/${p.slug}</guid>
      <description>${escapeXml(p.excerpt)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <category>${p.tags.map(escapeXml).join(',')}</category>
    </item>`
    )
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESC)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  writeFileSync(join(distDir, 'rss.xml'), rss);
  console.log('✓ rss.xml generated');
}

// ===== Generate Sitemap =====
function generateSitemap() {
  const pages = [
    { url: SITE_URL, priority: '1.0', changefreq: 'weekly' },
    { url: `${SITE_URL}/blog`, priority: '0.8', changefreq: 'weekly' },
  ];

  // Add blog posts
  for (const p of posts) {
    pages.push({
      url: `${SITE_URL}/blog/${p.slug}`,
      priority: '0.6',
      changefreq: 'monthly',
    });
  }

  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  writeFileSync(join(distDir, 'sitemap.xml'), sitemap);
  console.log('✓ sitemap.xml generated');
}

generateRss();
generateSitemap();
