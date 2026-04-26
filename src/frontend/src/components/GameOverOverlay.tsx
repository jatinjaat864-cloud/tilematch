import { Home, RotateCcw, Skull } from "lucide-react";
import { motion } from "motion/react";

interface GameOverOverlayProps {
  level: number;
  score: number;
  bestScore: number;
  onRestart: () => void;
  onMainMenu: () => void;
}

export function GameOverOverlay({
  level,
  score,
  bestScore,
  onRestart,
  onMainMenu,
}: GameOverOverlayProps) {
  const isNewBest = score > 0 && score >= bestScore;

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      data-ocid="game_over.dialog"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-sm mx-4 rounded-3xl border overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.16 0.04 22) 0%, oklch(0.12 0.02 240) 100%)",
          borderColor: "oklch(0.65 0.19 22 / 0.4)",
          boxShadow:
            "0 0 40px oklch(0.65 0.19 22 / 0.3), 0 20px 60px rgba(0,0,0,0.6)",
        }}
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 40 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {/* Header glow strip — red/orange for game over */}
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.65 0.19 22), oklch(0.75 0.24 325))",
          }}
        />

        <div className="px-8 py-8 flex flex-col items-center gap-6">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: 20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", damping: 15 }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(0.18 0.06 22 / 0.6)",
                border: "2px solid oklch(0.65 0.19 22 / 0.6)",
                boxShadow: "0 0 24px oklch(0.65 0.19 22 / 0.4)",
              }}
            >
              <Skull
                size={36}
                style={{ color: "oklch(0.72 0.19 22)" }}
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
            <h2
              className="text-4xl font-display font-bold tracking-wider uppercase"
              style={{
                color: "oklch(0.72 0.19 22)",
                textShadow: "0 0 16px oklch(0.65 0.19 22 / 0.6)",
              }}
            >
              Game Over
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Out of moves on Level {level}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="w-full rounded-2xl p-4 space-y-3"
            style={{ background: "oklch(0.1 0.02 240 / 0.6)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Your Score</span>
              <span
                className="font-display font-bold text-xl"
                style={{ color: "oklch(0.75 0.2 210)" }}
              >
                {score.toLocaleString()}
              </span>
            </div>
            <div
              className="h-px"
              style={{ background: "oklch(0.22 0.03 240)" }}
            />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Best Score</span>
              <span
                className="font-bold text-sm"
                style={{
                  color: isNewBest ? "oklch(0.82 0.17 90)" : "oklch(0.5 0 0)",
                }}
              >
                {isNewBest ? "🏆 " : ""}
                {bestScore.toLocaleString()}
              </span>
            </div>
            {isNewBest && (
              <motion.p
                className="text-center text-xs font-bold tracking-widest uppercase"
                style={{ color: "oklch(0.78 0.16 90)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                ✨ New Best Score!
              </motion.p>
            )}
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
              onClick={onRestart}
              data-ocid="game_over.restart_button"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-display font-bold text-lg transition-smooth"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.19 22), oklch(0.58 0.22 22))",
                color: "oklch(0.98 0 0)",
                boxShadow: "0 0 20px oklch(0.65 0.19 22 / 0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 32px oklch(0.65 0.19 22 / 0.7)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 20px oklch(0.65 0.19 22 / 0.4)";
              }}
            >
              <RotateCcw size={18} /> Restart Level
            </button>
            <button
              type="button"
              onClick={onMainMenu}
              data-ocid="game_over.main_menu_button"
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
