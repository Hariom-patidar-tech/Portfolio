import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { portfolioData } from '../../data/portfolioData';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'AI/ML'];

  const filteredProjects = portfolioData.projects.filter((project) => {
    return selectedCategory === 'All' || project.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
      <SectionHeading
        badge="Featured Projects"
        title="AI Models & Web Innovations"
        subtitle="Computer vision detection suites, predictive ML pipelines, and deep learning NLP sentiment analysis tools."
      />

      <div className="flex justify-center mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white/80 text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Grid Projects Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <GlassCard className="p-0 h-full flex flex-col justify-between overflow-hidden group shadow-md border border-slate-200">
              <div>
                <div className="relative h-48 w-full overflow-hidden border-b border-slate-200">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-mono font-bold shadow-md">
                      {project.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-mono font-bold flex items-center space-x-1 shadow-md">
                      <CheckCircle className="w-3 h-3 text-white" />
                      <span className="text-white">{project.status}</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span className="flex items-center space-x-1 font-semibold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-800" />
                      <span>{project.duration}</span>
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2">
                    {project.name}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 font-sans">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-900 text-[10px] font-mono font-bold border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-200/80 flex items-center justify-between gap-2 mt-3">
                <Link
                  to={`/project/${project.id}`}
                  className="flex-1 btn-antigravity-dark py-2 text-xs font-mono font-bold flex items-center justify-center space-x-1 transition-all group/btn"
                >
                  <span className="text-white">Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white group-hover/btn:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-white/90 hover:bg-slate-900 text-slate-700 hover:text-white transition-all shadow-sm border border-slate-200"
                  title="View GitHub Source"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                </a>

                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-white/90 hover:bg-slate-900 text-slate-700 hover:text-white transition-all shadow-sm border border-slate-200"
                    title="Open Live Demo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
