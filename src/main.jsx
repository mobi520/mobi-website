import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 装饰标题滚动入场观察器
const titleObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        titleObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

// 在 DOM 就绪后开始观察
const observeTitles = () => {
  document.querySelectorAll('.section-en-title').forEach((el) => {
    titleObserver.observe(el);
  });
};

// MutationObserver：等待组件渲染出 .section-en-title 后开始观察
const domObserver = new MutationObserver(() => {
  if (document.querySelector('.section-en-title')) {
    observeTitles();
  }
});
domObserver.observe(document.body, { childList: true, subtree: true });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
