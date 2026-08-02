import { Dice } from "@/components/Dice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const QUICK_ROLLS = [3, 10, 100];

interface BleachRollPanelProps {
  rollValue: number | null;
  isRolling: boolean;
  diceSides: number;
  hasAvailableFaces: boolean;
  onRoll: (sides: number) => void;
  customRoll: string;
  onCustomRollChange: (value: string) => void;
  onCustomRollSubmit: () => void;
  accentColor: string;
}

export function BleachRollPanel({
  rollValue,
  isRolling,
  diceSides,
  hasAvailableFaces,
  onRoll,
  customRoll,
  onCustomRollChange,
  onCustomRollSubmit,
  accentColor,
}: BleachRollPanelProps) {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <Dice value={rollValue} rolling={isRolling} color={accentColor} />

      <div className="w-full max-w-md space-y-2">
        <Button
          size="lg"
          className="h-16 text-xl bg-primary hover:bg-primary/90 shadow-lg w-full"
          onClick={() => onRoll(diceSides)}
          disabled={isRolling || !hasAvailableFaces}
        >
          Roll {diceSides} (Déplacement)
        </Button>
        {!hasAvailableFaces && (
          <p className="text-sm text-center text-primary">
            Toutes les faces du dé principal sont dans la liste noire.
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl justify-items-center">
        {QUICK_ROLLS.map((s) => (
          <Button
            key={s}
            variant="outline"
            className="h-16 text-lg w-full"
            onClick={() => onRoll(s)}
            disabled={isRolling}
          >
            Roll {s}
          </Button>
        ))}
      </div>

      <div className="flex gap-2 w-full max-w-md">
        <Input
          type="number"
          min="1"
          placeholder="Entrez un chiffre..."
          value={customRoll}
          onChange={(e) => onCustomRollChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onCustomRollSubmit()}
          disabled={isRolling}
          className="h-12 text-lg"
        />
        <Button
          size="lg"
          variant="secondary"
          onClick={onCustomRollSubmit}
          disabled={isRolling || !customRoll}
          className="h-12 px-8"
        >
          Roll Custom
        </Button>
      </div>
    </div>
  );
}
