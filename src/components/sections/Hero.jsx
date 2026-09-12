import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileDown,
  Eye,
  Mail,
  Send,
  Code2,
  Terminal,
  Award,
  Sparkles,
  ChevronDown,
  Monitor,
  X,
  ExternalLink
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import { playSoundEffect } from '../../utils/helpers';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const roles = portfolioData.personal.typingRoles;

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentRole) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentRole.substring(0, displayText.length - 1)
          : currentRole.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  const socialLinks = [
    { name: 'GitHub', href: portfolioData.personal.socials.github, icon: FaGithub },
    { name: 'LinkedIn', href: portfolioData.personal.socials.linkedin, icon: FaLinkedin },
    { name: 'Email', href: portfolioData.personal.socials.email, icon: Mail },
  ];

  function scrollToSection(id) {
    playSoundEffect('click');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Antigravity Typography & Pills */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          {/* Antigravity Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900 text-white shadow-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-semibold text-white">
              {portfolioData.personal.currentStatus}
            </span>
          </motion.div>

          {/* Main Name Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-slate-900 tracking-tight leading-[1.1]">
              {portfolioData.personal.name} <br />
              <span className="text-slate-900">AI & Machine Learning Engineer</span>
            </h1>
          </motion.div>

          {/* Typing Role Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-10 flex items-center justify-center lg:justify-start"
          >
            <span className="text-xl sm:text-2xl font-mono text-slate-800 font-medium">
              I am an{' '}
              <span className="text-slate-900 font-bold border-b-2 border-slate-900 pb-0.5">
                {displayText}
              </span>
              <span className="animate-pulse text-purple-600">|</span>
            </span>
          </motion.div>

          {/* Tagline & Academic Info */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed font-sans"
          >
            <strong className="text-slate-900">{portfolioData.personal.tagline}</strong> Pursuing {portfolioData.personal.degree} @ {portfolioData.personal.collegeName} (CGPA: {portfolioData.personal.cgpa}). Developing Machine Learning models, Deep Learning projects, and Computer Vision applications.
          </motion.p>

          {/* Antigravity Pill Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-antigravity-dark px-5 py-3 flex items-center space-x-2 text-xs sm:text-sm text-white group shadow-md"
            >
              <Monitor className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
              <span className="text-white font-semibold">View Projects</span>
            </button>

            <button
              onClick={() => {
                playSoundEffect('click');
                setIsResumeModalOpen(true);
              }}
              className="btn-antigravity-dark px-5 py-3 flex items-center space-x-2 text-xs sm:text-sm text-white group shadow-md"
            >
              <Eye className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span className="text-white font-semibold">View Resume</span>
            </button>

            <a
              href={portfolioData.personal.resumeUrl}
              download="Hariom_Patidar_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-antigravity-light px-5 py-3 flex items-center space-x-2 text-xs sm:text-sm text-slate-900 shadow-sm hover:bg-slate-100 transition-all border border-slate-200"
            >
              <FileDown className="w-4 h-4 text-slate-800" />
              <span className="text-slate-900 font-semibold">Download</span>
            </a>

            <button
              onClick={() => scrollToSection('contact')}
              className="btn-antigravity-light px-5 py-3 flex items-center space-x-2 text-xs sm:text-sm text-slate-900 shadow-sm hover:bg-slate-100 transition-all border border-slate-200"
            >
              <Send className="w-4 h-4 text-slate-800" />
              <span className="text-slate-900 font-semibold">Contact</span>
            </button>
          </motion.div>

          {/* Social Profiles Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-3"
          >
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mr-2">Profiles:</span>
            {socialLinks.map((soc) => {
              const Icon = soc.icon;
              return (
                <motion.a
                  key={soc.name}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white/90 hover:bg-slate-900 text-slate-700 hover:text-white transition-all shadow-sm border border-slate-200"
                  title={soc.name}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Right Column: Avatar Showcase */}
        <div className="lg:col-span-5 flex justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="relative group w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96"
          >
            <div className="relative w-full h-full rounded-full p-2 bg-white/90 border-2 border-slate-300 shadow-xl overflow-hidden backdrop-blur-md">
              <img
                src={portfolioData.personal.avatar}
                alt={portfolioData.personal.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000';
                }}
                className="w-full h-full object-cover object-top rounded-full group-hover:scale-105 transition-all duration-700"
              />
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-white flex items-center space-x-2 text-xs font-mono shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white font-semibold">CGPA: 7.0 (B.Tech)</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-white flex items-center space-x-2 text-xs font-mono shadow-xl"
            >
              <Terminal className="w-4 h-4 text-white" />
              <span className="text-white font-semibold">AI & ML Engineer</span>
            </motion.div>
          </motion.div>
        </div>

      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => scrollToSection('about')}>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Scroll Down</span>
        <ChevronDown className="w-4 h-4 text-slate-900 animate-bounce" />
      </div>

      {/* Interactive Resume Preview Modal */}
      <AnimatePresence>
        {isResumeModalOpen && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResumeModalOpen(false)}
              className="fixed inset-0 bg-slate-900/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl glass-card rounded-2xl p-4 sm:p-6 border border-slate-300 shadow-2xl z-10 bg-white/95"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <FileDown className="w-5 h-5 text-slate-900" />
                  <h3 className="font-display font-bold text-lg text-slate-900">
                    Hariom Patidar - Official Resume
                  </h3>
                </div>
                <button
                  onClick={() => setIsResumeModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Embedded PDF Viewer */}
              <div className="rounded-xl overflow-hidden mb-4 border border-slate-200 bg-slate-100 flex items-center justify-center h-[68vh]">
                <iframe
                  src={`${portfolioData.personal.resumeUrl}#toolbar=1`}
                  title="Hariom Patidar Resume Preview"
                  className="w-full h-full rounded-lg border-0"
                />
              </div>

              {/* Action Buttons in Modal */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-600">
                <span>Official Technical Curriculum Vitae</span>
                <div className="flex items-center space-x-3">
                  <a
                    href={portfolioData.personal.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-900 hover:text-white transition-all font-semibold flex items-center space-x-1.5 border border-slate-300"
                  >
                    <span>Open Fullscreen</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={portfolioData.personal.resumeUrl}
                    download="Hariom_Patidar_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-antigravity-dark px-5 py-2 text-white font-semibold flex items-center space-x-2 shadow-md"
                  >
                    <FileDown className="w-4 h-4 text-white" />
                    <span className="text-white">Download PDF</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
