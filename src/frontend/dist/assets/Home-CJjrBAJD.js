import { u as useNavigate, j as jsxRuntimeExports } from "./index-BB7ffKCn.js";
import { B as Badge, a as Button } from "./button-M7TNypg7.js";
import { c as createLucideIcon, u as useMyStats, L as Layout, m as motion, C as ChartNoAxesColumn } from "./useBackend-B6kBmKvg.js";
import { C as ChevronRight, Z as Zap } from "./zap-BcZg9528.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode);
const FEATURE_ITEMS = [
  {
    icon: Layers,
    label: "12+ Levels",
    desc: "Progressively harder grids — from 4×4 to 6×6",
    color: "text-primary"
  },
  {
    icon: Zap,
    label: "Move Limit",
    desc: "Race against the clock — every flip counts",
    color: "text-secondary"
  },
  {
    icon: ChartNoAxesColumn,
    label: "Persistent Stats",
    desc: "Your best score and highest level saved forever",
    color: "text-accent"
  }
];
const TILE_PREVIEW = [
  { id: "p1", color: "tile-cyan", pattern: "◇" },
  { id: "p2", color: "tile-amber", pattern: "△" },
  { id: "p3", color: "tile-magenta", pattern: "⬡" },
  { id: "p4", color: "tile-teal", pattern: "○" },
  { id: "p5", color: "tile-amber", pattern: "△" },
  { id: "p6", color: "tile-cyan", pattern: "◇" },
  { id: "p7", color: "tile-magenta", pattern: "⬡" },
  { id: "p8", color: "tile-teal", pattern: "○" }
];
function Home() {
  const navigate = useNavigate();
  const { data: stats } = useMyStats();
  const hasPlayed = stats && stats.totalGames > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative game-bg flex-1 flex flex-col items-center justify-center px-4 pt-12 pb-8 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-[320px] rounded-full opacity-25",
          style: {
            background: "radial-gradient(ellipse, oklch(0.66 0.19 210 / 0.6) 0%, transparent 70%)"
          },
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "pointer-events-none absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-15",
          style: {
            background: "radial-gradient(ellipse, oklch(0.75 0.24 325 / 0.6) 0%, transparent 70%)"
          },
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: "easeOut" },
          className: "text-center mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display uppercase tracking-[0.3em] text-primary text-sm font-semibold mb-2 text-glow-primary", children: "Pattern Matching Game" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-5xl sm:text-6xl text-foreground tracking-tight leading-none", children: [
              "Tile",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-glow-primary", children: "Match" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground text-base font-body max-w-xs mx-auto leading-relaxed", children: "Flip tiles, find pairs, beat the board. How far can you go?" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.45, delay: 0.15 },
          className: "grid grid-cols-4 gap-2 mb-8",
          "aria-hidden": true,
          children: TILE_PREVIEW.map((tile, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2 + i * 0.05 },
              className: `${tile.color} tile-base w-14 h-14 rounded-xl flex items-center justify-center text-2xl tile-icon-color font-bold select-none shadow-tile`,
              children: tile.pattern
            },
            tile.id
          ))
        }
      ),
      hasPlayed && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.35 },
          className: "flex items-center gap-4 mb-6",
          "data-ocid": "home.stats_recap",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "border-primary/40 text-primary font-display text-xs px-3 py-1",
                children: [
                  "BEST: ",
                  stats.bestScore.toLocaleString()
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "border-secondary/40 text-secondary font-display text-xs px-3 py-1",
                children: [
                  "LVL ",
                  stats.highestLevel
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.4 },
          className: "flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                onClick: () => navigate({ to: "/game" }),
                "data-ocid": "home.play_button",
                className: "w-full sm:flex-1 font-display font-bold text-base uppercase tracking-widest h-12 transition-smooth hover:scale-105 active:scale-95",
                children: [
                  hasPlayed ? "Play Again" : "Play Now",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 ml-1" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "lg",
                onClick: () => navigate({ to: "/stats" }),
                "data-ocid": "home.stats_button",
                className: "w-full sm:w-auto font-display text-sm uppercase tracking-wider h-12 border-border hover:border-primary/50 hover:bg-primary/10 transition-smooth",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-4 h-4 mr-2" }),
                  "Stats"
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-card border-t border-border py-10 px-4",
        "data-ocid": "home.features_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              className: "text-center text-xs font-display uppercase tracking-[0.2em] text-muted-foreground mb-6",
              children: "How It Works"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: FEATURE_ITEMS.map(({ icon: Icon, label, desc, color }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
              className: "bg-muted/30 border border-border rounded-2xl p-4 flex flex-col gap-2 hover:border-primary/30 transition-smooth",
              "data-ocid": `home.feature.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `${color} p-2 rounded-xl bg-background/60 w-fit`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body leading-snug", children: desc })
              ]
            },
            label
          )) })
        ] })
      }
    )
  ] });
}
export {
  Home as default
};
