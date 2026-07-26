import { useState, useEffect } from 'react';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export default function CodeBlock({ code, lang = 'text' }: CodeBlockProps) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    let cancelled = false;
    codeToHtml(code, {
      lang,
      theme: 'github-light',
    }).then((result) => {
      if (!cancelled) setHtml(result);
    }).catch(() => {
      if (!cancelled) setHtml(`<pre><code>${escapeHtml(code)}</code></pre>`);
    });
    return () => { cancelled = true; };
  }, [code, lang]);

  return (
    <div
      className="my-4 rounded-xl overflow-hidden border border-gray-200 text-sm"
      dangerouslySetInnerHTML={{ __html: html || `<pre><code>${escapeHtml(code)}</code></pre>` }}
    />
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
