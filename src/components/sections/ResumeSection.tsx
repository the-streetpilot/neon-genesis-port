import { useState } from 'react';
import { Download, X, ZoomIn, ZoomOut, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MacWindowFrame from '../MacWindowFrame';

const resumeHighlights = [
  { label: 'Experience', value: '5+ Years' },
  { label: 'Projects', value: '20+' },
  { label: 'Certifications', value: '15+' },
  { label: 'Technologies', value: '25+' },
];

const ResumeSection = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));

  return (
    <section id="resume" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-primary/5 blur-[120px] animate-float-slow" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-animate">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Resume
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            My <span className="gradient-text">Curriculum Vitae</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Resume Preview Card */}
          <div 
            className="scroll-animate-left"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <MacWindowFrame title="Varun_Vinod_Resume.pdf">
              <div className="relative aspect-[8.5/11] bg-gradient-to-br from-card to-secondary/50 overflow-hidden group cursor-pointer"
                onClick={() => setIsPreviewOpen(true)}
              >
                {/* PDF Preview placeholder with animated content */}
                <div className="absolute inset-0 p-8 flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">VV</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">VARUN VINOD</h3>
                      <p className="text-sm text-muted-foreground">Graphic Designer & Web Developer</p>
                    </div>
                  </div>

                  {/* Content lines */}
                  <div className="space-y-3 flex-1">
                    <div className="h-2 bg-primary/20 rounded w-1/3 animate-shimmer" />
                    <div className="h-2 bg-muted/40 rounded w-full" style={{ animationDelay: '0.1s' }} />
                    <div className="h-2 bg-muted/40 rounded w-4/5" style={{ animationDelay: '0.2s' }} />
                    <div className="h-2 bg-muted/40 rounded w-5/6" style={{ animationDelay: '0.3s' }} />
                    
                    <div className="h-2 bg-primary/20 rounded w-1/4 mt-6" />
                    <div className="h-2 bg-muted/40 rounded w-full" />
                    <div className="h-2 bg-muted/40 rounded w-3/4" />
                    <div className="h-2 bg-muted/40 rounded w-5/6" />
                    
                    <div className="h-2 bg-primary/20 rounded w-1/3 mt-6" />
                    <div className="h-2 bg-muted/40 rounded w-full" />
                    <div className="h-2 bg-muted/40 rounded w-2/3" />
                  </div>
                </div>

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <FileText size={32} className="text-primary" />
                    </div>
                    <p className="text-foreground font-medium">Click to Preview</p>
                  </div>
                </div>

                {/* Corner fold effect */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-secondary to-card transform rotate-0 origin-top-right"
                  style={{
                    clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                  }}
                />
              </div>
            </MacWindowFrame>
          </div>

          {/* Resume Info */}
          <div className="scroll-animate-right space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Graphic Designer & Web Developer
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Creative and results-driven professional with over 5 years of freelance experience. 
                Currently serving as Video Lead at IEEE Computer Society Kerala Chapter and Secretary 
                at IEEE Student Branch MCET. Experienced in full-cycle project execution, content strategy, 
                and digital branding.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {resumeHighlights.map((item, index) => (
                <MacWindowFrame key={index}>
                  <div className="p-4 text-center group">
                    <p className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform">
                      {item.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                </MacWindowFrame>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                variant="neon"
                size="lg"
                asChild
                className="group"
              >
                <a href="/Varun_Vinod_Resume.pdf" download>
                  <Download size={20} className="group-hover:animate-bounce" />
                  Download Resume
                </a>
              </Button>
              
              <Button
                variant="glass"
                size="lg"
                onClick={() => setIsPreviewOpen(true)}
                className="group"
              >
                <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
                View Full Resume
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen PDF Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/90 backdrop-blur-md animate-fade-in"
            onClick={() => setIsPreviewOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl h-[90vh] animate-scale-in">
            <MacWindowFrame title="Varun_Vinod_Resume.pdf" className="h-full">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-card/50">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.5}
                  >
                    <ZoomOut size={18} />
                  </Button>
                  <span className="text-sm text-muted-foreground min-w-[60px] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomIn}
                    disabled={zoom >= 2}
                  >
                    <ZoomIn size={18} />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="neon"
                    size="sm"
                    asChild
                  >
                    <a href="/Varun_Vinod_Resume.pdf" download>
                      <Download size={16} />
                      Download
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPreviewOpen(false)}
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>

              {/* PDF Embed */}
              <div className="flex-1 overflow-auto bg-muted/20" style={{ height: 'calc(100% - 48px)' }}>
                <div 
                  className="transition-transform duration-300 origin-top-left p-4"
                  style={{ transform: `scale(${zoom})` }}
                >
                  <iframe
                    src="/Varun_Vinod_Resume.pdf"
                    className="w-full h-[calc(90vh-100px)] rounded-lg border border-border/30"
                    title="Resume Preview"
                  />
                </div>
              </div>
            </MacWindowFrame>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResumeSection;