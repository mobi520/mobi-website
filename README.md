# 墨笔 · 个人作品集

基于 React 19 + Vite 8 + TypeScript + Tailwind CSS 的个人品牌网站，苹果系设计，沉浸式视觉体验。

## ✨ 特性

- **苹果系设计** — 毛玻璃导航栏、液态按钮、极简排版
- **沉浸式视觉** — 视频背景 + 光标光晕 + GSAP/Framer Motion 动画
- **暗色模式** — 亮/暗双主题
- **TypeScript** — strict mode，零 any
- **MDX 博客** — Shiki 语法高亮，搜索 + 标签筛选
- **中英双语** — i18next + URL 路径策略
- **SEO** — OG/Twitter/JSON-LD/Sitemap/RSS
- **PWA** — 可安装，离线缓存
- **联系表单** — React Hook Form + Zod 校验
- **评论** — Giscus (GitHub Discussions)
- **CI/CD** — GitHub Actions 自动构建部署

## 🚀 快速开始

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 生产构建
npm run preview  # 预览
npm run lint     # 代码检查
```

## 📦 技术栈

React 19 · Vite 8 · TypeScript 7 · Tailwind CSS 3 · Framer Motion 12 · GSAP 3 · MDX 3 · Shiki 4 · react-i18next · React Hook Form · Zod · fuse.js · vite-plugin-pwa

## 📁 项目结构

```
src/
├── components/     # 页面组件 + SEO/Blog/PWA
├── data/           # 类型安全配置 + blog/ MDX文章
├── hooks/          # 自定义 Hooks
├── i18n/           # locales/zh-CN.json, en-US.json
├── types/          # TypeScript 类型定义
├── context/        # MouseContext (光标追踪)
├── App.tsx         # 根组件 (路由: home/blog/reading)
└── main.tsx        # 入口
```

## 🌍 国际化

- 默认中文 (`/`)，英文 (`/en/`)
- 翻译文件: `src/i18n/locales/`
- 语言切换器: 导航栏 EN/中 按钮

## 📝 写博客

在 `src/data/blog/` 下创建 `.mdx` 文件，然后在 `posts.ts` 中注册:

```tsx
// posts.ts
{ slug: 'my-post', title: '...', date: '2026-07-26', tags: ['...'], excerpt: '...', author: 'mobi' }
```

## 📊 Lighthouse

| 指标 | 目标 |
|------|------|
| Performance | ≥ 95 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 |

## 📄 许可证

MIT

---

Made with [Proma](https://proma.cool) · [GitHub](https://github.com/proma-ai/Proma)
