import type { FooterContent } from '../types';

export const footerContent: FooterContent = {
  copyright: `© ${new Date().getFullYear()} mobi. All rights reserved.`,
  tagline: '在正确的问题上用力',
  sections: [
    {
      title: '探索', links: [
        { label: '关于我', href: '#about' },
        { label: '项目', href: '#projects' },
      ],
    },
    {
      title: '深度', links: [
        { label: '书影', href: '#reading' },
        { label: '方法论', href: '#methodology' },
        { label: '博客', href: '#', disabled: true },
      ],
    },
    {
      title: '联系', links: [
        { label: '邮箱', href: 'mailto:1061219842@qq.com' },
        { label: '微信', href: '#contact' },
        { label: '手机', href: 'tel:19564178875' },
      ],
    },
  ],
};
