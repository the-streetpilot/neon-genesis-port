import { Code, Palette, Terminal, LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import MacWindowFrame from '@/components/MacWindowFrame';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Skill {
  name: string;
  years: number;
  proficiency: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: Code,
    skills: [
      { name: 'HTML', years: 5, proficiency: 'Expert', level: 95 },
      { name: 'CSS', years: 5, proficiency: 'Expert', level: 92 },
      { name: 'JavaScript', years: 4, proficiency: 'Advanced', level: 88 },
      { name: 'TypeScript', years: 3, proficiency: 'Advanced', level: 82 },
      { name: 'Python', years: 3, proficiency: 'Intermediate', level: 70 },
      { name: 'C', years: 2, proficiency: 'Intermediate', level: 60 },
      { name: 'Lua', years: 1, proficiency: 'Beginner', level: 40 },
      { name: 'MySQL', years: 3, proficiency: 'Intermediate', level: 75 },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: Terminal,
    skills: [
      { name: 'VS Code', years: 4, proficiency: 'Expert', level: 95 },
      { name: 'AWS', years: 2, proficiency: 'Intermediate', level: 65 },
      { name: 'Azure', years: 2, proficiency: 'Intermediate', level: 60 },
      { name: 'Replit', years: 2, proficiency: 'Advanced', level: 80 },
      { name: 'GitHub', years: 4, proficiency: 'Advanced', level: 88 },
      { name: 'WordPress', years: 3, proficiency: 'Advanced', level: 85 },
    ],
  },
  {
    title: 'Design Tools',
    icon: Palette,
    skills: [
      { name: 'Photoshop', years: 5, proficiency: 'Expert', level: 95 },
      { name: 'Illustrator', years: 4, proficiency: 'Advanced', level: 85 },
      { name: 'After Effects', years: 3, proficiency: 'Intermediate', level: 72 },
      { name: 'Figma', years: 3, proficiency: 'Advanced', level: 88 },
    ],
  },
];

const skillLevels = [
  { name: 'Web Development', level: 90 },
  { name: 'Graphic Design', level: 95 },
  { name: 'UI/UX Design', level: 85 },
  { name: 'Cloud Services', level: 75 },
];

const AnimatedCounter = ({ target, isVisible, delay = 0 }: { target: number; isVisible: boolean; delay?: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const timeout = setTimeout(() => {
      const duration = 1500;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [isVisible, target, delay]);
  
  return <span>{count}%</span>;
};

const CircularProgress = ({ 
  level, 
  size = 80, 
  strokeWidth = 6, 
  isVisible,
  delay = 0,
  name
}: { 
  level: number; 
  size?: number; 
  strokeWidth?: number; 
  isVisible: boolean;
  delay?: number;
  name: string;
}) => {
  const [progress, setProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (!isVisible) return;
    
    const timeout = setTimeout(() => {
      setProgress(level);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [isVisible, level, delay]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
            style={{ filter: 'drop-shadow(0 0 6px hsl(var(--primary) / 0.5))' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(280, 100%, 60%)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground text-center max-w-[80px] leading-tight">{name}</span>
    </div>
  );
};

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredCategories = activeCategory === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.title === activeCategory);

  const allSkillsForCircles = skillCategories.flatMap(cat => 
    cat.skills.slice(0, 2).map(skill => ({ ...skill, category: cat.title }))
  );

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration with parallax */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary/5 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10 animate-pulse" style={{ animationDelay: '0.5s' }} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={progressRef}>
        {/* Section Header */}
        <div className="text-center mb-16 scroll-animate">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Technical Skills
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Tools & <span className="gradient-text">Technologies</span>
          </h2>
        </div>

        {/* Circular Progress Indicators */}
        <div className="mb-16">
          <MacWindowFrame title="skill-metrics.viz">
            <div className="p-6">
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {allSkillsForCircles.map((skill, index) => (
                  <CircularProgress
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    isVisible={isVisible}
                    delay={index * 100}
                  />
                ))}
              </div>
            </div>
          </MacWindowFrame>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-primary text-primary-foreground shadow-neon-sm'
                : 'bg-secondary text-foreground hover:bg-primary/20'
            }`}
          >
            All Skills
          </button>
          {skillCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.title}
                onClick={() => setActiveCategory(category.title)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.title
                    ? 'bg-primary text-primary-foreground shadow-neon-sm'
                    : 'bg-secondary text-foreground hover:bg-primary/20'
                }`}
              >
                <IconComponent size={16} />
                {category.title}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <TooltipProvider delayDuration={200}>
          <div className={`grid gap-6 stagger-children transition-all duration-500 ${
            filteredCategories.length === 1 ? 'md:grid-cols-1 max-w-xl mx-auto' : 'md:grid-cols-3'
          }`}>
            {filteredCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <MacWindowFrame
                  key={category.title}
                  title={`${category.title.toLowerCase().replace(/\s+/g, '-')}.config`}
                  className="group animate-fade-in"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:shadow-neon-sm">
                        <IconComponent size={24} className="text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{category.title}</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Tooltip key={skillIndex}>
                          <TooltipTrigger asChild>
                            <span
                              className="px-3 py-1.5 text-sm bg-secondary rounded-lg text-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300 cursor-default"
                            >
                              {skill.name}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="top" 
                            className="bg-background/95 backdrop-blur-md border-primary/20 shadow-neon-sm"
                          >
                            <div className="text-center">
                              <p className="font-semibold text-primary">{skill.proficiency}</p>
                              <p className="text-xs text-muted-foreground">{skill.years} year{skill.years > 1 ? 's' : ''} experience</p>
                              <div className="mt-1 w-full bg-secondary rounded-full h-1.5">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${skill.level}%` }}
                                />
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </MacWindowFrame>
              );
            })}
          </div>
        </TooltipProvider>

        {/* Skill Bars */}
        <div className="mt-16">
          <MacWindowFrame title="skills-progress.json">
            <div className="p-6 grid md:grid-cols-2 gap-8">
              {skillLevels.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-primary font-mono">
                      <AnimatedCounter 
                        target={skill.level} 
                        isVisible={isVisible} 
                        delay={index * 100}
                      />
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-neon rounded-full shadow-neon-sm transition-all ease-out"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDuration: `${1000 + index * 200}ms`,
                        transitionDelay: `${index * 100}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </MacWindowFrame>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;