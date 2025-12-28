import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import MacWindowFrame from '../MacWindowFrame';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'varun.tenztro@gmail.com', href: 'mailto:varun.tenztro@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 80750 51622', href: 'tel:+918075051622' },
  { icon: MapPin, label: 'Location', value: 'Trivandrum, Kerala, India', href: '#' },
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/varunvinod.alive/' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/varun-vinod-husky/' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/the-streetpilot' },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-animate">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Contact
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Let's <span className="gradient-text">Connect</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8 scroll-animate-left">
            <p className="text-lg text-muted-foreground">
              Have a project in mind or want to collaborate? Feel free to reach out. I'm always excited to work on new and challenging projects.
            </p>
            
            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <MacWindowFrame key={index}>
                  <a
                    href={item.href}
                    className="p-4 flex items-center gap-4 group transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon size={22} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                </MacWindowFrame>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">Follow me on</p>
              <div className="flex gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center hover-glow hover:scale-110 transition-all duration-300"
                    aria-label={link.label}
                  >
                    <link.icon size={22} className="text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <MacWindowFrame title="Send a Message" className="scroll-animate-right">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-sm text-muted-foreground mb-2 block">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                    className="bg-secondary/50 border-border focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                    className="bg-secondary/50 border-border focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="text-sm text-muted-foreground mb-2 block">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    className="bg-secondary/50 border-border focus:border-primary resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  variant="neon"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </MacWindowFrame>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;