import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CertificationItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  category: string;
  image: string;
  link?: string;
}

const certifications: CertificationItem[] = [
  {
    id: 1,
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024',
    category: 'Cloud',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Advanced Photoshop',
    issuer: 'Adobe',
    date: '2023',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: '2023',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'UI/UX Design Fundamentals',
    issuer: 'Google',
    date: '2024',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'JavaScript Algorithms',
    issuer: 'freeCodeCamp',
    date: '2023',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'Python for Data Science',
    issuer: 'Coursera',
    date: '2024',
    category: 'Programming',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop',
  },
];

const categories = ['All', 'Cloud', 'Design', 'Development', 'Programming'];

const CertificationsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredCertifications = selectedCategory === 'All' 
    ? certifications 
    : certifications.filter(cert => cert.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredCertifications.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredCertifications.length) % filteredCertifications.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  };

  return (
    <section id="certifications" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-primary/5 blur-[100px] animate-float-slow" />
        <div className="absolute bottom-1/4 left-10 w-60 h-60 rounded-full bg-primary/3 blur-[80px] animate-float-medium" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-animate">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Achievements
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Certifications & <span className="gradient-text">Media</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of certifications, achievements, and media highlights from my journey.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 scroll-animate">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-neon-sm'
                  : 'glass text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {filteredCertifications.map((cert, index) => (
            <div
              key={cert.id}
              onClick={() => openLightbox(index)}
              className="group relative glass rounded-2xl overflow-hidden cursor-pointer hover-glow transition-all duration-500 transform hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30">
                    {cert.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{cert.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              </div>

              {/* Hover Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Award size={20} className="text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl animate-fade-in"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors z-50"
          >
            <X size={24} className="text-foreground" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-6 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors z-50"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-6 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors z-50"
          >
            <ChevronRight size={24} className="text-foreground" />
          </button>

          {/* Image Container */}
          <div 
            className="max-w-4xl w-full mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass rounded-3xl overflow-hidden">
              <img
                src={filteredCertifications[currentIndex].image}
                alt={filteredCertifications[currentIndex].title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="p-6 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30">
                        {filteredCertifications[currentIndex].category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {filteredCertifications[currentIndex].date}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {filteredCertifications[currentIndex].title}
                    </h3>
                    <p className="text-muted-foreground">
                      {filteredCertifications[currentIndex].issuer}
                    </p>
                  </div>
                  {filteredCertifications[currentIndex].link && (
                    <Button variant="neon-outline" size="sm" asChild>
                      <a href={filteredCertifications[currentIndex].link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} />
                        View
                      </a>
                    </Button>
                  )}
                </div>
                {/* Pagination dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {filteredCertifications.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificationsSection;