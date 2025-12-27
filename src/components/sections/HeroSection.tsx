import { ArrowDown, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const tagline = "Quality & Consistency is going to shape your Identity.";

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= tagline.length) {
        setDisplayedText(tagline.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      {/* Animated background rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full border border-primary/10 animate-pulse"
          style={{ 
            transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
        <div 
          className="absolute w-[800px] h-[800px] rounded-full border border-primary/5 animate-pulse"
          style={{ 
            animationDelay: '0.5s',
            transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
        <div 
          className="absolute w-[1000px] h-[1000px] rounded-full border border-primary/[0.03]"
          style={{ 
            transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        {/* Subtitle */}
        <p 
          className="text-primary text-sm md:text-base font-medium tracking-widest uppercase mb-4 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          Graphic Designer & Web Developer
        </p>

        {/* Main Heading - removed glow effect */}
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up"
          style={{ 
            animationDelay: '0.4s',
            transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <span className="text-foreground">Hi, I'm </span>
          <span className="gradient-text">Varun Vinod</span>
        </h1>

        {/* Tagline */}
        <p 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          Creating engaging and purpose-driven digital experiences through compelling visual design and responsive web development.
        </p>

        {/* Typing Quote */}
        <p 
          className="text-sm md:text-base text-primary/80 italic max-w-xl mx-auto mb-10 animate-fade-in-up relative h-8"
          style={{ animationDelay: '0.7s' }}
        >
          <span className="relative z-10">
            "{displayedText}
            <span className={`inline-block w-0.5 h-5 bg-primary ml-1 align-middle ${isTypingComplete ? 'animate-pulse' : 'animate-blink'}`} />
            "
          </span>
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
          style={{ animationDelay: '0.8s' }}
        >
          <Button
            variant="neon"
            size="xl"
            onClick={() => scrollToSection('#contact')}
            className="group"
          >
            Hire Me
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Button>
          
          <Button
            variant="glass"
            size="xl"
            asChild
          >
            <a href="/resume.pdf" download>
              <Download size={20} />
              Download Resume
            </a>
          </Button>

          <Button
            variant="neon-outline"
            size="xl"
            onClick={() => scrollToSection('#projects')}
          >
            <Eye size={20} />
            View Portfolio
          </Button>
        </div>

        {/* Location Badge with floating animation */}
        <div 
          className="mt-12 inline-flex items-center gap-2 glass px-4 py-2 rounded-full animate-fade-in-up hover:shadow-neon-sm transition-shadow duration-300"
          style={{ animationDelay: '1s' }}
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">Based in Trivandrum, Kerala, India</span>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => scrollToSection('#about')}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown size={20} />
          </div>
        </div>
      </div>

      {/* Enhanced decorative elements with parallax */}
      <div 
        className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-primary/10 blur-[80px] animate-pulse"
        style={{ 
          transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      />
      <div 
        className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-primary/5 blur-[100px] animate-pulse" 
        style={{ 
          animationDelay: '1s',
          transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
          transition: 'transform 0.5s ease-out'
        }} 
      />
      <div 
        className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-primary/8 blur-[60px]"
        style={{ 
          transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      />

      {/* Floating accent shapes */}
      <div className="absolute top-20 right-1/4 w-4 h-4 border border-primary/30 rotate-45 animate-float-slow" />
      <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-primary/20 rounded-full animate-float-medium" />
      <div className="absolute top-1/3 right-20 w-2 h-2 bg-primary/40 rounded-full animate-float-fast" />
    </section>
  );
};

export default HeroSection;
