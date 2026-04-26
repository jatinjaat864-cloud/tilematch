import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";
import { GameHUD } from "../components/GameHUD";
import { GameOverOverlay } from "../components/GameOverOverlay";
import { Layout } from "../components/Layout";
import { LevelCompleteOverlay } from "../components/LevelCompleteOverlay";
import { PauseOverlay } from "../components/PauseOverlay";
import { TileGrid } from "../components/TileGrid";
import { useMyStats, useSubmitScore } from "../hooks/useBackend";
import { useGameEngine } from "../hooks/useGameEngine";

// ─── Game Page ────────────────────────────────────────────────────────────────

export default function Game() {
  const navigate = useNavigate();
  const { state, flipTile, nextLevel, restartGame, setPaused } =
    useGameEngine();
  const submitScore = useSubmitScore();
  const { data: stats } = useMyStats();

  const hasSubmittedRef = useRef(false);

  // Submit score when game ends
  useEffect(() => {
    if (
      (state.phase === "gameOver" || state.phase === "levelComplete") &&
      !hasSubmittedRef.current
    ) {
      hasSubmittedRef.current = true;
      submitScore.mutate({ score: state.score, level: state.level });
    }
    if (state.phase === "playing" || state.phase === "idle") {
      hasSubmittedRef.current = false;
    }
  }, [state.phase, state.score, state.level, submitScore]);

  // Keyboard: Escape to pause/resume
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (state.phase === "playing") setPaused(true);
        else if (state.phase === "paused") setPaused(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [state.phase, setPaused]);

  const handleMainMenu = () => {
    navigate({ to: "/" });
  };

  const handleNextLevel = () => {
    hasSubmittedRef.current = false;
    nextLevel();
  };

  const handleRestart = () => {
    hasSubmittedRef.current = false;
    restartGame();
  };

  // Level complete score breakdown
  const pairsCount = (state.config.gridSize * state.config.gridSize) / 2;
  const matchScore = pairsCount * state.config.pointsPerMatch;
  const bonusScore = state.movesLeft * state.config.bonusPerRemainingMove;

  const bestScore = stats?.bestScore ?? 0;
  const highestLevel = stats?.highestLevel ?? 0;

  const boardDisabled = state.phase !== "playing" && state.phase !== "checking";

  return (
    <Layout bare>
      <div
        className="flex-1 flex flex-col items-center justify-between game-bg relative overflow-hidden py-4 px-4 min-h-0"
        data-ocid="game.page"
      >
        {/* Ambient particles background */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={`particle-${String(i)}`}
              className="absolute rounded-full opacity-10"
              style={{
                width: `${(i % 3) * 40 + 20}px`,
                height: `${(i % 3) * 40 + 20}px`,
                left: `${(i * 13) % 90}%`,
                top: `${(i * 17) % 80}%`,
                background:
                  i % 3 === 0
                    ? "oklch(0.66 0.19 210)"
                    : i % 3 === 1
                      ? "oklch(0.75 0.24 325)"
                      : "oklch(0.78 0.16 90)",
                filter: "blur(30px)",
              }}
            />
          ))}
        </div>

        {/* HUD */}
        <div className="relative z-10 w-full flex justify-center">
          <GameHUD
            state={state}
            bestScore={bestScore}
            highestLevel={highestLevel}
            onPause={() => setPaused(true)}
            onRestart={handleRestart}
          />
        </div>

        {/* Tile Grid */}
        <div
          className="relative z-10 flex-1 flex items-center justify-center py-4"
          data-ocid="game.board"
        >
          <TileGrid
            tiles={state.tiles}
            gridSize={state.config.gridSize}
            onFlip={flipTile}
            disabled={boardDisabled}
          />
        </div>

        {/* Overlays */}
        <AnimatePresence>
          {state.phase === "paused" && (
            <PauseOverlay
              key="pause"
              level={state.level}
              score={state.score}
              movesLeft={state.movesLeft}
              onResume={() => setPaused(false)}
              onRestart={handleRestart}
              onMainMenu={handleMainMenu}
            />
          )}
          {state.phase === "levelComplete" && (
            <LevelCompleteOverlay
              key="level-complete"
              level={state.level}
              score={state.score}
              matchScore={matchScore}
              bonusScore={bonusScore}
              movesLeft={state.movesLeft}
              onNextLevel={handleNextLevel}
              onMainMenu={handleMainMenu}
            />
          )}
          {state.phase === "gameOver" && (
            <GameOverOverlay
              key="game-over"
              level={state.level}
              score={state.score}
              bestScore={bestScore}
              onRestart={handleRestart}
              onMainMenu={handleMainMenu}
            />
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
