import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GameResult, UserStats } from "../types/game";

// ─── Local Storage Keys ────────────────────────────────────────────────────────

const STATS_KEY = "tilematch_stats";
const HISTORY_KEY = "tilematch_history";

// ─── Local Persistence Helpers ─────────────────────────────────────────────────

function loadStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (raw) return JSON.parse(raw) as UserStats;
  } catch {
    // ignore
  }
  return { totalGames: 0, bestScore: 0, highestLevel: 0, totalScore: 0 };
}

function saveStats(stats: UserStats): void {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

function loadHistory(): GameResult[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) return JSON.parse(raw) as GameResult[];
  } catch {
    // ignore
  }
  return [];
}

function saveHistory(history: GameResult[]): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
}

// ─── Hooks ──────────────────────────────────────────────────────────────────────

export function useMyStats() {
  return useQuery<UserStats>({
    queryKey: ["stats"],
    queryFn: () => loadStats(),
    staleTime: 0,
  });
}

export function useMyHistory() {
  return useQuery<GameResult[]>({
    queryKey: ["history"],
    queryFn: () => loadHistory(),
    staleTime: 0,
  });
}

export function useSubmitScore() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { score: number; level: number }>({
    mutationFn: async ({ score, level }) => {
      // Persist locally
      const existing = loadStats();
      const updated: UserStats = {
        totalGames: existing.totalGames + 1,
        bestScore: Math.max(existing.bestScore, score),
        highestLevel: Math.max(existing.highestLevel, level),
        totalScore: existing.totalScore + score,
      };
      saveStats(updated);

      const history = loadHistory();
      history.unshift({ score, level, timestamp: Date.now() });
      saveHistory(history);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
}
