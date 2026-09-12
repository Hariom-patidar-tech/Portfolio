import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, Menu, X } from 'lucide-react';
import { useScrollSpy } from '../../hooks/useScrollSpy';

export default function Navbar({ onOpenCommand }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'domains', label: 'Domains' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'resume', label: 'Resume' },
    { id: 'github', label: 'GitHub' },
    { id: 'contact', label: 'Contact' },
  ];

  const activeSection = useScrollSpy(navItems.map(item => item.id), 120);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToSection(id) {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-[5000] transition-all duration-300 ${
      isScrolled ? 'py-3 glass-nav shadow-sm border-b border-slate-200' : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
          className="flex items-center space-x-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white p-[1px] shadow-md transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
              <span className="font-display font-black text-lg text-white">HP</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
              Hariom Patidar
            </span>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
              AI & ML Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center space-x-1 glass-card px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive ? 'text-white font-bold' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-slate-900 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'text-white' : 'text-slate-800'}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons: Command Palette */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenCommand}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all text-xs font-mono shadow-md group"
            title="Search command palette (Ctrl+K)"
          >
            <Command className="w-3.5 h-3.5 text-white group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline text-white font-semibold">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-slate-800 text-white rounded font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-white text-slate-700 border border-slate-200 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden glass-nav border-b border-slate-200 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-2 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-slate-900 text-white font-bold'
                      : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
