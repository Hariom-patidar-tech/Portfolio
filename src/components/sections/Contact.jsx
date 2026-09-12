import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { portfolioData } from '../../data/portfolioData';
import { playSoundEffect } from '../../utils/helpers';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    playSoundEffect('click');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${portfolioData.personal.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone || 'Not provided',
          Message: formData.message,
          _subject: `New Portfolio Contact Message from ${formData.name}`,
          _template: 'table'
        })
      });

      if (response.ok) {
        setSubmitted(true);
        playSoundEffect('success');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366F1', '#0284C7', '#E11D48']
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        // Fallback open mail client if API response fails
        window.location.href = `mailto:${portfolioData.personal.email}?subject=Portfolio%20Contact%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`)}`;
        setSubmitted(true);
      }
    } catch (err) {
      // Fallback open mail client if network error
      window.location.href = `mailto:${portfolioData.personal.email}?subject=Portfolio%20Contact%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`)}`;
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
      <SectionHeading
        badge="Get In Touch"
        title="Let's Connect & Collaborate"
        subtitle="Open for AI/ML Developer roles, machine learning project inquiries, and technical collaboration."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-8 space-y-6">
            <h3 className="font-display font-bold text-2xl text-slate-900">
              Direct Channels
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed font-sans">
              Feel free to reach out directly via email, phone, or LinkedIn. I typically respond within a few hours.
            </p>

            <div className="space-y-4 pt-2">
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all group shadow-sm"
              >
                <div className="p-3 rounded-lg bg-slate-900 text-white">
                  <Mail className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Email Address</div>
                  <div className="text-sm font-semibold text-slate-900 group-hover:text-slate-700">{portfolioData.personal.email}</div>
                </div>
              </a>

              <a
                href={`tel:${portfolioData.personal.phone}`}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all group shadow-sm"
              >
                <div className="p-3 rounded-lg bg-slate-900 text-white">
                  <Phone className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Direct Phone</div>
                  <div className="text-sm font-semibold text-slate-900 group-hover:text-slate-700">{portfolioData.personal.phone}</div>
                </div>
              </a>

              <div className="flex items-center space-x-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="p-3 rounded-lg bg-slate-900 text-white">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Location</div>
                  <div className="text-sm font-semibold text-slate-900">{portfolioData.personal.location}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <a
                href={portfolioData.personal.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-mono font-semibold flex items-center justify-center space-x-2 transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-7">
          <GlassCard className="p-8">
            <h3 className="font-display font-bold text-2xl text-slate-900 mb-6">
              Send a Message
            </h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-xl text-slate-900">Message Transmitted!</h4>
                <p className="text-slate-600 text-xs leading-relaxed max-w-md mx-auto">
                  Thank you for reaching out. Your message has been sent directly to Hariom's inbox. Expect a prompt response soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-700 hover:text-slate-900 shadow-sm"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-600 font-semibold mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Sarah Connor"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-600 font-semibold mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="s.connor@cyberdyne.io"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-600 font-semibold mb-1.5">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-600 font-semibold mb-1.5">Project Details or Message *</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your AI project requirements, computer vision pipeline, or developer role timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 shadow-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-antigravity-dark py-4 flex items-center justify-center space-x-2 text-xs font-mono group disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="text-white">Encrypting & Sending...</span>
                  ) : (
                    <>
                      <span className="text-white font-bold">Transmit Message</span>
                      <Send className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
