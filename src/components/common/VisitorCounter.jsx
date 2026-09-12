import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

export default function VisitorCounter() {
  const [visitors, setVisitors] = useState(1420);

  useEffect(() => {
    // Generate organic visitor count state
    const baseCount = 1420;
    const stored = localStorage.getItem('portfolio_visitor_count');
    if (stored) {
      setVisitors(parseInt(stored, 10));
    } else {
      const nextCount = baseCount + Math.floor(Math.random() * 45) + 1;
      localStorage.setItem('portfolio_visitor_count', nextCount.toString());
      setVisitors(nextCount);
    }
  }, []);

  return (
    <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <Eye className="w-3.5 h-3.5" />
      <span>{visitors.toLocaleString()} Views</span>
    </div>
  );
}
