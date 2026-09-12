import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;

      if (documentHeight > 0) {
        setScrollPercentage((scrolled / documentHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-[99999] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 shadow-[0_0_10px_#06B6D4]"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
}
