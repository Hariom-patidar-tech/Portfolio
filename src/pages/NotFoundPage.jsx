import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 max-w-md rounded-3xl border border-purple-500/30 shadow-2xl"
      >
        <h1 className="font-display font-extrabold text-7xl text-gradient-primary mb-4">404</h1>
        <h2 className="font-display font-bold text-xl text-white mb-2">Page Not Found</h2>
        <p className="text-zinc-400 text-xs font-sans mb-8">
          The requested route does not exist or has been relocated to another galaxy.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-mono text-xs font-semibold shadow-glow-primary inline-flex items-center space-x-2"
        >
          <Home className="w-4 h-4" />
          <span>Back to Command Center</span>
        </Link>
      </motion.div>
    </div>
  );
}
