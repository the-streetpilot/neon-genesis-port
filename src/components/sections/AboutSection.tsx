import { MapPin, Calendar, Briefcase, Award } from 'lucide-react';
import profileImage from '@/assets/profile-1.jpeg';

const highlights = [
  { icon: MapPin, label: 'Location', value: 'Kerala, India' },
  { icon: Calendar, label: 'Experience', value: '6+ Years' },
  { icon: Briefcase, label: 'Role', value: 'IEEE Video Lead' },
  { icon: Award, label: 'Position', value: 'VP at JCI' },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background parallax elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-primary/5 blur-[120px] animate-float-slow" />
        <div className="absolute bottom-20 left-0 w-64 h-64 rounded-full bg-primary/3 blur-[100px] animate-float-medium" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-animate">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            About Me
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Crafting Digital <span className="gradient-text">Excellence</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image/Visual */}
          <div className="relative scroll-animate-left">
            <div className="glass rounded-3xl p-8 hover-glow transition-all duration-500 group">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden">
                {/* Profile Image */}
                <img 
                  src={profileImage} 
                  alt="Varun Vinod" 
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full border border-primary/30 animate-pulse" />
                <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-primary/10 blur-xl" />
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 glass px-4 py-2 rounded-full animate-float">
              <span className="text-sm font-medium text-primary">6+ Years</span>
            </div>
            <div className="absolute -bottom-4 -left-4 glass px-4 py-2 rounded-full animate-float" style={{ animationDelay: '1s' }}>
              <span className="text-sm font-medium text-primary">50+ Projects</span>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6 scroll-animate-right">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Varun Vinod is a Trivandrum-based <span className="text-foreground font-medium">Graphic Designer</span> and <span className="text-foreground font-medium">Web Developer</span> with over 6 years of freelance experience. He specializes in blending compelling visual design with responsive web development to create engaging and purpose-driven digital experiences.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Having worked on global client projects, IEEE media teams, and freelance software/web development, Varun is recognized for merging aesthetic precision with technical execution. His portfolio includes brands, events, gaming creators, YouTubers, student organizations, and global clients.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 stagger-children">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-4 hover-glow group cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="glass rounded-xl p-6 mt-8 hover-glow">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Education
              </h3>
              <p className="text-foreground font-medium">Mohandas College of Engineering & Technology</p>
              <p className="text-sm text-muted-foreground">B.Tech in Computer Science (2022 – Present)</p>
              <p className="text-xs text-muted-foreground mt-2">
                Cloud Computing • Responsive Web Dev • Python • Product Management • Java • C Programming
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
