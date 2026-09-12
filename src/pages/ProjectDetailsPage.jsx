import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, CheckCircle2, Cpu, ShieldAlert, Clock, Layers, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import GlassCard from '../components/ui/GlassCard';
import { portfolioData } from '../data/portfolioData';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = portfolioData.projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">Project Not Found</h2>
        <p className="text-slate-600 mb-6">The requested case study does not exist or has been moved.</p>
        <Link
          to="/"
          className="btn-antigravity-dark px-6 py-3 text-xs font-mono font-semibold shadow-sm"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-xs font-mono mb-8 transition-all shadow-sm group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-slate-900" />
        <span>Back to All Projects</span>
      </motion.button>

      {/* Header Case Study Banner */}
      <div className="space-y-4 mb-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-mono font-semibold">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-semibold">
            {project.status}
          </span>
          <span className="flex items-center space-x-1 text-xs font-mono text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-800" />
            <span>Duration: {project.duration}</span>
          </span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
          {project.name}
        </h1>

        <p className="text-slate-600 text-base sm:text-lg max-w-3xl font-sans leading-relaxed">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="btn-antigravity-dark px-6 py-3 text-xs font-mono font-semibold flex items-center space-x-2 shadow-md"
            >
              <ExternalLink className="w-4 h-4 text-white" />
              <span className="text-white">Open Live Demo</span>
            </a>
          )}

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-mono font-semibold transition-all flex items-center space-x-2 shadow-sm"
          >
            <FaGithub className="w-4 h-4" />
            <span>Explore Source Code</span>
          </a>
        </div>
      </div>

      <GlassCard className="p-2 mb-12 border-slate-200 overflow-hidden shadow-md">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-80 sm:h-[450px] object-cover rounded-xl"
        />
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        <div className="lg:col-span-8 space-y-8">
          
          <GlassCard className="p-8">
            <h3 className="font-display font-bold text-2xl text-slate-900 mb-4 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-slate-900" />
              <span>Key Features & Capabilities</span>
            </h3>
            <div className="space-y-3">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-sm text-slate-700 font-sans leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <h3 className="font-display font-bold text-2xl text-slate-900 mb-4 flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-slate-900" />
              <span>System Architecture & Pipeline</span>
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">
              {project.architecture}
            </p>
          </GlassCard>

          <GlassCard className="p-8">
            <h3 className="font-display font-bold text-2xl text-slate-900 mb-4 flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Engineering Challenges & Resolutions</span>
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">
              {project.challenges}
            </p>
          </GlassCard>

          {project.screenshots && project.screenshots.length > 0 && (
            <GlassCard className="p-8">
              <h3 className="font-display font-bold text-2xl text-slate-900 mb-6">
                Interface Screenshots
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.screenshots.map((screen, idx) => (
                  <img
                    key={idx}
                    src={screen}
                    alt={`Screenshot ${idx + 1}`}
                    className="w-full h-48 object-cover rounded-xl border border-slate-200 shadow-sm"
                  />
                ))}
              </div>
            </GlassCard>
          )}

        </div>

        <div className="lg:col-span-4 space-y-6">
          <GlassCard className="p-6">
            <h3 className="font-display font-bold text-lg text-slate-900 mb-4 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-slate-900" />
              <span>Technologies Used</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 text-xs font-mono font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-4 text-xs font-mono">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Category:</span>
              <span className="text-slate-800 font-bold">{project.category}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Status:</span>
              <span className="text-emerald-700 font-bold">{project.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Duration:</span>
              <span className="text-slate-900 font-bold">{project.duration}</span>
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
