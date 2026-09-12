import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const socialLinks = [
    { label: 'GitHub', href: portfolioData.personal.socials.github, icon: FaGithub },
    { label: 'LinkedIn', href: portfolioData.personal.socials.linkedin, icon: FaLinkedin },
    { label: 'Email', href: portfolioData.personal.socials.email, icon: Mail },
  ];

  return (
    <footer className="relative bg-white border-t border-slate-200 pt-16 pb-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-400 to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
          
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white p-[1px] shadow-sm">
                <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                  <span className="font-display font-bold text-sm text-white">HP</span>
                </div>
              </div>
              <span className="font-display font-bold text-xl text-slate-900">Hariom Patidar</span>
            </div>
            <p className="text-slate-600 text-sm max-w-md leading-relaxed font-sans">
              AI & Machine Learning Engineer focused on machine learning models, deep learning projects, feature engineering pipelines, and computer vision applications.
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-700 pt-2 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span>Available for AI & Machine Learning Opportunities</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase text-slate-500 tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              {['about', 'skills', 'domains', 'projects', 'experience', 'certificates', 'contact'].map((sec) => (
                <li key={sec}>
                  <a
                    href={`#${sec}`}
                    className="hover:text-slate-900 capitalize transition-colors"
                  >
                    {sec}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase text-slate-500 tracking-wider mb-4">
              Connect Online
            </h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-white hover:bg-slate-900 transition-all shadow-sm"
                    title={item.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Hariom Patidar. Built with React, Vite & Framer Motion.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all shadow-sm group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 text-slate-900 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
