import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-border/50 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-2xl font-bold text-primary neon-text">VV</span>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Varun Vinod. All rights reserved.
            </p>
          </div>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground text-center italic">
            "Quality & Consistency is going to shape your Identity."
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-xl glass flex items-center justify-center hover-glow hover:scale-110 transition-all duration-300 group"
            aria-label="Back to top"
          >
            <ArrowUp size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
