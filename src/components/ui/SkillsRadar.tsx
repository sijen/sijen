import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface SkillData {
  skill: string;
  value: number;
  category: 'cloud' | 'security' | 'tools' | 'other';
}

interface SkillsRadarProps {
  data?: SkillData[];
}

const defaultSkills: SkillData[] = [
  { skill: 'Microsoft Sentinel', value: 85, category: 'cloud' },
  { skill: 'Microsoft Defender', value: 85, category: 'security' },
  { skill: 'SIEM', value: 75, category: 'security' },
  { skill: 'Fortinet Firewall', value: 70, category: 'security' },
  { skill: 'Azure', value: 72, category: 'cloud' },
  { skill: 'PaloAlto Firewall', value: 20, category: 'tools' },
  { skill: 'Microsoft XDR', value: 68, category: 'security' },
  { skill: 'Threat Hunting', value: 30, category: 'security' },
  { skill: 'ProofPoint', value: 30, category: 'security' },
  { skill: 'OSINT', value: 80, category: 'security' },
  { skill: 'Recorded Future', value: 80, category: 'security' },
  { skill: 'Incident Response', value: 90, category: 'security' },
];

const categoryColors: Record<string, string> = {
  cloud: '#3B82F6',
  security: '#EF4444',
  tools: '#22C55E',
  other: '#FACC15',
};

export default function SkillsRadar({ data = defaultSkills }: SkillsRadarProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2 - 60;
    const angleSlice = (Math.PI * 2) / data.length;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Draw circular grid
    const levels = 5;
    for (let level = 1; level <= levels; level++) {
      const r = (radius / levels) * level;
      g.append('circle')
        .attr('r', r)
        .attr('fill', 'none')
        .attr('stroke', '#1F2937')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3,3');
    }

    // Draw axis lines and labels
    data.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      // Axis line
      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', '#1F2937')
        .attr('stroke-width', 1);

      // Label
      const labelX = Math.cos(angle) * (radius + 25);
      const labelY = Math.sin(angle) * (radius + 25);
      
      g.append('text')
        .attr('x', labelX)
        .attr('y', labelY)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', '#9CA3AF')
        .attr('font-size', '10px')
        .attr('font-family', 'Inter, sans-serif')
        .text(d.skill);
    });

    // Create radar area path
    const radarLine = d3.lineRadial<SkillData>()
      .radius((d) => (d.value / 100) * radius)
      .angle((_, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);

    // Draw filled area with gradient
    const gradientId = 'radar-gradient';
    const gradient = svg.append('defs')
      .append('radialGradient')
      .attr('id', gradientId)
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3B82F6')
      .attr('stop-opacity', 0.3);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#3B82F6')
      .attr('stop-opacity', 0.1);

    g.append('path')
      .datum(data)
      .attr('d', radarLine as any)
      .attr('fill', `url(#${gradientId})`)
      .attr('stroke', '#3B82F6')
      .attr('stroke-width', 2)
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .attr('opacity', 1);

    // Draw data points
    data.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const r = (d.value / 100) * radius;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;

      g.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 0)
        .attr('fill', categoryColors[d.category] || '#3B82F6')
        .attr('stroke', '#0A0F1A')
        .attr('stroke-width', 2)
        .transition()
        .delay(800 + i * 50)
        .duration(300)
        .attr('r', 5);
    });

  }, [data]);

  return (
    <div className="w-full flex items-center justify-center">
      <svg ref={svgRef} className="w-full max-w-[400px] h-auto" />
    </div>
  );
}
