import { useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { bleachTiers, defaultBleachTierId } from "@/data/bleachTiers";

const BLEACH_ACCENT = "#DC2626";

export function useBleachGame() {
  const [playerName, setPlayerName] = useState("Shinigami");
  const [tierId, setTierId] = useState(defaultBleachTierId);
  const [position, setPosition] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [rollValue, setRollValue] = useState<number | null>(null);
  const [lastSides, setLastSides] = useState<number>(0);
  const [customRoll, setCustomRoll] = useState("");
  const [blacklist, setBlacklist] = useState<number[]>([]);

  const [multiCount, setMultiCount] = useState("2");
  const [multiSides, setMultiSides] = useState("6");
  const [multiResults, setMultiResults] = useState<number[] | null>(null);
  const [isMultiRolling, setIsMultiRolling] = useState(false);

  const tier = useMemo(
    () => bleachTiers.find((t) => t.id === tierId) ?? bleachTiers[0],
    [tierId]
  );

  const cells = useMemo(
    () => Array.from({ length: tier.diceSides }, (_, i) => i + 1),
    [tier.diceSides]
  );

  const availableFaces = useMemo(
    () => cells.filter((n) => !blacklist.includes(n)),
    [cells, blacklist]
  );

  useEffect(() => {
    const savedName = localStorage.getItem("ninjaPlayerName");
    if (savedName) setPlayerName(savedName);
  }, []);

  // Chaque palier a sa propre taille de plateau : on repart de zéro en changeant de palier.
  useEffect(() => {
    setPosition(1);
    setRollValue(null);
    setLastSides(0);
    setBlacklist([]);
  }, [tierId]);

  const handleRoll = (sides: number) => {
    if (isRolling) return;
    const isMoveRoll = sides === tier.diceSides;
    if (isMoveRoll && availableFaces.length === 0) return;

    setIsRolling(true);
    setLastSides(sides);

    setTimeout(() => {
      const roll = isMoveRoll
        ? availableFaces[Math.floor(Math.random() * availableFaces.length)]
        : Math.floor(Math.random() * sides) + 1;

      setRollValue(roll);
      setIsRolling(false);

      if (isMoveRoll) {
        setPosition(roll);
        if (roll === tier.diceSides) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: [BLEACH_ACCENT, "#FFFFFF"],
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

  const handleMultiRoll = () => {
    if (isMultiRolling) return;
    const count = parseInt(multiCount);
    const sides = parseInt(multiSides);
    if (isNaN(count) || count < 1 || isNaN(sides) || sides < 1) return;

    setIsMultiRolling(true);
    setMultiResults(null);

    setTimeout(() => {
      const results = Array.from(
        { length: count },
        () => Math.floor(Math.random() * sides) + 1
      );
      setMultiResults(results);
      setIsMultiRolling(false);
    }, 600);
  };

  const toggleBlacklist = (n: number) => {
    setBlacklist((prev) =>
      prev.includes(n) ? prev.filter((v) => v !== n) : [...prev, n]
    );
  };

  const resetGame = () => {
    setPosition(1);
    setRollValue(null);
    setLastSides(0);
  };

  return {
    playerName,
    tierId,
    setTierId,
    tier,
    position,
    isRolling,
    rollValue,
    lastSides,
    customRoll,
    setCustomRoll,
    blacklist,
    cells,
    availableFaces,
    multiCount,
    setMultiCount,
    multiSides,
    setMultiSides,
    multiResults,
    isMultiRolling,
    handleRoll,
    handleCustomRoll,
    handleMultiRoll,
    toggleBlacklist,
    setBlacklist,
    resetGame,
  };
}

export { BLEACH_ACCENT };
