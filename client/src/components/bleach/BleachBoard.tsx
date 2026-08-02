import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BleachBoardProps {
  cells: number[];
  position: number;
  blacklist: number[];
}

export function BleachBoard({ cells, position, blacklist }: BleachBoardProps) {
  return (
    <div className="bg-card p-6 rounded-3xl border-2 border-primary/20 shadow-xl">
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-4 justify-items-center">
        {cells.map((cell) => {
          const isBlacklisted = blacklist.includes(cell);
          return (
            <motion.div
              key={cell}
              className={cn(
                "w-16 h-16 rounded-xl flex items-center justify-center relative border-2 transition-all",
                position === cell
                  ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(220,38,38,0.5)] scale-110 z-10"
                  : "bg-background border-border",
                isBlacklisted && position !== cell && "opacity-40"
              )}
            >
              <span className={cn("text-xl font-black", isBlacklisted && "line-through")}>
                {cell}
              </span>
              {position === cell && (
                <motion.div
                  layoutId="player-marker"
                  className="absolute -top-2 -right-2 bg-white text-primary text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm"
                >
                  YOU
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
