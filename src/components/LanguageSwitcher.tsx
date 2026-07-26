import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.startsWith('zh') ? 'zh' : 'en';

  const toggle = () => {
    const next = currentLang === 'zh' ? 'en-US' : 'zh-CN';
    i18n.changeLanguage(next);

    // Update URL path for language routing
    const url = new URL(window.location.href);
    if (next === 'en-US') {
      url.pathname = '/en' + url.pathname;
    } else {
      url.pathname = url.pathname.replace(/^\/en/, '') || '/';
    }
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <button
      onClick={toggle}
      aria-label={currentLang === 'zh' ? 'Switch to English' : '切换到中文'}
      className="text-xs font-medium tracking-wide px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
    >
      {currentLang === 'zh' ? 'EN' : '中'}
    </button>
  );
}
