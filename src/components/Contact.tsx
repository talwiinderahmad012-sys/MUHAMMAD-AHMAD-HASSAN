import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  Github, Linkedin, Instagram, Facebook,
  Send, Check, Loader2, ArrowRight, ExternalLink 
} from 'lucide-react';
import { SOCIAL_LINKS } from '../data';

const ICON_MAP: Record<string, any> = {
  Github,
  Linkedin,
  Instagram,
  Facebook,
};

// Each platform's official brand color
const BRAND_COLORS: Record<string, string> = {
  GitHub:    '#ffffff',
  LinkedIn:  '#0A66C2',
  Instagram: '#E1306C',
  Facebook:  '#1877F2',
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    budget: '',
    disciplines: [] as string[],
  });

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const shouldReduceMotion = useReducedMotion();

  const handleDisciplineToggle = (disc: string) => {
    setFormData(prev => {
      const exists = prev.disciplines.includes(disc);
      const updated = exists 
        ? prev.disciplines.filter(d => d !== disc)
        : [...prev.disciplines, disc];
      return { ...prev, disciplines: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    const newErrors: Record<string, string> = {};
    
    // Validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    if (formData.disciplines.length === 0) {
      newErrors.disciplines = 'Please select at least one discipline track';
    }
    
    if (!formData.budget) {
      newErrors.budget = 'Please select a target project budget';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Project brief is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
          name: formData.name,
          email: formData.email,
          message: formData.message,
          budget: formData.budget,
          disciplines: formData.disciplines.join(', '),
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
      setErrors({ submit: 'Failed to send message. Please try again or contact directly via email.' });
      setFormState('idle');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
      budget: '',
      disciplines: [],
    });
    setErrors({});
    setFormState('idle');
  };

  return (
    <section id="contact-section" className="relative py-20 px-6 z-10 bg-[#0E1117]/30 backdrop-blur-md border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left: General Agency details & Links list */}
        <div className="lg:col-span-5 text-left space-y-8 flex flex-col justify-between py-2">
          <div className="space-y-6">
            <div className="font-mono text-[10px] tracking-[0.25em] text-cyan-accent font-semibold uppercase">
              // CONNECT_GATEWAY
            </div>
            
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
              Let's craft the next milestone.
            </h2>
            
            <p className="text-white/50 text-sm md:text-base leading-relaxed font-sans font-light">
              Are you interested in commissioning full-stack product development, configuring unified 
              Figma design libraries, or filming a cinematic SaaS teaser? Send a packet through our core portal.
            </p>

            {/* Direct Coordinates */}
            <div className="space-y-3 font-mono text-xs text-white/40 pt-4">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>PROJECTS_EMAIL</span>
                <a 
                  href="mailto:hexframe@gmail.com"
                  className="text-white hover:text-cyan-accent transition-colors font-semibold cursor-pointer"
                >
                  hexframe@gmail.com
                </a>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>GATEWAY_NODE</span>
                <span className="text-cyan-accent font-semibold">SSL_SECURE_PORT_3000</span>
              </div>
              <div className="flex justify-between">
                <span>TIME_COORDINATE</span>
                <span className="text-white">UTC-7 (Pacific Standard)</span>
              </div>
            </div>
          </div>

          {/* Social Channels Link List */}
          <div className="space-y-4 pt-8 border-t border-white/5">
            <h3 className="font-mono text-[10px] tracking-wider text-white/30 uppercase">
              VERIFIED_ASSET_CHANNELS
            </h3>
            
            <div className="flex flex-col gap-2">
              {SOCIAL_LINKS.map((link) => {
                const IconComp = ICON_MAP[link.icon] || Github;
                const brandColor = BRAND_COLORS[link.name] || '#5EEAD4';
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ '--brand': brandColor } as React.CSSProperties}
                    className="social-link flex items-center justify-between p-3 rounded-none bg-white/[0.015] border border-white/5 hover:bg-white/[0.03] text-white/60 transition-all text-xs font-mono group"
                  >
                    <div className="flex items-center gap-3">
                      <IconComp className="social-icon w-4 h-4 text-white/30 transition-colors duration-300" />
                      <span className="social-label transition-colors duration-300">{link.name.toUpperCase()}</span>
                    </div>
                    <ExternalLink className="social-arrow w-3.5 h-3.5 text-white/10 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 md:p-8 rounded-none bg-[#0B0E14] border border-white/10 box-glow-cyan/5">
            
            <AnimatePresence mode="wait">
              {formState === 'idle' || formState === 'submitting' ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-6 text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] text-white/40 tracking-wider">
                        01 / YOUR_FULL_NAME *
                      </label>
                      <input
                        type="text"
                        required
                        disabled={formState === 'submitting'}
                        value={formData.name}
                        onChange={e => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="e.g. John Doe"
                        className={`w-full px-4 py-3 bg-[#11151D] border rounded-none text-sm text-white placeholder-white/20 focus:outline-none transition-colors ${
                          errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan-accent/50'
                        }`}
                      />
                      {errors.name && (
                        <span className="text-red-400/80 text-[10px] font-mono">{errors.name}</span>
                      )}
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="block font-mono text-[10px] text-white/40 tracking-wider">
                        02 / EMAIL_ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        disabled={formState === 'submitting'}
                        value={formData.email}
                        onChange={e => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="e.g. john@domain.com"
                        className={`w-full px-4 py-3 bg-[#11151D] border rounded-none text-sm text-white placeholder-white/20 focus:outline-none transition-colors ${
                          errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan-accent/50'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-red-400/80 text-[10px] font-mono">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Discipline Selection */}
                  <div className="space-y-2.5">
                    <label className="block font-mono text-[10px] text-white/40 tracking-wider">
                      03 / DISCIPLINE_TRACKS
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {['DEV', 'DESIGN', 'VIDEO'].map((track) => {
                        const isSelected = formData.disciplines.includes(track);
                        return (
                          <button
                            type="button"
                            key={track}
                            disabled={formState === 'submitting'}
                            onClick={() => {
                              handleDisciplineToggle(track);
                              if (errors.disciplines) setErrors({ ...errors, disciplines: '' });
                            }}
                            className={`px-4 py-2 rounded-none font-mono text-xs tracking-wider border cursor-pointer transition-all ${
                              isSelected
                                ? track === 'DEV'
                                  ? 'bg-cyan-accent/10 border-cyan-accent text-cyan-accent'
                                  : track === 'DESIGN'
                                    ? 'bg-amber-accent/10 border-amber-accent text-amber-accent'
                                    : 'bg-white/10 border-white text-white'
                                : errors.disciplines
                                  ? 'bg-[#11151D] border-red-500/50 text-white/40 hover:border-red-500/70'
                                  : 'bg-[#11151D] border-white/5 text-white/40 hover:border-white/10 hover:text-white/70'
                            }`}
                          >
                            {track === 'DEV' && 'WEB ENGINEERING'}
                            {track === 'DESIGN' && 'BRANDING & UIUX'}
                            {track === 'VIDEO' && 'CINEMATIC POST'}
                          </button>
                        );
                      })}
                    </div>
                    {errors.disciplines && (
                      <span className="text-red-400/80 text-[10px] font-mono">{errors.disciplines}</span>
                    )}
                  </div>

                  {/* Budget Ranges */}
                  <div className="space-y-2.5">
                    <label className="block font-mono text-[10px] text-white/40 tracking-wider">
                      04 / TARGET_PROJECT_BUDGET
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {['$5k - $10k', '$10k - $25k', '$25k+'].map((range) => {
                        const isSelected = formData.budget === range;
                        return (
                          <button
                            type="button"
                            key={range}
                            disabled={formState === 'submitting'}
                            onClick={() => {
                              setFormData({ ...formData, budget: range });
                              if (errors.budget) setErrors({ ...errors, budget: '' });
                            }}
                            className={`py-2 rounded-none font-mono text-xs text-center border cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-white/10 border-white text-white font-bold'
                                : errors.budget
                                  ? 'bg-[#11151D] border-red-500/50 text-white/30 hover:border-red-500/70'
                                  : 'bg-[#11151D] border-white/5 text-white/30 hover:border-white/10 hover:text-white/55'
                            }`}
                          >
                            {range}
                          </button>
                        );
                      })}
                    </div>
                    {errors.budget && (
                      <span className="text-red-400/80 text-[10px] font-mono">{errors.budget}</span>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] text-white/40 tracking-wider">
                      05 / PROJECT_BREIF_PACKET
                    </label>
                    <textarea
                      disabled={formState === 'submitting'}
                      value={formData.message}
                      onChange={e => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="e.g. Briefly describe your digital scaling objectives..."
                      rows={4}
                      className={`w-full px-4 py-3 bg-[#11151D] border rounded-none text-sm text-white placeholder-white/20 focus:outline-none transition-colors resize-none ${
                        errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-cyan-accent/50'
                      }`}
                    />
                    {errors.message && (
                      <span className="text-red-400/80 text-[10px] font-mono">{errors.message}</span>
                    )}
                  </div>

                  {/* Submit Error */}
                  {errors.submit && (
                    <div className="p-3 rounded-none bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-mono">
                      {errors.submit}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full py-4 rounded-none bg-white text-[#0B0E14] font-display font-extrabold text-sm tracking-wider hover:bg-cyan-accent hover:shadow-lg hover:shadow-cyan-accent/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        ESTABLISHING SECURE_HANDSHAKE...
                      </>
                    ) : (
                      <>
                        TRANSMIT PORTAL SECURELY
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                // Success feedback window
                <motion.div
                  key="success-form"
                  className="py-12 px-4 text-center space-y-6 flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-16 h-16 rounded-none bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Check className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl md:text-2xl text-white">
                      Transmitted Successfully
                    </h3>
                    <p className="text-white/50 text-xs md:text-sm max-w-sm mx-auto font-light leading-relaxed">
                      Handshake complete. Your client packet was catalogued securely on our Node. We will connect back within 24 operational hours.
                    </p>
                  </div>

                  {/* Simulated Receipt */}
                  <div className="w-full max-w-sm p-4 rounded-none bg-[#11151D] border border-white/10 text-left font-mono text-[10px] text-white/30 space-y-1">
                    <div className="text-white font-semibold text-center mb-2 uppercase tracking-widest text-[9px]">
                      // TRANSACTION_RECEIPT_OK
                    </div>
                    <div className="flex justify-between">
                      <span>CLIENT:</span>
                      <span className="text-white">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>COMP:</span>
                      <span className="text-white">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TRACKS:</span>
                      <span className="text-cyan-accent font-semibold">
                        {formData.disciplines.join(' / ') || 'CORE_PORTFOLIO'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>BUDGET:</span>
                      <span className="text-amber-accent font-semibold">{formData.budget}</span>
                    </div>
                    <div className="flex justify-between border-t border-white/5 pt-2 mt-2">
                      <span>GATEWAY:</span>
                      <span>HTTPS / AES-256</span>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-5 py-2 rounded-none border border-white/10 hover:border-white/30 text-white font-mono text-xs cursor-pointer transition-all uppercase"
                  >
                    Reset Portal form
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
