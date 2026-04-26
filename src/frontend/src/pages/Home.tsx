import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { BarChart2, ChevronRight, Layers, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Layout } from "../components/Layout";
import { useMyStats } from "../hooks/useBackend";

const FEATURE_ITEMS = [
  {
    icon: Layers,
    label: "12+ Levels",
    desc: "Progressively harder grids — from 4×4 to 6×6",
    color: "text-primary",
  },
  {
    icon: Zap,
    label: "Move Limit",
    desc: "Race against the clock — every flip counts",
    color: "text-secondary",
  },
  {
    icon: BarChart2,
    label: "Persistent Stats",
    desc: "Your best score and highest level saved forever",
    color: "text-accent",
  },
];

const TILE_PREVIEW = [
  { id: "p1", color: "tile-cyan", pattern: "◇" },
  { id: "p2", color: "tile-amber", pattern: "△" },
  { id: "p3", color: "tile-magenta", pattern: "⬡" },
  { id: "p4", color: "tile-teal", pattern: "○" },
  { id: "p5", color: "tile-amber", pattern: "△" },
  { id: "p6", color: "tile-cyan", pattern: "◇" },
  { id: "p7", color: "tile-magenta", pattern: "⬡" },
  { id: "p8", color: "tile-teal", pattern: "○" },
];

export default function Home() {
  const navigate = useNavigate();
  const { data: stats } = useMyStats();

  const hasPlayed = stats && stats.totalGames > 0;

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative game-bg flex-1 flex flex-col items-center justify-center px-4 pt-12 pb-8 overflow-hidden">
        {/* Ambient glow orbs */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-[320px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.66 0.19 210 / 0.6) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.75 0.24 325 / 0.6) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <p className="font-display uppercase tracking-[0.3em] text-primary text-sm font-semibold mb-2 text-glow-primary">
            Pattern Matching Game
          </p>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-foreground tracking-tight leading-none">
            Tile
            <span className="text-primary text-glow-primary">Match</span>
          </h1>
          <p className="mt-3 text-muted-foreground text-base font-body max-w-xs mx-auto leading-relaxed">
            Flip tiles, find pairs, beat the board. How far can you go?
          </p>
        </motion.div>

        {/* Tile preview grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="grid grid-cols-4 gap-2 mb-8"
          aria-hidden
        >
          {TILE_PREVIEW.map((tile, i) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className={`${tile.color} tile-base w-14 h-14 rounded-xl flex items-center justify-center text-2xl tile-icon-color font-bold select-none shadow-tile`}
            >
              {tile.pattern}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats recap (shown only after first game) */}
        {hasPlayed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex items-center gap-4 mb-6"
            data-ocid="home.stats_recap"
          >
            <Badge
              variant="outline"
              className="border-primary/40 text-primary font-display text-xs px-3 py-1"
            >
              BEST: {stats.bestScore.toLocaleString()}
            </Badge>
            <Badge
              variant="outline"
              className="border-secondary/40 text-secondary font-display text-xs px-3 py-1"
            >
              LVL {stats.highestLevel}
            </Badge>
          </motion.div>
        )}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs"
        >
          <Button
            size="lg"
            onClick={() => navigate({ to: "/game" })}
            data-ocid="home.play_button"
            className="w-full sm:flex-1 font-display font-bold text-base uppercase tracking-widest h-12 transition-smooth hover:scale-105 active:scale-95"
          >
            {hasPlayed ? "Play Again" : "Play Now"}
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate({ to: "/stats" })}
            data-ocid="home.stats_button"
            className="w-full sm:w-auto font-display text-sm uppercase tracking-wider h-12 border-border hover:border-primary/50 hover:bg-primary/10 transition-smooth"
          >
            <BarChart2 className="w-4 h-4 mr-2" />
            Stats
          </Button>
        </motion.div>
      </section>

      {/* ── Feature Cards ── */}
      <section
        className="bg-card border-t border-border py-10 px-4"
        data-ocid="home.features_section"
      >
        <div className="max-w-lg mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs font-display uppercase tracking-[0.2em] text-muted-foreground mb-6"
          >
            How It Works
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURE_ITEMS.map(({ icon: Icon, label, desc, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-muted/30 border border-border rounded-2xl p-4 flex flex-col gap-2 hover:border-primary/30 transition-smooth"
                data-ocid={`home.feature.item.${i + 1}`}
              >
                <div
                  className={`${color} p-2 rounded-xl bg-background/60 w-fit`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <p className="font-display font-semibold text-sm text-foreground">
                  {label}
                </p>
                <p className="text-xs text-muted-foreground font-body leading-snug">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
