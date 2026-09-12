import React, { useState, useEffect } from 'react';
import { Sun, Clock } from 'lucide-react';

export default function WeatherWidget() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex items-center space-x-3 text-xs font-mono text-zinc-400 bg-zinc-900/60 px-3 py-1.5 rounded-full border border-zinc-800/80 backdrop-blur-md">
      <div className="flex items-center space-x-1 text-cyan-400">
        <Sun className="w-3.5 h-3.5 animate-spin-slow" />
        <span>SF 72°F</span>
      </div>
      <span className="text-zinc-600">|</span>
      <div className="flex items-center space-x-1 text-purple-400">
        <Clock className="w-3.5 h-3.5" />
        <span>{time || '12:00 PM'}</span>
      </div>
    </div>
  );
}
