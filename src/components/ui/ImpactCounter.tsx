import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ImpactStat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: string;
  color: string;
}

interface ImpactCounterProps {
  stats: ImpactStat[];
}

function Counter({ 
  value, 
  suffix = '', 
  prefix = '',
  inView 
}: { 
  value: number; 
  suffix?: string;
  prefix?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function ImpactCounter({ stats }: ImpactCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="glassXDR p-4 md:p-6 rounded-xl text-center"
        >
          <div className="text-3xl md:text-4xl mb-2">{stat.icon}</div>
          <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>
            <Counter 
              value={stat.value} 
              suffix={stat.suffix}
              prefix={stat.prefix}
              inView={isInView}
            />
          </div>
          <div className="text-xs md:text-sm text-xdr-muted uppercase tracking-wider">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
