import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import MacWindowFrame from '../MacWindowFrame';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    content: 'Working with Varun was an absolute pleasure. His attention to detail and creative vision transformed our brand identity completely. Highly recommend!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Product Manager, InnovateLab',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'The UI/UX design Varun delivered exceeded our expectations. Our user engagement increased by 40% after the redesign. Truly exceptional work.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Founder, CreativeHub',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    content: 'Varun brings a unique blend of creativity and technical expertise. He understood our vision perfectly and delivered a stunning website that converts.',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'CTO, NextGen Solutions',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    content: 'Outstanding collaboration from start to finish. Varun\'s mobile app designs are intuitive and beautiful. Our users love the new experience!',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-[120px] animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary/3 blur-[100px] animate-float-medium" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-animate">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Client <span className="gradient-text">Reviews</span>
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto scroll-animate-scale">
          <MacWindowFrame title="testimonials.review">
            <div className="p-8 md:p-12 relative">
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 text-primary/20">
                <Quote size={60} />
              </div>

              {/* Testimonial Content */}
              <div className="relative z-10">
                <div 
                  className="transition-all duration-500 ease-out"
                  key={currentIndex}
                  style={{ animation: 'fadeInUp 0.5s ease-out' }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6 justify-center">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        className="text-primary fill-primary"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg md:text-xl text-center text-foreground/90 leading-relaxed mb-8 italic">
                    "{testimonials[currentIndex].content}"
                  </p>

                  {/* Author */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/50 shadow-neon-sm">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-foreground">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full glass hover:bg-primary/20 transition-all duration-300 hover:scale-110"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={24} className="text-primary" />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4">
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full glass hover:bg-primary/20 transition-all duration-300 hover:scale-110"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={24} className="text-primary" />
                </button>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 pb-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-primary'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </MacWindowFrame>
        </div>

        {/* Additional Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 stagger-children">
          {testimonials.slice(1, 4).map((testimonial, index) => (
            <MacWindowFrame key={testimonial.id}>
              <div className="p-6 group">
                <Quote size={24} className="text-primary/30 mb-4" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover border border-primary/30"
                  />
                  <div>
                    <h5 className="text-sm font-medium text-foreground">
                      {testimonial.name}
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </MacWindowFrame>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;