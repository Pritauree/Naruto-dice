import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Swords } from "lucide-react";
import { bleachTiers, type BleachTier } from "@/data/bleachTiers";

interface BleachHeaderProps {
  playerName: string;
  tierId: string;
  onTierChange: (tierId: string) => void;
  isRolling: boolean;
  onReset: () => void;
}

export function BleachHeader({
  playerName,
  tierId,
  onTierChange,
  isRolling,
  onReset,
}: BleachHeaderProps) {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <Button variant="ghost" size="sm" className="mb-2 -ml-2" onClick={() => setLocation("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
        <h1 className="text-4xl font-black text-primary flex items-center gap-2">
          <Swords className="h-8 w-8" /> Bleach
        </h1>
        <p className="text-muted-foreground">
          Shinigami: <span className="text-foreground font-bold">{playerName}</span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={tierId}
          onChange={(e) => onTierChange(e.target.value)}
          disabled={isRolling}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {bleachTiers.map((t: BleachTier) => (
            <option key={t.id} value={t.id}>
              {t.label} ({t.diceSides} cases)
            </option>
          ))}
        </select>
        <Button variant="outline" size="sm" onClick={onReset}>
          <RefreshCw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>
    </div>
  );
}
