import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BleachMultiRollerProps {
  count: string;
  onCountChange: (value: string) => void;
  sides: string;
  onSidesChange: (value: string) => void;
  results: number[] | null;
  isRolling: boolean;
  onRoll: () => void;
}

export function BleachMultiRoller({
  count,
  onCountChange,
  sides,
  onSidesChange,
  results,
  isRolling,
  onRoll,
}: BleachMultiRollerProps) {
  return (
    <div className="w-full max-w-md space-y-3 bg-card p-4 rounded-2xl border-2 border-secondary/30">
      <p className="text-sm font-bold text-secondary">Lancer plusieurs dés</p>
      <div className="flex gap-2 items-center">
        <Input
          type="number"
          min="1"
          value={count}
          onChange={(e) => onCountChange(e.target.value)}
          disabled={isRolling}
          className="h-12 text-lg"
          aria-label="Nombre de dés"
        />
        <span className="text-muted-foreground shrink-0">dé(s) de</span>
        <Input
          type="number"
          min="1"
          value={sides}
          onChange={(e) => onSidesChange(e.target.value)}
          disabled={isRolling}
          className="h-12 text-lg"
          aria-label="Nombre de faces"
        />
      </div>
      <Button variant="secondary" className="h-12 w-full" onClick={onRoll} disabled={isRolling}>
        Lancer
      </Button>

      {results && (
        <div className="space-y-2 pt-2">
          <div className="flex flex-wrap gap-2 justify-center">
            {results.map((r, i) => (
              <span
                key={i}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-background border-2 border-secondary/50 font-bold"
              >
                {r}
              </span>
            ))}
          </div>
          <p className="text-sm text-center text-muted-foreground">
            Total:{" "}
            <span className="text-foreground font-bold">
              {results.reduce((a, b) => a + b, 0)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
