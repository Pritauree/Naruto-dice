import { motion } from "framer-motion";

interface BleachEventBannerProps {
  rollValue: number;
  position: number;
  eventLabel: string;
}

export function BleachEventBanner({ rollValue, position, eventLabel }: BleachEventBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-primary/10 border-2 border-primary/30 rounded-2xl p-4 text-center"
    >
      <p className="text-lg font-bold text-primary">
        🎲 Vous avez fait {rollValue} ! Vous êtes sur la case {position}
      </p>
      <p className="text-xl font-black text-foreground mt-2">⚡ {eventLabel}</p>
    </motion.div>
  );
}
