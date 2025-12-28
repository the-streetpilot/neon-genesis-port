import { ReactNode, useState } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';

interface MacWindowFrameProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

const MacWindowFrame = ({ children, title, className = '' }: MacWindowFrameProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`glass rounded-2xl overflow-hidden hover-glow ${className}`}>
      {/* macOS Window Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-card/50">
        <div 
          className="flex items-center gap-1.5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Close button */}
          <div className="w-3 h-3 rounded-full bg-[hsl(0,72%,51%)] hover:bg-[hsl(0,72%,45%)] transition-all duration-200 cursor-pointer flex items-center justify-center group">
            {isHovered && <X size={8} className="text-[hsl(0,30%,20%)] opacity-0 group-hover:opacity-100 transition-opacity" />}
          </div>
          {/* Minimize button */}
          <div className="w-3 h-3 rounded-full bg-[hsl(45,93%,47%)] hover:bg-[hsl(45,93%,40%)] transition-all duration-200 cursor-pointer flex items-center justify-center group">
            {isHovered && <Minus size={8} className="text-[hsl(45,50%,20%)] opacity-0 group-hover:opacity-100 transition-opacity" />}
          </div>
          {/* Maximize button */}
          <div className="w-3 h-3 rounded-full bg-[hsl(120,57%,48%)] hover:bg-[hsl(120,57%,40%)] transition-all duration-200 cursor-pointer flex items-center justify-center group">
            {isHovered && <Maximize2 size={6} className="text-[hsl(120,30%,20%)] opacity-0 group-hover:opacity-100 transition-opacity" />}
          </div>
        </div>
        {title && (
          <span className="text-xs text-muted-foreground ml-2 font-medium">{title}</span>
        )}
      </div>
      {/* Content */}
      <div>
        {children}
      </div>
    </div>
  );
};

export default MacWindowFrame;