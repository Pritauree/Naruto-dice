import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import { cn } from "@/lib/utils";

interface BleachBlacklistPanelProps {
  cells: number[];
  blacklist: number[];
  availableCount: number;
  onToggle: (n: number) => void;
  onClear: () => void;
}

export function BleachBlacklistPanel({
  cells,
  blacklist,
  availableCount,
  onToggle,
  onClear,
}: BleachBlacklistPanelProps) {
  return (
    <aside className="bg-card p-4 rounded-2xl border-2 border-primary/20 h-fit space-y-3">
      <div className="flex items-center gap-2">
        <Ban className="h-5 w-5 text-primary" />
        <h2 className="font-bold text-lg">Liste noire</h2>
      </div>
      <p className="text-sm text-muted-foreground">
        Cliquez sur une case pour l'exclure des tirages du dé principal.
      </p>
      <div className="grid grid-cols-4 gap-2">
        {cells.map((n) => {
          const isBlacklisted = blacklist.includes(n);
          return (
            <button
              key={n}
              type="button"
              onClick={() => onToggle(n)}
              className={cn(
                "h-10 rounded-lg border-2 font-bold text-sm transition-all",
                isBlacklisted
                  ? "bg-primary/20 border-primary text-primary line-through"
                  : "bg-background border-border hover:border-primary/50"
              )}
            >
              {n}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        {availableCount} / {cells.length} faces actives
      </p>
      {blacklist.length > 0 && (
        <Button variant="ghost" size="sm" className="w-full" onClick={onClear}>
          Réinitialiser la liste noire
        </Button>
      )}
    </aside>
  );
}
