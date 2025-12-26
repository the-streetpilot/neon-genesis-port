import { Palette, Globe, Smartphone, Lightbulb, Layout, Cloud } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Brand Identity Design',
    description: 'Crafting unique visual identities that capture your brand essence and resonate with your audience.',
  },
  {
    icon: Layout,
    title: 'Illustration',
    description: 'Custom illustrations and graphics that bring your ideas to life with creativity and precision.',
  },
  {
    icon: Globe,
    title: 'Web Design & Hosting',
    description: 'Responsive websites with AWS/Azure hosting, ensuring fast, secure, and scalable solutions.',
  },
  {
    icon: Lightbulb,
    title: 'Product Strategy',
    description: 'Strategic consultation to align your product vision with market needs and user expectations.',
  },
  {
    icon: Smartphone,
    title: 'UI/UX Design',
    description: 'User-centered interface design that combines aesthetics with intuitive functionality.',
  },
  {
    icon: Cloud,
    title: 'Mobile App Interface',
    description: 'Beautiful and functional mobile app interfaces that deliver exceptional user experiences.',
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Services
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            What I <span className="gradient-text">Offer</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 hover-glow group cursor-default transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:shadow-neon-sm transition-all duration-300">
                <service.icon size={28} className="text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
              
              {/* Hover indicator */}
              <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium">Learn more</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
