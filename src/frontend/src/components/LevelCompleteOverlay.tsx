import { Button } from "@/components/ui/button";
import { ChevronRight, Home, Star, Trophy } from "lucide-react";
import { motion } from "motion/react";

interface LevelCompleteOverlayProps {
  level: number;
  score: number;
  matchScore: number;
  bonusScore: number;
  movesLeft: number;
  onNextLevel: () => void;
  onMainMenu: () => void;
}

export function LevelCompleteOverlay({
  level,
  score,
  matchScore,
  bonusScore,
  movesLeft,
  onNextLevel,
  onMainMenu,
}: LevelCompleteOverlayProps) {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      data-ocid="level_complete.dialog"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-sm mx-4 rounded-3xl border border-primary/40 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.18 0.04 240) 0%, oklch(0.12 0.03 240) 100%)",
          boxShadow:
            "0 0 40px oklch(0.66 0.19 210 / 0.4), 0 20px 60px rgba(0,0,0,0.6)",
        }}
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 40 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {/* Header glow strip */}
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.66 0.19 210), oklch(0.75 0.24 325))",
          }}
        />

        <div className="px-8 py-8 flex flex-col items-center gap-6">
          {/* Trophy icon */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", damping: 15 }}
            className="relative"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(0.22 0.06 90 / 0.6)",
                border: "2px solid oklch(0.78 0.16 90 / 0.6)",
                boxShadow: "0 0 24px oklch(0.78 0.16 90 / 0.5)",
              }}
            >
              <Trophy
                size={36}
                style={{ color: "oklch(0.82 0.17 90)" }}
                strokeWidth={1.5}
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p
              className="text-xs font-bold tracking-widest uppercase mb-1"
              style={{ color: "oklch(0.78 0.16 90)" }}
            >
              Level {level} Complete!
            </p>
            <h2
              className="text-5xl font-display font-bold text-glow-primary"
              style={{ color: "oklch(0.75 0.2 210)" }}
            >
              {score.toLocaleString()}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Total Score</p>
          </motion.div>

          {/* Score breakdown */}
          <motion.div
            className="w-full rounded-2xl p-4 space-y-2"
            style={{ background: "oklch(0.1 0.02 240 / 0.6)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Matches</span>
              <span
                className="font-bold text-sm"
                style={{ color: "oklch(0.75 0.2 210)" }}
              >
                +{matchScore.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm flex items-center gap-1">
                <Star size={12} className="inline" /> Move Bonus ×{movesLeft}
              </span>
              <span
                className="font-bold text-sm"
                style={{ color: "oklch(0.78 0.16 90)" }}
              >
                +{bonusScore.toLocaleString()}
              </span>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="w-full flex flex-col gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              type="button"
              onClick={onNextLevel}
              data-ocid="level_complete.next_level_button"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-display font-bold text-lg transition-smooth"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.66 0.19 210), oklch(0.58 0.22 210))",
                color: "oklch(0.1 0.02 240)",
                boxShadow: "0 0 20px oklch(0.66 0.19 210 / 0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 32px oklch(0.66 0.19 210 / 0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 20px oklch(0.66 0.19 210 / 0.5)";
              }}
            >
              Next Level <ChevronRight size={20} />
            </button>
            <button
              type="button"
              onClick={onMainMenu}
              data-ocid="level_complete.main_menu_button"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-body font-medium text-sm transition-smooth border"
              style={{
                background: "oklch(0.15 0.03 240 / 0.6)",
                color: "oklch(0.6 0 0)",
                borderColor: "oklch(0.25 0.03 240)",
              }}
            >
              <Home size={16} /> Main Menu
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
