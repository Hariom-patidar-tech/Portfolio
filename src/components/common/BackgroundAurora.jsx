import React, { useEffect, useRef } from 'react';

export default function BackgroundAurora() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Antigravity vibrant rainbow palette
    const colors = [
      '#F97316', // Orange
      '#EAB308', // Yellow
      '#EC4899', // Pink
      '#8B5CF6', // Purple
      '#EF4444', // Red
      '#6366F1', // Indigo
      '#06B6D4', // Cyan
      '#10B981', // Emerald
    ];

    // High density full-screen dash particle array
    const particleCount = Math.min(Math.floor((width * height) / 3200), 380);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        length: Math.random() * 7 + 4,
        thickness: Math.random() * 1.8 + 1.5,
        angle: (Math.random() * 60 - 30) * (Math.PI / 180),
        angularSpeed: (Math.random() - 0.5) * 0.02,
        color: colors[i % colors.length],
        alpha: Math.random() * 0.7 + 0.3,
        baseAlpha: Math.random() * 0.7 + 0.3,
        pulseOffset: Math.random() * Math.PI * 2,
        scale: Math.random() * 0.6 + 0.7,
      });
    }

    const burstParticles = [];

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleClick = (e) => {
      const clickX = e.clientX;
      const clickY = e.clientY;

      for (let i = 0; i < 35; i++) {
        const speed = Math.random() * 4.5 + 2;
        const angle = Math.random() * Math.PI * 2;
        burstParticles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          length: Math.random() * 9 + 4,
          thickness: 2.2,
          rotation: Math.random() * Math.PI * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          life: 1,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Render high-density Antigravity rainbow dashes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx + Math.sin(time + p.pulseOffset) * 0.15;
        p.y += p.vy + Math.cos(time + p.pulseOffset) * 0.15;
        p.angle += p.angularSpeed;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        let renderScale = p.scale;
        let opacity = p.baseAlpha + Math.sin(time * 2 + p.pulseOffset) * 0.15;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist);
          p.x -= (dx / dist) * force * 3.5;
          p.y -= (dy / dist) * force * 3.5;
          renderScale = p.scale + force * 0.6;
          opacity = Math.min(1, opacity + force * 0.4);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(renderScale, renderScale);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, p.length);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.thickness;
        ctx.lineCap = 'round';
        ctx.globalAlpha = Math.max(0.2, opacity);
        ctx.stroke();
        ctx.restore();
      }

      // Render click burst particles
      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const bp = burstParticles[i];
        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.vx *= 0.95;
        bp.vy *= 0.95;
        bp.life -= 0.025;

        if (bp.life <= 0) {
          burstParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(bp.x, bp.y);
        ctx.rotate(bp.rotation);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, bp.length * bp.life);
        ctx.strokeStyle = bp.color;
        ctx.lineWidth = bp.thickness;
        ctx.lineCap = 'round';
        ctx.globalAlpha = bp.life;
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
      {/* Dynamic Fullscreen Antigravity Dash Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />
    </div>
  );
}
