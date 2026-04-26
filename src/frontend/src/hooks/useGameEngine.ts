import { useCallback, useRef, useState } from "react";
import type {
  GamePhase,
  GameState,
  Tile,
  TileColor,
  TileDefinition,
  TilePattern,
} from "../types/game";
import { getLevelConfig } from "../types/game";

// ─── Tile Palette ──────────────────────────────────────────────────────────────

const PATTERNS: TilePattern[] = [
  "diamond",
  "triangle",
  "hexagon",
  "circle",
  "equals",
  "star",
  "cross",
  "wave",
];

const COLORS: TileColor[] = ["cyan", "amber", "magenta", "teal"];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildTileDefinitions(count: number): TileDefinition[] {
  const defs: TileDefinition[] = [];
  for (let i = 0; i < count; i++) {
    defs.push({
      pattern: PATTERNS[i % PATTERNS.length],
      color: COLORS[Math.floor(i / PATTERNS.length) % COLORS.length],
    });
  }
  return defs;
}

function buildBoard(gridSize: number): Tile[] {
  const pairCount = (gridSize * gridSize) / 2;
  const defs = buildTileDefinitions(pairCount);
  const pairs = shuffleArray([...defs, ...defs]);

  return pairs.map((def, idx) => {
    const row = Math.floor(idx / gridSize);
    const col = idx % gridSize;
    return {
      id: `${row}-${col}`,
      pairId: `${def.pattern}-${def.color}`,
      definition: def,
      state: "hidden" as const,
      row,
      col,
    };
  });
}

// ─── Initial State ─────────────────────────────────────────────────────────────

function buildInitialState(level: number, cumulativeScore: number): GameState {
  const config = getLevelConfig(level);
  return {
    phase: "playing",
    level,
    score: cumulativeScore,
    movesLeft: config.moves,
    tiles: buildBoard(config.gridSize),
    flippedIds: [],
    config,
  };
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export interface UseGameEngineReturn {
  state: GameState;
  flipTile: (id: string) => void;
  startGame: (level?: number) => void;
  nextLevel: () => void;
  restartGame: () => void;
  setPaused: (paused: boolean) => void;
}

export function useGameEngine(): UseGameEngineReturn {
  const [state, setState] = useState<GameState>(() => buildInitialState(1, 0));

  // Phase lock during mismatch check delay
  const checkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startGame = useCallback((level = 1) => {
    if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    setState(buildInitialState(level, 0));
  }, []);

  const nextLevel = useCallback(() => {
    setState((prev) => {
      if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
      const bonus = prev.movesLeft * prev.config.bonusPerRemainingMove;
      return buildInitialState(prev.level + 1, prev.score + bonus);
    });
  }, []);

  const restartGame = useCallback(() => {
    if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    setState((prev) => buildInitialState(prev.level, 0));
  }, []);

  const setPaused = useCallback((paused: boolean) => {
    setState((prev) => {
      if (prev.phase === "playing" && paused)
        return { ...prev, phase: "paused" };
      if (prev.phase === "paused" && !paused)
        return { ...prev, phase: "playing" };
      return prev;
    });
  }, []);

  const flipTile = useCallback((id: string) => {
    setState((prev) => {
      // Only allow flips during playing phase
      if (prev.phase !== "playing") return prev;

      const tile = prev.tiles.find((t) => t.id === id);
      if (!tile || tile.state !== "hidden") return prev;
      if (prev.flippedIds.includes(id)) return prev;
      if (prev.flippedIds.length >= 2) return prev;

      const newFlipped = [...prev.flippedIds, id];
      const updatedTiles = prev.tiles.map((t) =>
        t.id === id ? { ...t, state: "flipped" as const } : t,
      );

      if (newFlipped.length < 2) {
        return { ...prev, tiles: updatedTiles, flippedIds: newFlipped };
      }

      // Two tiles flipped — check match
      const [id1, id2] = newFlipped;
      const t1 = updatedTiles.find((t) => t.id === id1)!;
      const t2 = updatedTiles.find((t) => t.id === id2)!;
      const isMatch = t1.pairId === t2.pairId;

      const movesLeft = prev.movesLeft - 1;

      if (isMatch) {
        const afterMatch = updatedTiles.map((t) =>
          t.id === id1 || t.id === id2
            ? { ...t, state: "matched" as const }
            : t,
        );
        const newScore = prev.score + prev.config.pointsPerMatch;
        const allMatched = afterMatch.every((t) => t.state === "matched");

        const phase: GamePhase = allMatched
          ? "levelComplete"
          : movesLeft <= 0
            ? "gameOver"
            : "playing";

        return {
          ...prev,
          tiles: afterMatch,
          flippedIds: [],
          score: newScore,
          movesLeft,
          phase,
        };
      }

      // Mismatch — mark as wrong, schedule reset
      const afterWrong = updatedTiles.map((t) =>
        t.id === id1 || t.id === id2 ? { ...t, state: "wrong" as const } : t,
      );

      const phase: GamePhase = movesLeft <= 0 ? "gameOver" : "checking";

      // Schedule flip-back
      checkTimeoutRef.current = setTimeout(() => {
        setState((s) => {
          if (s.phase !== "checking" && s.phase !== "gameOver") return s;
          const resetPhase: GamePhase =
            s.movesLeft <= 0 ? "gameOver" : "playing";
          return {
            ...s,
            phase: resetPhase,
            flippedIds: [],
            tiles: s.tiles.map((t) =>
              t.state === "wrong" ? { ...t, state: "hidden" as const } : t,
            ),
          };
        });
      }, 800);

      return {
        ...prev,
        tiles: afterWrong,
        flippedIds: newFlipped,
        movesLeft,
        phase,
      };
    });
  }, []);

  return { state, flipTile, startGame, nextLevel, restartGame, setPaused };
}
