import { j as jsxRuntimeExports, u as useNavigate } from "./index-BB7ffKCn.js";
import { c as cn, a as Button, B as Badge } from "./button-M7TNypg7.js";
import { c as createLucideIcon, u as useMyStats, g as useMyHistory, L as Layout, m as motion, G as Gamepad2 } from "./useBackend-B6kBmKvg.js";
import { T as Trophy, S as Star } from "./trophy-Db2mF0ld.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
const ACCENT_MAP = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    icon: "text-primary",
    glow: "text-glow-primary"
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary/30",
    icon: "text-secondary",
    glow: "text-glow-secondary"
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent/30",
    icon: "text-accent",
    glow: "text-glow-accent"
  }
};
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent = "primary",
  ocid,
  delay = 0
}) {
  const a = ACCENT_MAP[accent];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.4 },
      "data-ocid": ocid,
      className: `relative rounded-2xl border ${a.border} ${a.bg} p-5 flex flex-col gap-3 overflow-hidden`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${a.icon} p-2 rounded-xl bg-background/40 w-fit`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `font-display font-bold text-3xl text-foreground ${a.glow} leading-none`,
              children: typeof value === "number" ? value.toLocaleString() : value
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground mt-1 uppercase tracking-widest", children: label }),
          sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-body text-xs ${a.icon} mt-1 opacity-80`, children: sub })
        ] })
      ]
    }
  );
}
function HistoryRow({ result, rank }) {
  const date = new Date(result.timestamp);
  const dateStr = date.toLocaleDateString(void 0, {
    month: "short",
    day: "numeric"
  });
  const timeStr = date.toLocaleTimeString(void 0, {
    hour: "2-digit",
    minute: "2-digit"
  });
  const medalColor = rank === 1 ? "text-secondary border-secondary/60" : rank === 2 ? "text-muted-foreground border-muted-foreground/40" : rank === 3 ? "text-accent border-accent/50" : "text-muted-foreground/50 border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -12 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: 0.05 * rank, duration: 0.3 },
      "data-ocid": `stats.history.item.${rank}`,
      className: "flex items-center gap-3 py-3 border-b border-border/50 last:border-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `font-display font-bold text-xs w-6 h-6 text-center border rounded-full flex items-center justify-center shrink-0 ${medalColor}`,
            children: rank
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-semibold text-sm text-foreground", children: [
            result.score.toLocaleString(),
            " pts"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground truncate", children: [
            dateStr,
            " · ",
            timeStr
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "border-primary/30 text-primary font-display text-xs shrink-0",
            children: [
              "LVL ",
              result.level
            ]
          }
        )
      ]
    }
  );
}
function Stats() {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useMyStats();
  const { data: history, isLoading: histLoading } = useMyHistory();
  const avgScore = stats && stats.totalGames > 0 ? Math.round(stats.totalScore / stats.totalGames) : 0;
  const hasData = stats && stats.totalGames > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "game-bg flex-1 px-4 py-8", "data-ocid": "stats.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        className: "text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-secondary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display uppercase tracking-[0.25em] text-xs text-muted-foreground", children: "Player Stats" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl text-foreground text-glow-primary", children: "Your Record" })
        ]
      }
    ),
    statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 gap-3",
        "data-ocid": "stats.loading_state",
        children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-2xl" }, i))
      }
    ) : !hasData ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        "data-ocid": "stats.empty_state",
        className: "rounded-2xl border border-border bg-card p-10 flex flex-col items-center gap-4 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-7 h-7 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground", children: "No games yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mt-1", children: "Play your first game to start tracking stats" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => navigate({ to: "/game" }),
              "data-ocid": "stats.play_first_button",
              className: "font-display uppercase tracking-wider transition-smooth hover:scale-105 active:scale-95",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "w-4 h-4 mr-2" }),
                "Play Now"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", "data-ocid": "stats.stat_grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: Trophy,
          label: "Best Score",
          value: stats.bestScore,
          accent: "primary",
          ocid: "stats.best_score_card",
          delay: 0.1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: Award,
          label: "Highest Level",
          value: stats.highestLevel,
          sub: "of 12+ levels",
          accent: "secondary",
          ocid: "stats.highest_level_card",
          delay: 0.15
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: Target,
          label: "Total Games",
          value: stats.totalGames,
          accent: "accent",
          ocid: "stats.total_games_card",
          delay: 0.2
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: TrendingUp,
          label: "Avg Score",
          value: avgScore,
          sub: "per game",
          accent: "primary",
          ocid: "stats.avg_score_card",
          delay: 0.25
        }
      )
    ] }),
    hasData && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.35 },
        className: "bg-card border border-border rounded-2xl overflow-hidden",
        "data-ocid": "stats.history_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground uppercase tracking-widest", children: "Recent Games" }),
            history && history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "font-body text-xs text-muted-foreground border-border",
                children: [
                  history.length,
                  " ",
                  history.length === 1 ? "game" : "games"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5", children: histLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "py-4 space-y-3",
              "data-ocid": "stats.history_loading_state",
              children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded-lg" }, i))
            }
          ) : history && history.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "stats.history_list", children: history.slice(0, 10).map((result, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            HistoryRow,
            {
              result,
              rank: i + 1
            },
            result.timestamp
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "py-6 text-center text-sm text-muted-foreground font-body",
              "data-ocid": "stats.history_empty_state",
              children: "No game history yet"
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.5 },
        className: "flex gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => navigate({ to: "/game" }),
              className: "flex-1 font-display uppercase tracking-wider h-12 text-sm transition-smooth hover:scale-105 active:scale-95",
              "data-ocid": "stats.play_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "w-4 h-4 mr-2" }),
                "Play Now"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => navigate({ to: "/" }),
              className: "font-display uppercase tracking-wider h-12 text-sm border-border hover:border-primary/50 hover:bg-primary/10 transition-smooth",
              "data-ocid": "stats.home_button",
              children: "Home"
            }
          )
        ]
      }
    )
  ] }) }) });
}
export {
  Stats as default
};
