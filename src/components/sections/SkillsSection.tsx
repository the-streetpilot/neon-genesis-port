import { Code, Palette, Terminal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import MacWindowFrame from '@/components/MacWindowFrame';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const skillCategories = [
  {
    title: 'Languages',
    icon: Code,
    skills: [
      { name: 'HTML', years: 5, proficiency: 'Expert' },
      { name: 'CSS', years: 5, proficiency: 'Expert' },
      { name: 'JavaScript', years: 4, proficiency: 'Advanced' },
      { name: 'TypeScript', years: 3, proficiency: 'Advanced' },
      { name: 'Python', years: 3, proficiency: 'Intermediate' },
      { name: 'C', years: 2, proficiency: 'Intermediate' },
      { name: 'Lua', years: 1, proficiency: 'Beginner' },
      { name: 'MySQL', years: 3, proficiency: 'Intermediate' },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: Terminal,
    skills: [
      { name: 'VS Code', years: 4, proficiency: 'Expert' },
      { name: 'AWS', years: 2, proficiency: 'Intermediate' },
      { name: 'Azure', years: 2, proficiency: 'Intermediate' },
      { name: 'Replit', years: 2, proficiency: 'Advanced' },
      { name: 'GitHub', years: 4, proficiency: 'Advanced' },
      { name: 'WordPress', years: 3, proficiency: 'Advanced' },
    ],
  },
  {
    title: 'Design Tools',
    icon: Palette,
    skills: [
      { name: 'Photoshop', years: 5, proficiency: 'Expert' },
      { name: 'Illustrator', years: 4, proficiency: 'Advanced' },
      { name: 'After Effects', years: 3, proficiency: 'Intermediate' },
      { name: 'Figma', years: 3, proficiency: 'Advanced' },
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

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration with parallax */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary/5 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10 animate-pulse" style={{ animationDelay: '0.5s' }} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-animate">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Technical Skills
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Tools & <span className="gradient-text">Technologies</span>
          </h2>
        </div>

        {/* Skills Grid */}
        <TooltipProvider delayDuration={200}>
          <div className="grid md:grid-cols-3 gap-6 stagger-children">
            {skillCategories.map((category, categoryIndex) => (
              <MacWindowFrame
                key={categoryIndex}
                title={`${category.title.toLowerCase().replace(/\s+/g, '-')}.config`}
                className="group"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:shadow-neon-sm">
                      <category.icon size={24} className="text-primary" />
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
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              </MacWindowFrame>
            ))}
          </div>
        </TooltipProvider>

        {/* Skill Bars */}
        <div className="mt-16" ref={progressRef}>
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