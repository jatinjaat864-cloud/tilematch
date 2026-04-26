import { Pause, RotateCcw, Star, Zap } from "lucide-react";
import { motion } from "motion/react";
import type { GameState } from "../types/game";

// ─── Stat Pill ────────────────────────────────────────────────────────────────

function StatPill({
  label,
  value,
  highlight,
  icon,
  ocid,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
  icon: React.ReactNode;
  ocid: string;
}) {
  return (
    <div
      data-ocid={ocid}
      className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl bg-card/60 border border-border/40 min-w-[72px]"
    >
      <div
        className={`flex items-center gap-1 text-[10px] font-display font-bold uppercase tracking-widest ${highlight ? "text-secondary" : "text-muted-foreground"}`}
      >
        {icon}
        <span>{label}</span>
      </div>
      <span
        className={`font-display font-bold text-xl leading-tight tabular-nums ${highlight ? "text-secondary text-glow-secondary" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Moves Bar ────────────────────────────────────────────────────────────────

function MovesBar({
  movesLeft,
  maxMoves,
}: { movesLeft: number; maxMoves: number }) {
  const pct = maxMoves > 0 ? Math.max(0, movesLeft / maxMoves) : 0;
  const isLow = pct <= 0.25;
  const isMid = pct <= 0.5 && !isLow;

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full h-2 rounded-full bg-muted/50 overflow-hidden">
        <motion.div
          className={`h-full rounded-full transition-all duration-500 ${
            isLow
              ? "bg-destructive shadow-[0_0_8px_oklch(0.65_0.19_22/0.6)]"
              : isMid
                ? "bg-secondary"
                : "bg-primary"
          }`}
          style={{ width: `${pct * 100}%` }}
          animate={{ width: `${pct * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── GameHUD ──────────────────────────────────────────────────────────────────

interface GameHUDProps {
  state: GameState;
  bestScore: number;
  highestLevel: number;
  onPause: () => void;
  onRestart: () => void;
}

export function GameHUD({
  state,
  bestScore,
  highestLevel,
  onPause,
  onRestart,
}: GameHUDProps) {
  const { level, score, movesLeft, config } = state;

  return (
    <div
      data-ocid="game.hud"
      className="w-full max-w-[392px] flex flex-col gap-3 px-1"
    >
      {/* Level Banner */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          data-ocid="game.pause_button"
          onClick={onPause}
          aria-label="Pause game"
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-card/60 border border-border/40 text-muted-foreground hover:text-foreground hover:bg-card transition-game focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Pause size={16} />
        </button>

        <motion.div
          key={level}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
          className="text-center"
        >
          <h1 className="font-display font-bold text-xl tracking-widest text-primary text-glow-primary uppercase">
            Level {level}
          </h1>
        </motion.div>

        <button
          type="button"
          data-ocid="game.restart_button"
          onClick={onRestart}
          aria-label="Restart level"
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-card/60 border border-border/40 text-muted-foreground hover:text-foreground hover:bg-card transition-game focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Score + Moves Stats */}
      <div className="flex items-stretch justify-center gap-3">
        <StatPill
          label="Score"
          value={score.toLocaleString()}
          highlight
          icon={<Star size={10} />}
          ocid="game.score_display"
        />
        <StatPill
          label="Moves"
          value={movesLeft}
          icon={<Zap size={10} />}
          ocid="game.moves_display"
        />
      </div>

      {/* Moves progress bar */}
      <MovesBar movesLeft={movesLeft} maxMoves={config.moves} />

      {/* Personal bests footer row */}
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-body text-muted-foreground/70 uppercase tracking-wider">
          Best:{" "}
          <span className="text-muted-foreground font-bold">
            {bestScore.toLocaleString()}
          </span>
        </span>
        <span className="text-[11px] font-body text-muted-foreground/70 uppercase tracking-wider">
          Highest Lv:{" "}
          <span className="text-muted-foreground font-bold">
            {highestLevel}
          </span>
        </span>
      </div>
    </div>
  );
}
