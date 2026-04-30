import { mitreTechniques } from "../../data/xdr";

interface MitreTagProps {
  id: string;
}

export default function MitreTag({ id }: MitreTagProps) {
  const technique = mitreTechniques.find(t => t.id === id);
  
  return (
    <div className="flex items-center space-x-1 px-2 py-1 bg-xdr-info/20 text-xdr-info text-xs font-mono rounded border border-xdr-info/30">
      <span>{id}</span>
      {technique && (
        <span className="text-xdr-muted font-normal lowercase tracking-tight max-w-[120px] truncate">
          {technique.technique}
        </span>
      )}
    </div>
  );
}

