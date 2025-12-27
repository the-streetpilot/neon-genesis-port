import { Calendar } from 'lucide-react';
import MacWindowFrame from '@/components/MacWindowFrame';

const experiences = [
  {
    title: 'Freelance Web Developer & Graphic Designer',
    company: 'Self-Employed',
    period: '2020 – Present',
    description: 'Designed logos, posters, cinematic intros, thumbnails, and branding for organizations and gaming creators worldwide. Created Discord Bots, YouTube graphics, and GTA V/FIVEM server branding.',
    current: true,
  },
  {
    title: 'Video Lead',
    company: 'IEEE CS Kerala Chapter',
    period: 'Mar 2025 – Jan 2026',
    description: 'Led media coverage, produced event highlight videos & social media promotion for the IEEE Computer Society Kerala Chapter.',
    current: true,
  },
  {
    title: 'VP Business',
    company: 'JCI Trivandrum Royal City',
    period: 'Dec 2025 – Present',
    description: 'Vice President of Business Development, driving growth initiatives and business partnerships.',
    current: true,
  },
  {
    title: 'Secretary & CS Chair',
    company: 'IEEE SB MCET',
    period: 'Jan 2025 – Jan 2026',
    description: 'Managed event documentation, permissions, team leadership, design & campus campaigns for IEEE Student Branch.',
    current: false,
  },
  {
    title: 'Web Master & Design Lead',
    company: 'IEEE SB MCET',
    period: 'Nov 2023 – Dec 2024',
    description: 'Co-developed IEEE SB MCET Website. Led branding, design team, event identities, certificate systems, and UI workflow.',
    current: false,
  },
  {
    title: 'Secretary',
    company: 'CSI MCET',
    period: 'Feb 2024 – Present',
    description: 'Managing operations and communications for the Computer Society of India student chapter.',
    current: true,
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-[100px] animate-float-slow" />
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-animate">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Work Experience
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Professional <span className="gradient-text">Journey</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary shadow-neon transform -translate-x-1/2 z-10">
                {exp.current && (
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
                )}
              </div>

              {/* Content */}
              <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <MacWindowFrame title={`${exp.company.toLowerCase().replace(/\s+/g, '-')}.md`}>
                  <div className="p-6">
                    <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      {exp.current && (
                        <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-primary font-medium mb-2">{exp.company}</p>
                    
                    <div className={`flex items-center gap-2 text-sm text-muted-foreground mb-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </MacWindowFrame>
              </div>

              {/* Spacer for opposite side */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;