# 墨笔 · 个人作品集

基于 React 19 + Vite 8 + Tailwind CSS 构建的个人品牌网站，采用苹果系设计语言，搭配 GSAP 滚动动画与 Framer Motion 转场效果。

## 特性

- **苹果系设计** — 毛玻璃导航栏、液态按钮、极简排版
- **滚动动画** — GSAP ScrollTrigger 驱动的视差效果和入场动画
- **响应式布局** — 从移动端到大屏的自适应网格
- **内容数据化** — 集中管理配置文件，方便替换实际内容
- **Framer Motion** — 组件级别的微交互动画

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
mobi-website/
├── public/            # 静态资源
├── src/
│   ├── components/    # 页面组件 (Navbar, Hero, About, Projects, Strengths, Contact)
│   ├── data/          # 网站内容数据 (siteContent.js)
│   ├── hooks/         # 自定义 Hooks (useScrollAnimation)
│   ├── App.jsx        # 根组件
│   ├── main.jsx       # 入口文件
│   └── index.css      # 全局样式 + Tailwind
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 技术栈

| 工具 | 版本 |
|------|------|
| React | 19 |
| Vite | 8 |
| Tailwind CSS | 3 |
| Framer Motion | 12 |
| GSAP | 3 |
| Lucide Icons | 1 |

## 自定义

编辑 `src/data/siteContent.js` 替换为自己的个人信息、项目案例和核心优势。

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
