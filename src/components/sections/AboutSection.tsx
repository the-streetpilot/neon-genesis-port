import { useState, useEffect } from 'react';
import { MapPin, Calendar, Briefcase, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import profileImage1 from '@/assets/profile-1.jpeg';
import profileImage2 from '@/assets/profile-2.jpeg';
import profileImage3 from '@/assets/profile-3.jpeg';
import MacWindowFrame from '@/components/MacWindowFrame';

const profileImages = [profileImage1, profileImage2, profileImage3];

const highlights = [
  { icon: MapPin, label: 'Location', value: 'Kerala, India' },
  { icon: Calendar, label: 'Experience', value: '6+ Years' },
  { icon: Briefcase, label: 'Role', value: 'IEEE Video Lead' },
  { icon: Award, label: 'Position', value: 'VP at JCI' },
];

const AboutSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % profileImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToImage = (index: number) => setCurrentImage(index);
  const goNext = () => setCurrentImage((prev) => (prev + 1) % profileImages.length);
  const goPrev = () => setCurrentImage((prev) => (prev - 1 + profileImages.length) % profileImages.length);

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
          {/* Left - Image Carousel with macOS frame */}
          <div className="relative scroll-animate-left max-w-sm mx-auto lg:mx-0">
            <MacWindowFrame title="profile.jpg">
              <div className="relative aspect-square overflow-hidden group">
                {/* Images */}
                {profileImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Varun Vinod ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                      index === currentImage ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  />
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/70"
                >
                  <ChevronLeft size={18} className="text-foreground" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/70"
                >
                  <ChevronRight size={18} className="text-foreground" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {profileImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImage ? 'bg-primary w-5' : 'bg-foreground/40 hover:bg-foreground/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </MacWindowFrame>
            
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
                <MacWindowFrame key={index} className="!rounded-xl">
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <item.icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium text-foreground">{item.value}</p>
                      </div>
                    </div>
                  </div>
                </MacWindowFrame>
              ))}
            </div>

            {/* Education */}
            <MacWindowFrame title="education.md" className="mt-8">
              <div className="p-6">
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
            </MacWindowFrame>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;