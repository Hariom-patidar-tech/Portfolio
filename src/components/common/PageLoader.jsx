import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100000] bg-[#050816] flex flex-col items-center justify-center select-none"
        >
          {/* Glowing Central Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 via-cyan-500 to-pink-500 p-[2px] shadow-glow-primary">
              <div className="w-full h-full bg-[#050816] rounded-2xl flex items-center justify-center">
                <span className="font-display font-black text-3xl text-gradient-primary">AR</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-ping" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-mono font-medium tracking-widest text-zinc-400 uppercase mb-6"
          >
            Initializing System Engine
          </motion.h2>

          {/* Progress Bar Container */}
          <div className="w-64 sm:w-80 h-1.5 bg-zinc-900 rounded-full overflow-hidden p-[1px] border border-zinc-800">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 rounded-full shadow-[0_0_12px_#06B6D4]"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          {/* Percentage */}
          <div className="mt-4 font-mono text-cyan-400 text-sm font-semibold tracking-wider">
            {Math.min(progress, 100)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
