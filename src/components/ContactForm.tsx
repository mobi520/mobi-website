import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { contactInfo } from '../data/contact';

const contactSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  message: z.string().min(1, 'Required'),
});

type ContactFormData = z.infer<typeof contactSchema>;

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('sending');
    setErrorMsg('');

    try {
      // EmailJS-style: construct mailto as fallback
      const subject = encodeURIComponent(`[mobi520.cn] Message from ${data.name}`);
      const body = encodeURIComponent(
        `From: ${data.name} (${data.email})\n\n${data.message}`
      );
      window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
      setStatus('sent');
      reset();
    } catch {
      setStatus('error');
      setErrorMsg(`Unable to send. Please email ${contactInfo.email} directly.`);
    }
  };

  if (status === 'sent') {
    return (
      <div className="text-center py-6">
        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
          <Check size={20} className="text-green-400" />
        </div>
        <p className="text-white/80 text-sm font-medium mb-1">{t('contact.sent')}</p>
        <p className="text-white/40 text-xs">{t('contact.willReply')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <input
            {...register('name')}
            type="text"
            placeholder={t('contact.yourName')}
            aria-label={t('contact.yourName')}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder={t('contact.email')}
            aria-label={t('contact.email')}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <textarea
          {...register('message')}
          placeholder={t('contact.message')}
          rows={3}
          aria-label={t('contact.messageContent')}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 text-sm placeholder-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all resize-none"
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        aria-label={status === 'sending' ? t('contact.sending') : t('contact.send')}
        className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white/80 text-sm font-medium transition-all disabled:opacity-50 click-bounce hover-scale"
      >
        {status === 'sending' ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" role="status" />
        ) : (
          <>{t('contact.send')} <Send size={13} strokeWidth={1.5} /></>
        )}
      </button>
      {status === 'error' && errorMsg && (
        <p className="text-yellow-400/80 text-xs text-center" role="alert">{errorMsg}</p>
      )}
    </form>
  );
}
