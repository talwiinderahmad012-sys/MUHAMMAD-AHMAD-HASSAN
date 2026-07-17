import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X, Mail, Send, Check, Loader2,
  Github, Linkedin, Instagram, Facebook, ArrowUpRight,
} from 'lucide-react';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Each platform's official brand color (reused on hover)
const SOCIALS = [
  { name: 'GitHub',    url: 'https://github.com/talwiinderahmad012-sys/MUHAMMAD-AHMAD-HASSAN',   Icon: Github,    color: '#ffffff' },
  { name: 'LinkedIn',  url: 'https://linkedin.com', Icon: Linkedin,  color: '#0A66C2' },
  { name: 'Instagram', url: 'https://www.instagram.com/ahmadhassan_33/',Icon: Instagram, color: '#E1306C' },
  { name: 'Facebook',  url: 'https://www.facebook.com/profile.php?id=61591740126168', Icon: Facebook,  color: '#1877F2' },
];

export default function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!form.name || !form.email) {
      alert('Please fill in all required fields');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setFormState('submitting');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (response.ok) {
        setFormState('success');
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to send message. Please try again or contact directly via email.');
      setFormState('idle');
    }
  };

  const handleReset = () => {
    setForm({ name: '', email: '', message: '' });
    setFormState('idle');
  };

  if (!isOpen) return null;

  return (
    <div
      id="connect-modal-overlay"
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target.id === 'connect-modal-overlay') onClose();
      }}
    >
      <motion.div
        id="connect-modal-card"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="bg-[#0B0E14] border border-[#F5A524]/30 rounded-none w-full max-w-md overflow-hidden shadow-2xl relative flex flex-col font-sans text-left"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#0E1117] border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#F5A524]/10 border border-[#F5A524]/30 flex items-center justify-center rounded-none text-[#F5A524]">
              <Send className="w-3 h-3" />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-extrabold text-white">
              Connect // Secure Gateway
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors duration-150 rounded-none cursor-pointer p-0"
            title="Close modal"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
          {formState === 'success' ? (
            <div className="py-8 text-center space-y-4 flex flex-col items-center">
              <div className="w-14 h-14 rounded-none bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Check className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-white">Connection Established</h3>
                <p className="text-white/50 text-xs max-w-xs mx-auto font-light leading-relaxed">
                  Handshake complete. We'll respond within 24 operational hours.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-5 py-2 rounded-none border border-white/10 hover:border-white/30 text-white font-mono text-xs cursor-pointer transition-all uppercase"
              >
                Send another
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-white">Let's connect directly.</h3>
                <p className="text-white/40 text-xs font-light">
                  Drop your details and I'll get back to you, or reach out on socials.
                </p>
              </div>

              {/* Quick email row */}
              <a
                href="mailto:hexframe@gmail.com"
                className="flex items-center justify-between p-3 rounded-none bg-white/[0.02] border border-white/10 hover:border-[#F5A524]/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#F5A524]" />
                  <span className="font-mono text-xs text-white/70">hexframe@gmail.com</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors" />
              </a>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] text-white/40 tracking-wider uppercase">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-[#11151D] border border-white/10 focus:border-[#F5A524]/50 rounded-none text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] text-white/40 tracking-wider uppercase">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full px-4 py-3 bg-[#11151D] border border-white/10 focus:border-[#F5A524]/50 rounded-none text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] text-white/40 tracking-wider uppercase">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Briefly describe your project..."
                    rows={3}
                    className="w-full px-4 py-3 bg-[#11151D] border border-white/10 focus:border-[#F5A524]/50 rounded-none text-sm text-white placeholder-white/20 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full py-3.5 rounded-none bg-[#F5A524] text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {formState === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      Transmit
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Socials */}
              <div className="pt-4 border-t border-white/5">
                <div className="font-mono text-[9px] tracking-wider text-white/30 uppercase mb-3">
                  Or find me on
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {SOCIALS.map(({ name, url, Icon, color }) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-none bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = color + '60';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '';
                      }}
                    >
                      <Icon
                        className="w-4 h-4 text-white/40 transition-colors"
                        onMouseEnter={(e) => (e.currentTarget.style.color = color)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                      />
                      <span className="font-mono text-[10px] text-white/60">{name}</span>
                      <ArrowUpRight className="w-3 h-3 text-white/15 ml-auto group-hover:text-white/40 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
