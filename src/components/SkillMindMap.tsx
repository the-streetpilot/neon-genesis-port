import { useState, useEffect } from 'react';
import { Code, Palette, Terminal, Zap } from 'lucide-react';

interface SkillNode {
  id: string;
  name: string;
  category: 'core' | 'languages' | 'tools' | 'design';
  level: number;
  x: number;
  y: number;
  connections: string[];
}

const skillNodes: SkillNode[] = [
  // Core node (center)
  { id: 'core', name: 'Full Stack', category: 'core', level: 100, x: 50, y: 50, connections: ['frontend', 'backend', 'design-core', 'devops'] },
  
  // Main branches
  { id: 'frontend', name: 'Frontend', category: 'languages', level: 90, x: 25, y: 25, connections: ['html', 'css', 'javascript', 'typescript'] },
  { id: 'backend', name: 'Backend', category: 'tools', level: 75, x: 75, y: 25, connections: ['python', 'mysql', 'aws', 'azure'] },
  { id: 'design-core', name: 'Design', category: 'design', level: 95, x: 25, y: 75, connections: ['photoshop', 'illustrator', 'figma', 'aftereffects'] },
  { id: 'devops', name: 'DevOps', category: 'tools', level: 70, x: 75, y: 75, connections: ['github', 'vscode', 'replit'] },
  
  // Language nodes
  { id: 'html', name: 'HTML', category: 'languages', level: 95, x: 10, y: 10, connections: [] },
  { id: 'css', name: 'CSS', category: 'languages', level: 92, x: 25, y: 5, connections: [] },
  { id: 'javascript', name: 'JavaScript', category: 'languages', level: 88, x: 40, y: 10, connections: [] },
  { id: 'typescript', name: 'TypeScript', category: 'languages', level: 82, x: 15, y: 35, connections: [] },
  
  // Backend nodes
  { id: 'python', name: 'Python', category: 'languages', level: 70, x: 60, y: 10, connections: [] },
  { id: 'mysql', name: 'MySQL', category: 'tools', level: 75, x: 85, y: 5, connections: [] },
  { id: 'aws', name: 'AWS', category: 'tools', level: 65, x: 90, y: 20, connections: [] },
  { id: 'azure', name: 'Azure', category: 'tools', level: 60, x: 85, y: 35, connections: [] },
  
  // Design nodes
  { id: 'photoshop', name: 'Photoshop', category: 'design', level: 95, x: 5, y: 65, connections: [] },
  { id: 'illustrator', name: 'Illustrator', category: 'design', level: 85, x: 10, y: 85, connections: [] },
  { id: 'figma', name: 'Figma', category: 'design', level: 88, x: 30, y: 90, connections: [] },
  { id: 'aftereffects', name: 'After Effects', category: 'design', level: 72, x: 40, y: 80, connections: [] },
  
  // DevOps nodes
  { id: 'github', name: 'GitHub', category: 'tools', level: 88, x: 60, y: 85, connections: [] },
  { id: 'vscode', name: 'VS Code', category: 'tools', level: 95, x: 75, y: 90, connections: [] },
  { id: 'replit', name: 'Replit', category: 'tools', level: 80, x: 90, y: 80, connections: [] },
];

const categoryColors = {
  core: 'hsl(var(--primary))',
  languages: 'hsl(280, 100%, 60%)',
  tools: 'hsl(180, 100%, 50%)',
  design: 'hsl(320, 100%, 60%)',
};

const categoryIcons = {
  core: Zap,
  languages: Code,
  tools: Terminal,
  design: Palette,
};

interface SkillMindMapProps {
  isVisible: boolean;
}

const SkillMindMap = ({ isVisible }: SkillMindMapProps) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [animatedNodes, setAnimatedNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isVisible) return;

    // Animate nodes appearing one by one
    const nodeOrder = ['core', 'frontend', 'backend', 'design-core', 'devops', 
      'html', 'css', 'javascript', 'typescript', 'python', 'mysql', 'aws', 'azure',
      'photoshop', 'illustrator', 'figma', 'aftereffects', 'github', 'vscode', 'replit'];
    
    nodeOrder.forEach((nodeId, index) => {
      setTimeout(() => {
        setAnimatedNodes(prev => new Set([...prev, nodeId]));
      }, index * 80);
    });
  }, [isVisible]);

  const getNodePosition = (node: SkillNode) => ({
    left: `${node.x}%`,
    top: `${node.y}%`,
  });

  const getConnectionPath = (from: SkillNode, to: SkillNode) => {
    const fromX = from.x;
    const fromY = from.y;
    const toX = to.x;
    const toY = to.y;
    
    // Create curved path
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    const curvature = 0.2;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const ctrlX = midX - dy * curvature;
    const ctrlY = midY + dx * curvature;
    
    return `M ${fromX} ${fromY} Q ${ctrlX} ${ctrlY} ${toX} ${toY}`;
  };

  const isConnected = (nodeId: string) => {
    if (!activeNode) return false;
    const active = skillNodes.find(n => n.id === activeNode);
    if (!active) return false;
    return active.connections.includes(nodeId) || active.id === nodeId ||
      skillNodes.find(n => n.id === nodeId)?.connections.includes(activeNode);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 overflow-hidden">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(280, 100%, 60%)" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="lineGradientActive" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(280, 100%, 60%)" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {skillNodes.map(node => 
          node.connections.map(connId => {
            const connNode = skillNodes.find(n => n.id === connId);
            if (!connNode) return null;
            const bothAnimated = animatedNodes.has(node.id) && animatedNodes.has(connId);
            const isActive = activeNode && (isConnected(node.id) || isConnected(connId));
            
            return (
              <path
                key={`${node.id}-${connId}`}
                d={getConnectionPath(node, connNode)}
                fill="none"
                stroke={isActive ? "url(#lineGradientActive)" : "url(#lineGradient)"}
                strokeWidth={isActive ? 2 : 1}
                className={`transition-all duration-500 ${bothAnimated ? 'opacity-100' : 'opacity-0'}`}
                vectorEffect="non-scaling-stroke"
              />
            );
          })
        )}
      </svg>

      {/* Skill nodes */}
      {skillNodes.map(node => {
        const Icon = categoryIcons[node.category];
        const isAnimated = animatedNodes.has(node.id);
        const isActive = activeNode === node.id;
        const isHighlighted = isConnected(node.id);
        const nodeSize = node.category === 'core' ? 'w-20 h-20' : 
          ['frontend', 'backend', 'design-core', 'devops'].includes(node.id) ? 'w-16 h-16' : 'w-12 h-12';
        const fontSize = node.category === 'core' ? 'text-xs' : 
          ['frontend', 'backend', 'design-core', 'devops'].includes(node.id) ? 'text-[10px]' : 'text-[8px]';

        return (
          <div
            key={node.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 cursor-pointer z-10
              ${isAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
              ${isActive ? 'scale-110 z-20' : ''}
              ${activeNode && !isHighlighted ? 'opacity-40' : ''}
            `}
            style={{
              ...getNodePosition(node),
              transitionDelay: isAnimated ? '0ms' : '0ms',
            }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div
              className={`${nodeSize} rounded-full flex flex-col items-center justify-center gap-0.5
                backdrop-blur-md border-2 transition-all duration-300
                ${isActive ? 'shadow-neon' : 'hover:shadow-neon-sm'}
              `}
              style={{
                backgroundColor: `${categoryColors[node.category]}15`,
                borderColor: isActive || isHighlighted ? categoryColors[node.category] : `${categoryColors[node.category]}50`,
                boxShadow: isActive ? `0 0 20px ${categoryColors[node.category]}50` : undefined,
              }}
            >
              <Icon 
                size={node.category === 'core' ? 20 : ['frontend', 'backend', 'design-core', 'devops'].includes(node.id) ? 16 : 12} 
                style={{ color: categoryColors[node.category] }}
              />
              <span className={`${fontSize} font-medium text-center leading-tight px-1`} style={{ color: categoryColors[node.category] }}>
                {node.name}
              </span>
            </div>
            
            {/* Level indicator ring */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              style={{ transform: 'rotate(-90deg)' }}
            >
              <circle
                cx="50%"
                cy="50%"
                r="48%"
                fill="none"
                stroke={categoryColors[node.category]}
                strokeWidth="2"
                strokeDasharray={`${node.level * 3.14 * 0.96} 1000`}
                strokeLinecap="round"
                className="transition-all duration-1000"
                style={{ 
                  opacity: isAnimated ? 0.6 : 0,
                  filter: `drop-shadow(0 0 4px ${categoryColors[node.category]})`,
                }}
              />
            </svg>
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 text-xs">
        {Object.entries(categoryColors).map(([category, color]) => {
          const Icon = categoryIcons[category as keyof typeof categoryIcons];
          return (
            <div key={category} className="flex items-center gap-1.5 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
              <Icon size={12} style={{ color }} />
              <span className="text-muted-foreground capitalize">{category === 'core' ? 'Core' : category}</span>
            </div>
          );
        })}
      </div>

      {/* Hover tooltip */}
      {activeNode && (
        <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-md border border-primary/20 rounded-lg p-3 shadow-neon-sm animate-fade-in">
          {(() => {
            const node = skillNodes.find(n => n.id === activeNode);
            if (!node) return null;
            return (
              <div className="text-center">
                <p className="font-semibold text-primary">{node.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{node.category}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${node.level}%`,
                        background: `linear-gradient(90deg, ${categoryColors[node.category]}, hsl(280, 100%, 60%))`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono text-primary">{node.level}%</span>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default SkillMindMap;