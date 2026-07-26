import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Phone, Copy, Check, Send, ExternalLink, QrCode, X } from 'lucide-react';
import { contactInfo, contactSectionContent } from '../data/contact';
import { siteMeta } from '../data/site';
import { footerContent } from '../data/footer';
import type { SectionId } from '../types';
import type { LucideIcon } from 'lucide-react';

interface ContactItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

function ContactItem({ icon: Icon, label, value, href }: ContactItemProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = async (): Promise<void> => {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const content = (
    <div className="group flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-400 cursor-pointer hover-scale click-bounce backdrop-blur-sm">
      <div className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center group-hover:bg-white/15 transition-colors shrink-0">
        <Icon size={16} className="text-white/70" strokeWidth={1.5} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-white/30 text-[10px] tracking-widest uppercase mb-0.5">{label}</p>
        <p className="text-white/70 text-xs font-medium truncate">{value}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {label === '微信' && (
          <button onClick={() => setShowQR(true)} className="p-1.5 rounded-full hover:bg-white/8 transition-colors" title="二维码" aria-label="查看微信二维码">
            <QrCode size={14} className="text-white/30 group-hover:text-white/50 transition-colors" />
          </button>
        )}
        <button onClick={handleCopy} className="p-1.5 rounded-full hover:bg-white/8 transition-colors" title="复制" aria-label="复制到剪贴板">
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-white/30 group-hover:text-white/50 transition-colors" />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {href ? <a href={href} className="block">{content}</a> : content}
      {showQR && label === '微信' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowQR(false)} />
          <div className="relative z-10 bg-white rounded-2xl p-5 max-w-[260px] text-center shadow-2xl">
            <button onClick={() => setShowQR(false)} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100">
              <X size={16} className="text-gray-400" />
            </button>
            <img src="/wechat-qr.webp" alt="微信二维码" className="w-44 h-44 mx-auto mb-3 rounded-lg" />
            <p className="text-gray-800 text-sm font-medium mb-1">{contactInfo.wechat}</p>
            <p className="text-gray-400 text-xs">扫码添加微信</p>
          </div>
        </div>
      )}
    </>
  );
}

type FormStatus = 'loading' | 'idle' | 'sending' | 'sent' | 'error';

function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('loading');
  const [errorDetail, setErrorDetail] = useState('');
  const [endpointOk, setEndpointOk] = useState(false);

  // 检查后端 API 是否可用
  useEffect(() => {
    let cancelled = false;
    fetch(contactInfo.formEndpoint, { method: 'HEAD' })
      .then(() => { if (!cancelled) setEndpointOk(true); })
      .catch(() => { if (!cancelled) setEndpointOk(false); })
      .finally(() => { if (!cancelled) setStatus('idle'); });
    return () => { cancelled = true; };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!endpointOk) {
      setStatus('error');
      setErrorDetail('留言服务未部署。请通过邮箱 ' + contactInfo.email + ' 或微信 ' + contactInfo.wechat + ' 直接联系。');
      return;
    }
    setStatus('sending');
    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch(contactInfo.formEndpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
        setErrorDetail('留言服务暂时不可用。你可以直接通过邮箱 ' + contactInfo.email + ' 或微信 ' + contactInfo.wechat + ' 联系我。');
      }
    } catch {
      setStatus('error');
      setErrorDetail('留言服务暂时不可用。你可以直接通过邮箱 ' + contactInfo.email + ' 或微信 ' + contactInfo.wechat + ' 联系我。');
    }
  };

  if (status === 'loading') {
    return <div className="text-center py-4"><span className="text-white/30 text-xs">加载中...</span></div>;
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-6">
        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
          <Check size={20} className="text-green-400" />
        </div>
        <p className="text-white/80 text-sm font-medium mb-1">消息已发送</p>
        <p className="text-white/40 text-xs">我会尽快回复</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          id="contact-name"
          type="text"
          name="name"
          placeholder="你的名字"
          required
          aria-label="你的名字"
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
        />
        <input
          id="contact-email"
          type="email"
          name="email"
          placeholder="邮箱地址"
          required
          aria-label="邮箱地址"
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
        />
      </div>
      <textarea
        id="contact-message"
        name="message"
        placeholder="说说你的想法或问题……"
        rows={3}
        required
        aria-label="消息内容"
        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all resize-none"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        aria-label={status === 'sending' ? '正在发送' : '发送消息'}
        className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white/80 text-sm font-medium transition-all disabled:opacity-50 click-bounce hover-scale"
      >
        {status === 'sending' ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" role="status" />
        ) : (
          <>
            发送消息 <Send size={13} strokeWidth={1.5} />
          </>
        )}
      </button>
      {status === 'error' && errorDetail && (
        <div className="text-center">
          <p className="text-yellow-400/80 text-xs mb-2">{errorDetail}</p>
          <p className="text-white/30 text-[10px]" role="alert">或<a href={`mailto:${contactInfo.email}`} className="text-white/60 hover:text-white underline mx-1">发送邮件</a></p>
        </div>
      )}
    </form>
  );
}

interface ContactSectionProps {
  activeSection: SectionId;
}

export default function ContactSection({ activeSection }: ContactSectionProps) {
  return (
    <section id="contact" className="horizontal-panel">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a120d]/50 via-transparent to-[#0a120d]/70" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.14, 0.8, 0.32, 1] as const }}
        className="relative z-10 w-full max-w-page mx-auto px-8 md:px-16 h-full flex flex-col justify-center py-10"
      >
        <div className="mb-6">
          <p className="section-subtitle-magazine text-white/35 mb-2">{contactSectionContent.subtitle}</p>
          <h2 className="text-display-lg text-white">{contactSectionContent.title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-3">
            <ContactItem icon={Mail} label="邮箱" value={contactInfo.email} href={`mailto:${contactInfo.email}`} />
            <ContactItem icon={MessageCircle} label="微信" value={contactInfo.wechat} />
            <ContactItem icon={Phone} label="手机" value={contactInfo.phone} href={`tel:${contactInfo.phone}`} />

            {contactSectionContent.bookingUrl && (
              <a
                href={contactSectionContent.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.15] transition-all text-white/60 hover:text-white/80 text-sm font-medium hover-scale click-bounce backdrop-blur-sm"
              >
                <ExternalLink size={14} /> 预约时间聊聊
              </a>
            )}
          </div>

          <div className="lg:col-span-3">
            <div className="p-4 md:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
              <h3 className="text-white/60 text-sm font-medium mb-4">发消息给我</h3>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            {siteMeta.name} · {siteMeta.motto}
          </p>
          <p className="text-white/15 text-xs italic">{siteMeta.mottoEn}</p>
          <p className="text-white/15 text-xs">{footerContent.copyright}</p>
        </div>
      </motion.div>
    </section>
  );
}
