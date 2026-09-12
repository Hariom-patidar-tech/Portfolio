import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Sparkles, FolderGit2, Briefcase, Mail, Command, FileText } from 'lucide-react';
import { playSoundEffect } from '../../utils/helpers';

export default function GlassDock({ onOpenCommand }) {
  const dockItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Sparkles },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  function scrollToSection(id) {
    playSoundEffect('hover');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[4500] hidden md:block pointer-events-auto">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-white/85 border border-slate-200 backdrop-blur-xl shadow-lg shadow-indigo-950/5"
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.2, y: -6 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToSection(item.id)}
              className="relative p-2.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all group"
              title={item.label}
            >
              <Icon className="w-5 h-5 group-hover:text-slate-900 transition-colors" />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-[11px] font-mono rounded-md border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                {item.label}
              </span>
            </motion.button>
          );
        })}

        <div className="w-[1px] h-6 bg-slate-200 my-auto" />

        <motion.button
          whileHover={{ scale: 1.2, y: -6 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            playSoundEffect('click');
            onOpenCommand();
          }}
          className="p-2.5 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all group"
          title="Command Palette (Ctrl+K)"
        >
          <Command className="w-5 h-5" />
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-[11px] font-mono rounded-md border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
            Command ⌘K
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
