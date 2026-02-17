import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface DiceProps {
  value: number | null;
  rolling: boolean;
  color?: string;
}

export function Dice({ value, rolling, color = "#FF6600" }: DiceProps) {
  const controls = useAnimation();

  useEffect(() => {
    if (rolling) {
      controls.start({
        rotate: [0, 360, 720, 1080],
        scale: [1, 1.2, 0.9, 1],
        transition: { duration: 0.5, ease: "easeInOut", repeat: Infinity },
      });
    } else {
      controls.stop();
      controls.start({ rotate: 0, scale: 1 });
    }
  }, [rolling, controls]);

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      <motion.div
        animate={controls}
        className="w-24 h-24 bg-white rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.3)] border-4 flex items-center justify-center text-5xl font-black relative overflow-hidden"
        style={{ borderColor: color, color: color }}
      >
        {/* Speed lines background inside dice */}
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_11px)]" />
        
        <span className="relative z-10 font-anime">
          {rolling ? "?" : value ?? "🎲"}
        </span>
      </motion.div>
      
      {/* Anime impact effect when landing */}
      {!rolling && value && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 border-4 rounded-full"
          style={{ borderColor: color }}
        />
      )}
    </div>
  );
}
