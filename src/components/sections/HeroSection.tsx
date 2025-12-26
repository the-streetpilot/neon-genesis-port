import { ArrowDown, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        {/* Subtitle */}
        <p 
          className="text-primary text-sm md:text-base font-medium tracking-widest uppercase mb-4 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          Graphic Designer & Web Developer
        </p>

        {/* Main Heading */}
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
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

        {/* Quote */}
        <p 
          className="text-sm md:text-base text-primary/80 italic max-w-xl mx-auto mb-10 animate-fade-in-up"
          style={{ animationDelay: '0.7s' }}
        >
          "Quality & Consistency is going to shape your Identity."
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

        {/* Location Badge */}
        <div 
          className="mt-12 inline-flex items-center gap-2 glass px-4 py-2 rounded-full animate-fade-in-up"
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

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-primary/10 blur-[80px] animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-primary/5 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default HeroSection;
