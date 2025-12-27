import { Code, Palette, Terminal } from 'lucide-react';
import MacWindowFrame from '@/components/MacWindowFrame';

const skillCategories = [
  {
    title: 'Languages',
    icon: Code,
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'C', 'Lua', 'MySQL'],
  },
  {
    title: 'Tools & Platforms',
    icon: Terminal,
    skills: ['VS Code', 'AWS', 'Azure', 'Replit', 'GitHub', 'WordPress'],
  },
  {
    title: 'Design Tools',
    icon: Palette,
    skills: ['Photoshop', 'Illustrator', 'After Effects', 'Figma'],
  },
];

const SkillsSection = () => {
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
                    <span
                      key={skillIndex}
                      className="px-3 py-1.5 text-sm bg-secondary rounded-lg text-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </MacWindowFrame>
          ))}
        </div>

        {/* Skill Bars */}
        <div className="mt-16">
          <MacWindowFrame title="skills-progress.json">
            <div className="p-6 grid md:grid-cols-2 gap-8">
              {[
                { name: 'Web Development', level: 90 },
                { name: 'Graphic Design', level: 95 },
                { name: 'UI/UX Design', level: 85 },
                { name: 'Cloud Services', level: 75 },
              ].map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-neon rounded-full transition-all duration-1000 shadow-neon-sm"
                      style={{ width: `${skill.level}%` }}
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