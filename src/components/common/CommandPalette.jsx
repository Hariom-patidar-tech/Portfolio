import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, FolderGit2, Mail, FileText, Sparkles, X, Terminal, ExternalLink } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const sections = [
    { id: 'hero', title: 'Go to Hero Section', icon: Compass, action: () => scrollTo('hero') },
    { id: 'about', title: 'Go to About & Education', icon: Compass, action: () => scrollTo('about') },
    { id: 'skills', title: 'Go to Technical Skills', icon: Sparkles, action: () => scrollTo('skills') },
    { id: 'domains', title: 'Go to Expertise Domains', icon: Terminal, action: () => scrollTo('domains') },
    { id: 'projects', title: 'Go to Featured Projects', icon: FolderGit2, action: () => scrollTo('projects') },
    { id: 'experience', title: 'Go to Work Experience', icon: Compass, action: () => scrollTo('experience') },
    { id: 'certificates', title: 'Go to Certificates', icon: FileText, action: () => scrollTo('certificates') },
    { id: 'resume', title: 'Go to Resume & Download CV', icon: FileText, action: () => scrollTo('resume') },
    { id: 'github', title: 'Go to GitHub Activity', icon: FolderGit2, action: () => scrollTo('github') },
    { id: 'contact', title: 'Contact Hariom Patidar', icon: Mail, action: () => scrollTo('contact') },
  ];

  const filteredProjects = portfolioData.projects.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.techStack.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredSections = sections.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase())
  );

  function scrollTo(id) {
    onClose();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] flex items-start justify-center pt-20 sm:pt-28 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-2xl border border-slate-200/90 shadow-2xl overflow-hidden z-10"
        >
          {/* Input Box */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/80">
            <Search className="w-5 h-5 text-slate-900 mr-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, skills, sections, or type a command..."
              className="w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-base font-sans font-medium"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-3 space-y-4 bg-white/60">
            {/* Navigation Commands */}
            <div>
              <div className="text-[11px] font-mono font-bold uppercase text-slate-500 px-3 mb-2 tracking-wider">
                Quick Navigation
              </div>
              <div className="space-y-1">
                {filteredSections.map((sec) => {
                  const Icon = sec.icon;
                  return (
                    <button
                      key={sec.id}
                      onClick={sec.action}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-slate-900 text-slate-700 hover:text-white transition-all text-sm font-medium group"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4 text-slate-800 group-hover:text-white transition-colors" />
                        <span>{sec.title}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400 group-hover:text-slate-300">Jump</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Matching Projects */}
            {filteredProjects.length > 0 && (
              <div>
                <div className="text-[11px] font-mono font-bold uppercase text-slate-500 px-3 mb-2 tracking-wider">
                  Matching Projects ({filteredProjects.length})
                </div>
                <div className="space-y-1">
                  {filteredProjects.map((proj) => (
                    <a
                      key={proj.id}
                      href={`/project/${proj.id}`}
                      onClick={onClose}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-slate-900 text-slate-700 hover:text-white transition-all text-sm font-medium group"
                    >
                      <div className="flex items-center space-x-3 truncate">
                        <FolderGit2 className="w-4 h-4 text-slate-800 group-hover:text-white shrink-0" />
                        <span className="truncate">{proj.name}</span>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 group-hover:bg-slate-800 text-slate-700 group-hover:text-slate-200 border border-slate-200 group-hover:border-slate-700">
                          {proj.category}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-3 bg-slate-100/90 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-mono">
            <div className="flex items-center space-x-2">
              <span>Press <kbd className="px-2 py-0.5 bg-white border border-slate-300 rounded text-slate-900 font-mono font-semibold shadow-2xs">ESC</kbd> to close</span>
            </div>
            <span className="font-semibold text-slate-700">Hariom Patidar Portfolio Command Center</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
