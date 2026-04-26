import { Home, Pause, Play, RotateCcw } from "lucide-react";
import { motion } from "motion/react";

interface PauseOverlayProps {
  level: number;
  score: number;
  movesLeft: number;
  onResume: () => void;
  onRestart: () => void;
  onMainMenu: () => void;
}

export function PauseOverlay({
  level,
  score,
  movesLeft,
  onResume,
  onRestart,
  onMainMenu,
}: PauseOverlayProps) {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      data-ocid="pause.dialog"
    >
      {/* Frosted backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-xs mx-4 rounded-3xl border overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.2 0.04 240) 0%, oklch(0.13 0.02 240) 100%)",
          borderColor: "oklch(0.66 0.19 210 / 0.3)",
          boxShadow:
            "0 0 32px oklch(0.66 0.19 210 / 0.2), 0 20px 60px rgba(0,0,0,0.6)",
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 350 }}
      >
        {/* Accent strip */}
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.75 0.24 325), oklch(0.66 0.19 210))",
          }}
        />

        <div className="px-7 py-7 flex flex-col items-center gap-5">
          {/* Pause icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", damping: 15 }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(0.2 0.04 210 / 0.6)",
                border: "2px solid oklch(0.66 0.19 210 / 0.5)",
                boxShadow: "0 0 18px oklch(0.66 0.19 210 / 0.3)",
              }}
            >
              <Pause
                size={28}
                style={{ color: "oklch(0.75 0.2 210)" }}
                strokeWidth={2}
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h2
              className="text-3xl font-display font-bold tracking-wider uppercase"
              style={{
                color: "oklch(0.75 0.2 210)",
                textShadow: "0 0 12px oklch(0.66 0.19 210 / 0.5)",
              }}
            >
              Paused
            </h2>
            <p className="text-muted-foreground text-xs mt-1 tracking-wider">
              Level {level}
            </p>
          </motion.div>

          {/* Current stats snapshot */}
          <motion.div
            className="w-full rounded-2xl p-3 flex justify-around"
            style={{ background: "oklch(0.1 0.02 240 / 0.6)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col items-center gap-0.5">
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "oklch(0.78 0.16 90)" }}
              >
                Score
              </span>
              <span
                className="font-display font-bold text-lg"
                style={{ color: "oklch(0.75 0.2 210)" }}
              >
                {score.toLocaleString()}
              </span>
            </div>
            <div
              className="w-px"
              style={{ background: "oklch(0.22 0.03 240)" }}
            />
            <div className="flex flex-col items-center gap-0.5">
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "oklch(0.78 0.16 90)" }}
              >
                Moves
              </span>
              <span
                className="font-display font-bold text-lg"
                style={{ color: "oklch(0.75 0.2 210)" }}
              >
                {movesLeft}
              </span>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="w-full flex flex-col gap-2.5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            {/* Primary: Resume */}
            <button
              type="button"
              onClick={onResume}
              data-ocid="pause.resume_button"
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
              <Play size={18} fill="currentColor" /> Resume
            </button>

            {/* Secondary: Restart */}
            <button
              type="button"
              onClick={onRestart}
              data-ocid="pause.restart_button"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-body font-medium text-sm transition-smooth border"
              style={{
                background: "oklch(0.15 0.03 240 / 0.5)",
                color: "oklch(0.65 0.19 22)",
                borderColor: "oklch(0.65 0.19 22 / 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.65 0.19 22 / 0.7)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.65 0.19 22 / 0.3)";
              }}
            >
              <RotateCcw size={15} /> Restart Level
            </button>

            {/* Tertiary: Main Menu */}
            <button
              type="button"
              onClick={onMainMenu}
              data-ocid="pause.main_menu_button"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-body font-medium text-sm transition-smooth border"
              style={{
                background: "oklch(0.13 0.02 240 / 0.4)",
                color: "oklch(0.5 0 0)",
                borderColor: "oklch(0.22 0.03 240)",
              }}
            >
              <Home size={15} /> Main Menu
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
