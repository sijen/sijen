import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type TerminalLine = {
  type: 'input' | 'output' | 'command';
  content: string;
  color?: string;
};

interface TerminalProps {
  role?: string;
  mission?: string;
}

export default function Terminal({ role = 'Cloud Security Analyst', mission = ' protecting systems and users' }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

const introLines: TerminalLine[] = [
    { type: 'command', content: 'whoami', color: 'text-xdr-info' },
    { type: 'output', content: 'Sijen - Security Analyst & Leo Volunteer', color: 'text-xdr-text' },
    { type: 'command', content: 'echo $ROLE', color: 'text-xdr-info' },
    { type: 'output', content: role, color: 'text-xdr-high' },
    { type: 'command', content: 'echo $MISSION', color: 'text-xdr-info' },
    { type: 'output', content: mission, color: 'text-xdr-low' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex < introLines.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, introLines[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, currentIndex === 0 ? 500 : 350);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="glassXDR rounded-xl overflow-hidden shadow-control-room">
        {/* Terminal Header */}
        <div className="bg-xdr-panel px-4 py-2 flex items-center justify-between border-b border-xdr-border">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-xdr-critical"></div>
            <div className="w-3 h-3 rounded-full bg-xdr-medium"></div>
            <div className="w-3 h-3 rounded-full bg-xdr-low"></div>
          </div>
          <div className="text-xs text-xdr-muted font-mono">sijen@portfolio:~$</div>
          <div className="text-xs text-xdr-muted"> Terminal v1.0</div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          className="p-4 md:p-6 font-mono text-sm md:text-base min-h-[280px] max-h-[400px] overflow-y-auto"
        >
          {/* Initial prompt */}
          {!isComplete && currentIndex === 0 && (
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xdr-info">sijen@portfolio</span>
              <span className="text-xdr-muted">@</span>
              <span className="text-xdr-info">~</span>
              <span className="text-xdr-text">{`$`}</span>
              <span className="animate-pulse">_</span>
            </div>
          )}

          {/* Rendered lines */}
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-2"
            >
              {line.type === 'command' && (
                <div className="flex items-center space-x-2">
                  <span className="text-xdr-info">sijen@portfolio</span>
                  <span className="text-xdr-muted">@</span>
                  <span className="text-xdr-info">~</span>
                  <span className="text-xdr-text">{`$`}</span>
                  <span className={line.color}>{line.content}</span>
                </div>
              )}
              {line.type === 'output' && (
                <div className={`${line.color} ml-4`}>{line.content}</div>
              )}
            </motion.div>
          ))}

          {/* Cursor when typing */}
          {!isComplete && currentIndex > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-xdr-info">sijen@portfolio</span>
              <span className="text-xdr-muted">@</span>
              <span className="text-xdr-info">~</span>
              <span className="text-xdr-text">{`$`}</span>
              <span
                className={`transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`}
              >
                ▊
              </span>
            </div>
          )}

          {/* Post-animation prompt */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-2 mt-4"
            >
              <span className="text-xdr-info">sijen@portfolio</span>
              <span className="text-xdr-muted">@</span>
              <span className="text-xdr-info">~</span>
              <span className="text-xdr-text">{`$`}</span>
              <span
                className={`transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`}
              >
                ▊
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
