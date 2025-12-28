import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else if (savedTheme === 'dark' || prefersDark) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'theme-transition-ripple';
    ripple.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: ${isDark ? 'hsl(0, 0%, 98%)' : 'hsl(0, 0%, 2%)'};
      transform: translate(-50%, -50%);
      z-index: 9999;
      pointer-events: none;
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(ripple);
    
    // Expand ripple
    requestAnimationFrame(() => {
      ripple.style.width = '300vmax';
      ripple.style.height = '300vmax';
    });

    // Toggle theme after ripple starts
    setTimeout(() => {
      const newIsDark = !isDark;
      setIsDark(newIsDark);
      
      if (newIsDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
      }
    }, 300);

    // Remove ripple
    setTimeout(() => {
      ripple.remove();
      setIsAnimating(false);
    }, 600);
  };

  return (
    <button
      onClick={toggleTheme}
      disabled={isAnimating}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full glass hover-glow transition-all duration-300 hover:scale-110 group"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-6 h-6">
        {/* Sun icon */}
        <Sun
          size={24}
          className={`absolute inset-0 text-primary transition-all duration-500 ${
            isDark
              ? 'opacity-0 rotate-90 scale-0'
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        {/* Moon icon */}
        <Moon
          size={24}
          className={`absolute inset-0 text-primary transition-all duration-500 ${
            isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </div>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
        isDark 
          ? 'bg-primary/0 group-hover:bg-primary/20' 
          : 'bg-primary/0 group-hover:bg-primary/20'
      }`} />
    </button>
  );
};

export default ThemeToggle;