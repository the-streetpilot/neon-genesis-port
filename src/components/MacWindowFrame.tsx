import { ReactNode } from 'react';

interface MacWindowFrameProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

const MacWindowFrame = ({ children, title, className = '' }: MacWindowFrameProps) => {
  return (
    <div className={`glass rounded-2xl overflow-hidden hover-glow ${className}`}>
      {/* macOS Window Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-card/50">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[hsl(0,100%,67%)] hover:bg-[hsl(0,100%,60%)] transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[hsl(45,100%,51%)] hover:bg-[hsl(45,100%,45%)] transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[hsl(120,100%,35%)] hover:bg-[hsl(120,100%,30%)] transition-colors cursor-pointer" />
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