import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  Award,
  Gamepad2,
  Star,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";
import { Layout } from "../components/Layout";
import { useMyHistory, useMyStats } from "../hooks/useBackend";
import type { GameResult } from "../types/game";

// ── Stat card ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  accent?: "primary" | "secondary" | "accent";
  ocid: string;
  delay?: number;
}

const ACCENT_MAP = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    icon: "text-primary",
    glow: "text-glow-primary",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary/30",
    icon: "text-secondary",
    glow: "text-glow-secondary",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent/30",
    icon: "text-accent",
    glow: "text-glow-accent",
  },
};

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent = "primary",
  ocid,
  delay = 0,
}: StatCardProps) {
  const a = ACCENT_MAP[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      data-ocid={ocid}
      className={`relative rounded-2xl border ${a.border} ${a.bg} p-5 flex flex-col gap-3 overflow-hidden`}
    >
      <div className={`${a.icon} p-2 rounded-xl bg-background/40 w-fit`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p
          className={`font-display font-bold text-3xl text-foreground ${a.glow} leading-none`}
        >
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        <p className="font-body text-xs text-muted-foreground mt-1 uppercase tracking-widest">
          {label}
        </p>
        {sub && (
          <p className={`font-body text-xs ${a.icon} mt-1 opacity-80`}>{sub}</p>
        )}
      </div>
    </motion.div>
  );
}

// ── History row ───────────────────────────────────────────────────────────────

function HistoryRow({ result, rank }: { result: GameResult; rank: number }) {
  const date = new Date(result.timestamp);
  const dateStr = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const timeStr = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const medalColor =
    rank === 1
      ? "text-secondary border-secondary/60"
      : rank === 2
        ? "text-muted-foreground border-muted-foreground/40"
        : rank === 3
          ? "text-accent border-accent/50"
          : "text-muted-foreground/50 border-border";

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 * rank, duration: 0.3 }}
      data-ocid={`stats.history.item.${rank}`}
      className="flex items-center gap-3 py-3 border-b border-border/50 last:border-0"
    >
      <span
        className={`font-display font-bold text-xs w-6 h-6 text-center border rounded-full flex items-center justify-center shrink-0 ${medalColor}`}
      >
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-sm text-foreground">
          {result.score.toLocaleString()} pts
        </p>
        <p className="font-body text-xs text-muted-foreground truncate">
          {dateStr} · {timeStr}
        </p>
      </div>
      <Badge
        variant="outline"
        className="border-primary/30 text-primary font-display text-xs shrink-0"
      >
        LVL {result.level}
      </Badge>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Stats() {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useMyStats();
  const { data: history, isLoading: histLoading } = useMyHistory();

  const avgScore =
    stats && stats.totalGames > 0
      ? Math.round(stats.totalScore / stats.totalGames)
      : 0;

  const hasData = stats && stats.totalGames > 0;

  return (
    <Layout>
      <div className="game-bg flex-1 px-4 py-8" data-ocid="stats.page">
        <div className="max-w-lg mx-auto space-y-8">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-secondary" />
              <p className="font-display uppercase tracking-[0.25em] text-xs text-muted-foreground">
                Player Stats
              </p>
            </div>
            <h1 className="font-display font-bold text-4xl text-foreground text-glow-primary">
              Your Record
            </h1>
          </motion.div>

          {/* ── Stat Grid ── */}
          {statsLoading ? (
            <div
              className="grid grid-cols-2 gap-3"
              data-ocid="stats.loading_state"
            >
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-28 rounded-2xl" />
              ))}
            </div>
          ) : !hasData ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              data-ocid="stats.empty_state"
              className="rounded-2xl border border-border bg-card p-10 flex flex-col items-center gap-4 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Star className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="font-display font-bold text-lg text-foreground">
                  No games yet
                </p>
                <p className="text-sm text-muted-foreground font-body mt-1">
                  Play your first game to start tracking stats
                </p>
              </div>
              <Button
                onClick={() => navigate({ to: "/game" })}
                data-ocid="stats.play_first_button"
                className="font-display uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95"
              >
                <Gamepad2 className="w-4 h-4 mr-2" />
                Play Now
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 gap-3" data-ocid="stats.stat_grid">
              <StatCard
                icon={Trophy}
                label="Best Score"
                value={stats.bestScore}
                accent="primary"
                ocid="stats.best_score_card"
                delay={0.1}
              />
              <StatCard
                icon={Award}
                label="Highest Level"
                value={stats.highestLevel}
                sub="of 12+ levels"
                accent="secondary"
                ocid="stats.highest_level_card"
                delay={0.15}
              />
              <StatCard
                icon={Target}
                label="Total Games"
                value={stats.totalGames}
                accent="accent"
                ocid="stats.total_games_card"
                delay={0.2}
              />
              <StatCard
                icon={TrendingUp}
                label="Avg Score"
                value={avgScore}
                sub="per game"
                accent="primary"
                ocid="stats.avg_score_card"
                delay={0.25}
              />
            </div>
          )}

          {/* ── Recent Games ── */}
          {hasData && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-card border border-border rounded-2xl overflow-hidden"
              data-ocid="stats.history_panel"
            >
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <p className="font-display font-semibold text-sm text-foreground uppercase tracking-widest">
                  Recent Games
                </p>
                {history && history.length > 0 && (
                  <Badge
                    variant="outline"
                    className="font-body text-xs text-muted-foreground border-border"
                  >
                    {history.length} {history.length === 1 ? "game" : "games"}
                  </Badge>
                )}
              </div>
              <div className="px-5">
                {histLoading ? (
                  <div
                    className="py-4 space-y-3"
                    data-ocid="stats.history_loading_state"
                  >
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-10 rounded-lg" />
                    ))}
                  </div>
                ) : history && history.length > 0 ? (
                  <div data-ocid="stats.history_list">
                    {history.slice(0, 10).map((result, i) => (
                      <HistoryRow
                        key={result.timestamp}
                        result={result}
                        rank={i + 1}
                      />
                    ))}
                  </div>
                ) : (
                  <p
                    className="py-6 text-center text-sm text-muted-foreground font-body"
                    data-ocid="stats.history_empty_state"
                  >
                    No game history yet
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* ── CTAs ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3"
          >
            <Button
              onClick={() => navigate({ to: "/game" })}
              className="flex-1 font-display uppercase tracking-wider h-12 text-sm transition-smooth hover:scale-105 active:scale-95"
              data-ocid="stats.play_button"
            >
              <Gamepad2 className="w-4 h-4 mr-2" />
              Play Now
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/" })}
              className="font-display uppercase tracking-wider h-12 text-sm border-border hover:border-primary/50 hover:bg-primary/10 transition-smooth"
              data-ocid="stats.home_button"
            >
              Home
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
