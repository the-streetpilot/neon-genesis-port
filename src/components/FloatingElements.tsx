import { useEffect, useState } from 'react';

const FloatingElements = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {/* Large floating orbs with parallax */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsla(348, 100%, 50%, 0.3) 0%, transparent 70%)',
          top: '10%',
          left: '-10%',
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5 + scrollY * -0.15}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, hsla(348, 100%, 60%, 0.25) 0%, transparent 70%)',
          bottom: '20%',
          right: '-5%',
          transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3 + scrollY * 0.1}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      <div 
        className="absolute w-[300px] h-[300px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, hsla(348, 100%, 50%, 0.2) 0%, transparent 70%)',
          top: '50%',
          right: '30%',
          transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2 + scrollY * -0.05}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Floating geometric shapes */}
      <div 
        className="absolute w-20 h-20 border border-primary/20 rotate-45 animate-float-slow"
        style={{
          top: '15%',
          right: '15%',
          transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px) rotate(45deg)`,
        }}
      />
      <div 
        className="absolute w-12 h-12 border border-primary/15 rotate-12 animate-float-medium"
        style={{
          top: '60%',
          left: '10%',
          transform: `translate(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px) rotate(12deg)`,
        }}
      />
      <div 
        className="absolute w-16 h-16 rounded-full border border-primary/10 animate-float-fast"
        style={{
          bottom: '30%',
          left: '25%',
          transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
        }}
      />
      <div 
        className="absolute w-8 h-8 bg-primary/5 rotate-45 animate-float-medium"
        style={{
          top: '40%',
          right: '20%',
          transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px) rotate(45deg)`,
        }}
      />

      {/* Glowing dots */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary animate-pulse-glow"
          style={{
            top: `${15 + i * 12}%`,
            left: `${5 + i * 11}%`,
            animationDelay: `${i * 0.3}s`,
            transform: `translateY(${scrollY * (0.02 * (i + 1))}px)`,
          }}
        />
      ))}

      {/* Horizontal lines */}
      <div 
        className="absolute h-px w-32 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-slide-right"
        style={{
          top: '25%',
          left: '5%',
        }}
      />
      <div 
        className="absolute h-px w-24 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-slide-left"
        style={{
          top: '75%',
          right: '10%',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div className="absolute top-8 left-8 w-px h-16 bg-gradient-to-b from-primary/30 to-transparent" />
        <div className="absolute top-8 left-8 w-16 h-px bg-gradient-to-r from-primary/30 to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32">
        <div className="absolute bottom-8 right-8 w-px h-16 bg-gradient-to-t from-primary/30 to-transparent" />
        <div className="absolute bottom-8 right-8 w-16 h-px bg-gradient-to-l from-primary/30 to-transparent" />
      </div>
    </div>
  );
};

export default FloatingElements;
