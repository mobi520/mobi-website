import { useEffect, useRef } from 'react';

export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || container.querySelector('script')) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'mobi520/mobi-website');
    script.setAttribute('data-repo-id', 'R_kgDOMOCKER'); // placeholder - update with your repo ID
    script.setAttribute('data-category', 'Blog Comments');
    script.setAttribute('data-category-id', 'DIC_kwDOMOCKEM4Cx'); // placeholder - update
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    container.appendChild(script);
  }, []);

  return <div ref={ref} className="giscus" />;
}
