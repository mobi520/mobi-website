import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'MindKey 多模态健康评估与疗愈推荐系统',
    category: '全栈 AI 应用 · 独立开发',
    tags: ['全栈AI应用', '多模态融合', '计算机视觉', '隐私计算', 'LLM推理'],
    description: '多模态健康评估引擎——输入可穿戴 CSV、面部视频、对话文本、量表，经 11 个分析模块融合处理后输出个性化疗愈方案与健康报告。全流程本地离线，数据 72 小时自动焚毁。',
    gradient: 'from-purple-700 via-violet-600 to-indigo-800',
    image: '/mindkey-dashboard.webp',
    images: [
      { src: '/mindkey-dashboard.webp', label: '仪表盘总览' },
      { src: '/mindkey-analysis.webp', label: '节律分析' },
      { src: '/mindkey-health.webp', label: '品牌首页' },
    ],
    links: {
      github: 'https://github.com/mobi520/MindKey',
      demo: null,
      paper: null,
    },
    detail: {
      overview: 'MindKey 是一个面向康养场景的多模态健康评估与疗愈推荐系统。用户提供穿戴设备 CSV（心率变异性）、面部视频（微表情）、对话文本（心理语义）、睡眠自评、中医体质问卷等输入，系统经过 11 个分析模块处理、多模态融合、健康评分、风险评估，最终生成个性化疗愈行程建议。全流程本地离线运行，数据默认 72 小时内焚毁。',
      architecture: '5 路输入（生理信号 / 微表情 / 对话语义 / 睡眠分析 / 中医体质）→ 11 个分析模块 → 置信度加权多模态融合引擎 → 健康评分 + 风险评估 + 纵向趋势 → 疗愈行程生成（25 项活动库，逐日递进）→ 叙事报告 + 隐私审计 + 焚毁协议',
      features: [
        { title: '多模态融合引擎', description: '5 个模态各输出带置信度的子画像，融合层用置信度加权平均合并。任一模态缺失不影响整体流程，权重自适应调节。预留了贝叶斯融合接口以处理模态间矛盾。' },
        { title: '技能插件系统', description: '12 个分析模块以 BaseSkill 抽象注册，依赖管理用 Kahn 拓扑排序保证执行顺序。新模块只需实现 execute() + cleanup() 即可挂入管线。' },
        { title: '隐私第一架构——焚毁协议', description: '管线终末执行三段式覆写（0x00 → 0xFF → 随机）后 unlink，输出文件标注 72 小时保留期限。隐私审计模块检查 PII 残留与临时文件，出具合规审计报告。' },
        { title: '双轨对话分析', description: 'LLM 轨（Qwen2-1.5B 本地 4-bit 量化推理）与关键词启发式规则互为回退。无 GPU 时纯规则引擎依然可用，保证离线场景的完整功能。' },
        { title: '自定义表情模型训练', description: '用 FER2013 数据集（35,887 张 48×48 灰度图，7 类情绪）训练 CNN 情绪分类模型，导出 ONNX 格式。支持 Apple MPS / CUDA / CPU 三种训练后端。' },
      ],
      techStack: ['Python 3.11+', 'FastAPI', 'React 19 · Tailwind', 'ONNX Runtime', 'OpenCV · MediaPipe', 'PyTorch', 'Qwen2-1.5B', 'Docker'],
      highlights: ['~8,000 行 Python', '6 个前端页面', '15+ Pytest 单测', '12 个内置技能模块', '全流程本地离线', '72 小时自动焚毁'],
    },
  },
  {
    id: 2,
    title: 'AI驱动主题知识图谱轮动系统',
    category: '量化交易 · 竞赛项目',
    tags: ['A股量化', 'LLM因子', '知识图谱', '状态机', '回测系统'],
    description: '完全自研的A股量化交易系统——用"主题轮动"替代传统"多因子选股"，四引擎架构从数据到决策覆盖全链路。整合7类数据源、20个Alpha因子、4个LLM另类因子，参加浙江省大学生证券投资竞赛。',
    gradient: 'from-emerald-700 to-cyan-800',
    image: '/quant-trading-dashboard.svg',
    images: [
      { src: '/quant-trading-dashboard.svg', label: 'AI量化引擎仪表盘' },
      { src: '/quant-trading-architecture.svg', label: '四引擎系统架构图' },
    ],
    links: {
      github: 'https://github.com/mobi520/mobi-finance',
      demo: null,
      paper: null,
    },
    detail: {
      overview: '完全自研的 A 股量化交易系统，从底层数据到上层策略覆盖全链路。核心思路是用"主题轮动"替代传统"多因子选股"——不预测哪只股票会涨，而是判断哪个主题正在被市场定价。系统参加第十二届浙江省大学生证券投资竞赛（量化赛道），设计文档约 6,500 行 Markdown，策略代码约 1,000 行 Python。',
      architecture: '四引擎架构：Theme State Engine（主题识别 + 5 态滞回状态机：COLD→BREWING→RALLYING→CLIMAX→FADING）→ Leader Engine（8 维评分 + 四角色分类筛选龙头股）→ Portfolio Engine（风险预算权重优化构建组合）→ Backtest Engine（事件驱动回测 + Brinson 归因分析）',
      features: [
        { title: 'LLM 另类因子（4 个）', description: '将新闻情绪、公告利好程度、龙虎榜资金性质、行业热点持续性转化为 0-100 量化分数。解决传统因子拥挤问题，设计双重校验 + 降级机制（LLM 不可用时回退到词频方法）。' },
        { title: '主题知识图谱', description: '建模产业链上下游关系，上游异动时提前预判下游爆发。解决传统主题轮动的"滞后性"痛点——在新闻铺天盖地之前提前布局。' },
        { title: '传统 Alpha 因子体系（20 个）', description: '覆盖动量趋势（5）、波动特征（3）、量价关系（3）、资金流向（3）、市场情绪（3）、估值因子（3），构建全面的因子评分体系。' },
        { title: '全 A 股综合分析工具', description: '1,294 行 analysis_stocks.py，支持市场概览、个股深度分析、行业筛选、主题成分股分析。内置东财防封限流机制、数据缓存层。' },
      ],
      techStack: ['Python', 'LLM 因子引擎', '5 态滞回状态机', '产业链知识图谱', '事件驱动回测', '多源数据融合', 'Streamlit', 'Supermind 仿真'],
      highlights: ['~6,500 行设计文档', '~1,000 行策略代码', '20 个 Alpha 因子', '4 个 LLM 另类因子', '7 类数据源', '50 只股票池'],
    },
  },
  {
    id: 3,
    title: 'AURA OS · 曜 AI 美肌情绪恢复系统',
    category: '全栈前端 · 品牌设计系统',
    tags: ['React 19', 'Tailwind CSS v4', '设计系统', '路由架构', 'Spa管理', '动效设计'],
    description: '面向高端美容院线的 AI 美肌情绪恢复操作系统。包含客户画像、面部状态AI分析、个性化疗程推荐、恢复追踪、会员体系完整模块。设计语言强调"科技隐匿于优雅之中"。',
    gradient: 'from-rose-300 via-rose-200 to-champagne-200',
    image: '/aura-landing.svg',
    images: [
      { src: '/aura-landing.svg', label: '品牌首页' },
    ],
    links: {
      github: 'https://github.com/mobi520/AURA-OS--',
      demo: null,
      paper: null,
    },
    detail: {
      overview: 'AURA OS（曜 AI 美肌情绪恢复系统）是一个面向高端 spa 与美容院线的品牌化操作系统。系统从品牌定位到设计系统全部自主搭建——强调"科技隐匿于优雅之中"的奢华体验。包含 6 个核心模块：品牌 Landing、客户画像管理、面部状态 AI 分析、个性化疗程推荐、恢复进度追踪、会员 VIP 体系。',
      architecture: 'React 19 + Vite 8 前端单页应用 → 6 页面 React Router 路由架构 → 统一设计系统 (色调/字体/圆角/动效协议) → Lucide 图标系统 → Tailwind CSS v4 零运行时样式',
      features: [
        { title: '完整设计系统', description: '从零搭建的品牌色系（肌肤暖调 + 玫瑰金点缀）、字体栈（Cormorant Garamond + Noto Serif SC + Inter）、圆角/阴影/动效协议。非套用模板，每一像素都来自品牌策略推导。' },
        { title: '6 页面 SPA 路由架构', description: 'Landing 品牌首页 → Profile 客户画像 → FaceAnalysis AI 面部状态 → Treatment 疗程推荐 → Recovery 恢复追踪 → Membership 会员体系。React Router v7 路由嵌套，Layout+Sidebar 统一布局。' },
        { title: '面部状态分析 UI', description: 'AI 驱动的面部数据可视化仪表盘，展示肌肤疲劳度、纹理变化与微循环状态。预留了与 MindKey 后端对接的数据接口。' },
        { title: '个性化疗程匹配引擎', description: '基于客户面部状态、情绪压力和睡眠质量，智能匹配最适合的疗程组合。匹配度综合皮肤需求、预算和恢复周期。' },
        { title: '会员成长体系', description: '银卡/金卡/钻石三级会员体系，积分累积、专属权益、推荐奖励。适合高客单价美容院线客户关系管理。' },
      ],
      techStack: ['React 19', 'Vite 8', 'Tailwind CSS v4', 'React Router v7', 'Lucide Icons', 'Framer Motion', 'Inter / Noto Serif CJK'],
      highlights: ['6 个完整页面', '310+ 行自定义 CSS 设计 Token', '玫瑰金 + 暖瓷肌品牌色系', '完整设计系统文档', '预留 AI 对接接口', '优雅动效系统'],
    },
  },
];
