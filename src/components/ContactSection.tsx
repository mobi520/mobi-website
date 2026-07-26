import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, MessageCircle, Phone, Copy, Check, ExternalLink, QrCode, X } from 'lucide-react';
import { contactInfo, contactSectionContent } from '../data/contact';
import { siteMeta } from '../data/site';
import { footerContent } from '../data/footer';
import ContactForm from './ContactForm';
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

interface ContactSectionProps {
  activeSection: SectionId;
}

export default function ContactSection({ activeSection }: ContactSectionProps) {
  const { t } = useTranslation();
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
              <h3 className="text-white/60 text-sm font-medium mb-4">{t('contact.sendMessage')}</h3>
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
