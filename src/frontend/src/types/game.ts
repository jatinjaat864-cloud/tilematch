// ─── Tile Patterns ────────────────────────────────────────────────────────────

export type TilePattern =
  | "diamond"
  | "triangle"
  | "hexagon"
  | "circle"
  | "equals"
  | "star"
  | "cross"
  | "wave";

export type TileColor = "cyan" | "amber" | "magenta" | "teal";

export interface TileDefinition {
  pattern: TilePattern;
  color: TileColor;
}

// ─── Board Tile ───────────────────────────────────────────────────────────────

export type TileState = "hidden" | "flipped" | "matched" | "wrong";

export interface Tile {
  id: string; // unique instance id: `${row}-${col}`
  pairId: string; // shared id for paired tiles
  definition: TileDefinition;
  state: TileState;
  row: number;
  col: number;
}

// ─── Level Config ─────────────────────────────────────────────────────────────

export interface LevelConfig {
  level: number;
  gridSize: number; // e.g. 4 → 4×4
  moves: number;
  pointsPerMatch: number;
  bonusPerRemainingMove: number;
}

// ─── Game Phase ───────────────────────────────────────────────────────────────

export type GamePhase =
  | "idle"
  | "playing"
  | "checking" // brief lock while mismatch resets
  | "levelComplete"
  | "gameOver"
  | "paused";

// ─── Game State ───────────────────────────────────────────────────────────────

export interface GameState {
  phase: GamePhase;
  level: number;
  score: number;
  movesLeft: number;
  tiles: Tile[];
  flippedIds: string[]; // at most 2 at a time
  config: LevelConfig;
}

// ─── Persistent Stats ─────────────────────────────────────────────────────────

export interface UserStats {
  totalGames: number;
  bestScore: number;
  highestLevel: number;
  totalScore: number;
}

export interface GameResult {
  score: number;
  level: number;
  timestamp: number;
}

// ─── Level Configs ────────────────────────────────────────────────────────────

export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    level: 1,
    gridSize: 4,
    moves: 12,
    pointsPerMatch: 100,
    bonusPerRemainingMove: 10,
  },
  {
    level: 2,
    gridSize: 4,
    moves: 10,
    pointsPerMatch: 120,
    bonusPerRemainingMove: 15,
  },
  {
    level: 3,
    gridSize: 4,
    moves: 8,
    pointsPerMatch: 150,
    bonusPerRemainingMove: 20,
  },
  {
    level: 4,
    gridSize: 4,
    moves: 7,
    pointsPerMatch: 180,
    bonusPerRemainingMove: 25,
  },
  {
    level: 5,
    gridSize: 6,
    moves: 18,
    pointsPerMatch: 200,
    bonusPerRemainingMove: 30,
  },
  {
    level: 6,
    gridSize: 6,
    moves: 16,
    pointsPerMatch: 230,
    bonusPerRemainingMove: 35,
  },
  {
    level: 7,
    gridSize: 6,
    moves: 14,
    pointsPerMatch: 260,
    bonusPerRemainingMove: 40,
  },
  {
    level: 8,
    gridSize: 6,
    moves: 12,
    pointsPerMatch: 300,
    bonusPerRemainingMove: 50,
  },
  {
    level: 9,
    gridSize: 6,
    moves: 16,
    pointsPerMatch: 320,
    bonusPerRemainingMove: 60,
  },
  {
    level: 10,
    gridSize: 6,
    moves: 14,
    pointsPerMatch: 360,
    bonusPerRemainingMove: 70,
  },
  {
    level: 11,
    gridSize: 6,
    moves: 12,
    pointsPerMatch: 400,
    bonusPerRemainingMove: 80,
  },
  {
    level: 12,
    gridSize: 6,
    moves: 10,
    pointsPerMatch: 450,
    bonusPerRemainingMove: 100,
  },
];

export function getLevelConfig(level: number): LevelConfig {
  const idx = Math.min(level - 1, LEVEL_CONFIGS.length - 1);
  const base = LEVEL_CONFIGS[idx];
  if (level > LEVEL_CONFIGS.length) {
    // Beyond preset: extrapolate
    const extra = level - LEVEL_CONFIGS.length;
    return {
      ...base,
      level,
      moves: Math.max(8, base.moves - extra),
      pointsPerMatch: base.pointsPerMatch + extra * 50,
      bonusPerRemainingMove: base.bonusPerRemainingMove + extra * 10,
    };
  }
  return base;
}
