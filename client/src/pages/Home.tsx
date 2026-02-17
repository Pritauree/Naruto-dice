import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();
  const [playerName, setPlayerName] = useState("");

  const handleStart = () => {
    if (!playerName.trim()) return;
    // Store player name in localStorage for the game page to pick up
    localStorage.setItem("ninjaPlayerName", playerName.trim());
    setLocation("/game/local");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="relative z-10 max-w-lg w-full text-center space-y-8">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-4"
        >
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,102,0,0.5)]">
            NINJA<br />
            <span className="text-primary">BOARD</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            Enter your name and prepare for the ninja exam!
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-4"
        >
          <Input
            placeholder="Enter Ninja Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="h-14 text-xl text-center rounded-2xl bg-card border-2 border-primary/20 focus:border-primary transition-all"
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
          />
          
          <Button 
            size="lg" 
            className="w-full h-16 text-xl rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-lg transition-all group"
            onClick={handleStart}
            disabled={!playerName.trim()}
          >
            Start Training
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
