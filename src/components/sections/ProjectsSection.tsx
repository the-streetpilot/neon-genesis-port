import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'ILLUMINATI \'25 Website',
    description: 'Official website for the Techno Cultural Fest featuring dynamic animations and event management.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    link: '#',
    github: '#',
    featured: true,
  },
  {
    title: 'IEEE SB MCET Website',
    description: 'Team Grafyo project - Complete website for IEEE Student Branch with event management and member portal.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://ieee-sbmcet.netlify.app/',
    github: '#',
    featured: true,
  },
  {
    title: 'College Election Portal',
    description: 'Semester 6 Project - Digital voting and election management system for college elections.',
    tags: ['Python', 'MySQL', 'Web Dev'],
    link: '#',
    github: '#',
    featured: false,
  },
  {
    title: 'Gaming YouTuber Branding',
    description: 'Complete branding packages for gaming content creators including logos, banners, and overlays.',
    tags: ['Photoshop', 'Illustrator', 'After Effects'],
    link: '#',
    featured: false,
  },
  {
    title: 'Discord Community Designs',
    description: 'Server branding, bot interfaces, and custom emotes for various Discord communities.',
    tags: ['Design', 'Branding', 'UI/UX'],
    link: '#',
    featured: false,
  },
  {
    title: 'GTA/FIVEM Server Branding',
    description: 'Custom branding and promotional materials for GTA V and FIVEM roleplay servers.',
    tags: ['Branding', 'Motion Graphics', 'Design'],
    link: '#',
    featured: false,
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-[120px] animate-float-medium" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-animate">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12 stagger-children">
          {projects.filter(p => p.featured).map((project, index) => (
            <div
              key={index}
              className="glass rounded-2xl overflow-hidden hover-glow group"
            >
              {/* Project Preview */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary/30">{project.title.charAt(0)}</span>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                  <Button variant="neon" size="sm" asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} />
                      View Live
                    </a>
                  </Button>
                  {project.github && (
                    <Button variant="glass" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github size={16} />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.filter(p => !p.featured).map((project, index) => (
            <div
              key={index}
              className="glass rounded-xl p-5 hover-glow group cursor-pointer"
            >
              <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors text-sm">
                {project.title}
              </h4>
              <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 2).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-0.5 text-xs bg-secondary text-muted-foreground rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
