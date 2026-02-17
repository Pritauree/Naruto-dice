import {useEffect, useState} from "react";
import {Dice} from "@/components/Dice";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {motion} from "framer-motion";
import confetti from "canvas-confetti";
import {RefreshCw} from "lucide-react";
import {cn} from "@/lib/utils";

export default function GamePage() {
  const [playerName, setPlayerName] = useState("Ninja");
  const [position, setPosition] = useState<number>(1);
  const [isRolling, setIsRolling] = useState(false);
  const [rollValue, setRollValue] = useState<number | null>(null);
  const [lastSides, setLastSides] = useState<number>(9);
  const [customRoll, setCustomRoll] = useState<string>("");

  useEffect(() => {
    const savedName = localStorage.getItem("ninjaPlayerName");
    if (savedName) setPlayerName(savedName);
  }, []);

  const handleRoll = (sides: number) => {
    if (isRolling) return;
    setIsRolling(true);
    setLastSides(sides);
    
    setTimeout(() => {
      const roll = Math.floor(Math.random() * sides) + 1;
      setRollValue(roll);
      setIsRolling(false);
      
      if (sides === 9) {
        setPosition(roll);
        if (roll === 9) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FF6600", "#FFFFFF"]
          });
        }
      }
    }, 600);
  };

  const handleCustomRoll = () => {
    if (isRolling || !customRoll) return;
    const sides = parseInt(customRoll);
    if (isNaN(sides) || sides < 1) return;
    
    setCustomRoll("");
    handleRoll(sides);
  };

  const resetGame = () => {
    setPosition(1);
    setRollValue(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-4 md:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-primary">Ninja Training</h1>
          <p className="text-muted-foreground">Ninja: <span className="text-foreground font-bold">{playerName}</span></p>
        </div>
        <Button variant="outline" size="sm" onClick={resetGame}>
          <RefreshCw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>

      {/* Single Line Display */}
      <div className="bg-card p-6 rounded-3xl border-2 border-primary/20 shadow-xl overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-4 justify-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cell) => (
            <motion.div
              key={cell}
              className={cn(
                "w-16 h-16 rounded-xl flex items-center justify-center relative border-2 transition-all",
                position === cell 
                  ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(255,102,0,0.5)] scale-110 z-10" 
                  : "bg-background border-border"
              )}
            >
              <span className="text-xl font-black">{cell}</span>
              {position === cell && (
                <motion.div 
                  layoutId="player-marker"
                  className="absolute -top-2 -right-2 bg-white text-primary text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm"
                >
                  YOU
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        {lastSides === 9 && rollValue && !isRolling && (
          <p className="mt-4 text-center font-bold text-primary animate-bounce">
            Rolled a 9! You are now on square {position}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center gap-8 py-8">
        <Dice value={rollValue} rolling={isRolling} />

        <Button
            size="lg"
            className="h-16 text-xl bg-primary hover:bg-primary/90 shadow-lg w-full max-w-md"
            onClick={() => handleRoll(9)}
            disabled={isRolling}
        >
          Roll 9 (Move)
        </Button>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl justify-items-center">
          {[3, 10, 100].map(s => (
              <Button
                  key={s}
                  variant="outline"
                  className="h-16 text-lg w-full"
                  onClick={() => handleRoll(s)}
                  disabled={isRolling}
              >
                Roll {s}
              </Button>
          ))}
        </div>

        {/* Custom Roll Input */}
        <div className="flex gap-2 w-full max-w-md">
          <Input
            type="number"
            min="1"
            placeholder="Entrez un chiffre..."
            value={customRoll}
            onChange={(e) => setCustomRoll(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCustomRoll()}
            disabled={isRolling}
            className="h-12 text-lg"
          />
          <Button
            size="lg"
            variant="secondary"
            onClick={handleCustomRoll}
            disabled={isRolling || !customRoll}
            className="h-12 px-8"
          >
            Roll Custom
          </Button>
        </div>
      </div>
    </div>
  );
}
