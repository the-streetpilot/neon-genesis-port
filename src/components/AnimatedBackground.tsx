import { useEffect, useRef, useState } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let orbs: Orb[] = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
      baseX: number;
      baseY: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.hue = 348;
      }

      update(mouseX: number, mouseY: number) {
        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          this.x -= (dx / distance) * force * 2;
          this.y -= (dy / distance) * force * 2;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.opacity})`;
        ctx.fill();
        
        // Glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.opacity * 0.15})`;
        ctx.fill();
      }
    }

    class Orb {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      phase: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.radius = Math.random() * 100 + 50;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.phase = Math.random() * Math.PI * 2;
      }

      update(t: number) {
        this.x += this.speedX + Math.sin(t * 0.001 + this.phase) * 0.3;
        this.y += this.speedY + Math.cos(t * 0.001 + this.phase) * 0.3;

        if (this.x > canvas!.width + this.radius) this.x = -this.radius;
        if (this.x < -this.radius) this.x = canvas!.width + this.radius;
        if (this.y > canvas!.height + this.radius) this.y = -this.radius;
        if (this.y < -this.radius) this.y = canvas!.height + this.radius;
      }

      draw() {
        if (!ctx) return;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, 'hsla(348, 100%, 50%, 0.15)');
        gradient.addColorStop(0.5, 'hsla(348, 100%, 50%, 0.05)');
        gradient.addColorStop(1, 'hsla(348, 100%, 50%, 0)');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const drawGrid = (t: number) => {
      if (!ctx) return;
      const gridSize = 80;
      const opacity = 0.03 + Math.sin(t * 0.001) * 0.01;
      
      ctx.strokeStyle = `hsla(348, 100%, 50%, ${opacity})`;
      ctx.lineWidth = 0.5;
      
      // Vertical lines with wave effect
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + Math.sin(t * 0.002 + x * 0.01) * 2, 0);
        ctx.lineTo(x + Math.sin(t * 0.002 + x * 0.01) * 2, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines with wave effect
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + Math.cos(t * 0.002 + y * 0.01) * 2);
        ctx.lineTo(canvas.width, y + Math.cos(t * 0.002 + y * 0.01) * 2);
        ctx.stroke();
      }
    };

    const init = () => {
      particles = [];
      orbs = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 12000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
      for (let i = 0; i < 5; i++) {
        orbs.push(new Orb());
      }
    };

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.12;
            ctx!.beginPath();
            ctx!.strokeStyle = `hsla(348, 100%, 50%, ${opacity})`;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particles[a].x, particles[a].y);
            ctx!.lineTo(particles[b].x, particles[b].y);
            ctx!.stroke();
          }
        }
      }
    };

    const animate = () => {
      time++;
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      drawGrid(time);

      // Draw orbs
      orbs.forEach(orb => {
        orb.update(time);
        orb.draw();
      });

      // Update and draw particles
      particles.forEach(particle => {
        particle.update(mouseRef.current.x, mouseRef.current.y);
        particle.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    init();
    animate();

    window.addEventListener('resize', () => {
      resize();
      init();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        style={{ background: 'hsl(0 0% 2%)' }}
      />
      {/* Gradient overlays with parallax */}
      <div 
        className="fixed inset-0 -z-10 bg-gradient-radial from-primary/8 via-transparent to-transparent"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {/* Animated noise texture overlay */}
      <div className="fixed inset-0 -z-10 opacity-[0.02] pointer-events-none animate-noise" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
      />
    </>
  );
};

export default AnimatedBackground;
