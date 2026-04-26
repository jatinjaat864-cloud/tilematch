import { r as reactExports, j as jsxRuntimeExports, u as useNavigate } from "./index-BB7ffKCn.js";
import { c as createLucideIcon, M as MotionConfigContext, i as isHTMLElement, a as useConstant, P as PresenceContext, b as usePresence, d as useIsomorphicLayoutEffect, e as LayoutGroupContext, m as motion, H as House, f as useSubmitScore, u as useMyStats, L as Layout } from "./useBackend-B6kBmKvg.js";
import { S as Star, T as Trophy } from "./trophy-Db2mF0ld.js";
import { Z as Zap, C as ChevronRight } from "./zap-BcZg9528.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { x: "14", y: "4", width: "4", height: "16", rx: "1", key: "zuxfzm" }],
  ["rect", { x: "6", y: "4", width: "4", height: "16", rx: "1", key: "1okwgv" }]
];
const Pause = createLucideIcon("pause", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12.5 17-.5-1-.5 1h1z", key: "3me087" }],
  [
    "path",
    {
      d: "M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z",
      key: "1o5pge"
    }
  ],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }]
];
const Skull = createLucideIcon("skull", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
function StatPill({
  label,
  value,
  highlight,
  icon,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl bg-card/60 border border-border/40 min-w-[72px]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center gap-1 text-[10px] font-display font-bold uppercase tracking-widest ${highlight ? "text-secondary" : "text-muted-foreground"}`,
            children: [
              icon,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `font-display font-bold text-xl leading-tight tabular-nums ${highlight ? "text-secondary text-glow-secondary" : "text-foreground"}`,
            children: value
          }
        )
      ]
    }
  );
}
function MovesBar({
  movesLeft,
  maxMoves
}) {
  const pct = maxMoves > 0 ? Math.max(0, movesLeft / maxMoves) : 0;
  const isLow = pct <= 0.25;
  const isMid = pct <= 0.5 && !isLow;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full flex flex-col gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 rounded-full bg-muted/50 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: `h-full rounded-full transition-all duration-500 ${isLow ? "bg-destructive shadow-[0_0_8px_oklch(0.65_0.19_22/0.6)]" : isMid ? "bg-secondary" : "bg-primary"}`,
      style: { width: `${pct * 100}%` },
      animate: { width: `${pct * 100}%` },
      transition: { duration: 0.4, ease: "easeOut" }
    }
  ) }) });
}
function GameHUD({
  state,
  bestScore,
  highestLevel,
  onPause,
  onRestart
}) {
  const { level, score, movesLeft, config } = state;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "game.hud",
      className: "w-full max-w-[392px] flex flex-col gap-3 px-1",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "game.pause_button",
              onClick: onPause,
              "aria-label": "Pause game",
              className: "flex items-center justify-center w-9 h-9 rounded-xl bg-card/60 border border-border/40 text-muted-foreground hover:text-foreground hover:bg-card transition-game focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { y: -12, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { duration: 0.4, type: "spring", stiffness: 300 },
              className: "text-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-xl tracking-widest text-primary text-glow-primary uppercase", children: [
                "Level ",
                level
              ] })
            },
            level
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "game.restart_button",
              onClick: onRestart,
              "aria-label": "Restart level",
              className: "flex items-center justify-center w-9 h-9 rounded-xl bg-card/60 border border-border/40 text-muted-foreground hover:text-foreground hover:bg-card transition-game focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-stretch justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatPill,
            {
              label: "Score",
              value: score.toLocaleString(),
              highlight: true,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 10 }),
              ocid: "game.score_display"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatPill,
            {
              label: "Moves",
              value: movesLeft,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 10 }),
              ocid: "game.moves_display"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MovesBar, { movesLeft, maxMoves: config.moves }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-body text-muted-foreground/70 uppercase tracking-wider", children: [
            "Best:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-bold", children: bestScore.toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-body text-muted-foreground/70 uppercase tracking-wider", children: [
            "Highest Lv:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-bold", children: highestLevel })
          ] })
        ] })
      ]
    }
  );
}
function GameOverOverlay({
  level,
  score,
  bestScore,
  onRestart,
  onMainMenu
}) {
  const isNewBest = score > 0 && score >= bestScore;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "absolute inset-0 z-50 flex items-center justify-center",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
      "data-ocid": "game_over.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/75 backdrop-blur-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 w-full max-w-sm mx-4 rounded-3xl border overflow-hidden",
            style: {
              background: "radial-gradient(ellipse at 50% 0%, oklch(0.16 0.04 22) 0%, oklch(0.12 0.02 240) 100%)",
              borderColor: "oklch(0.65 0.19 22 / 0.4)",
              boxShadow: "0 0 40px oklch(0.65 0.19 22 / 0.3), 0 20px 60px rgba(0,0,0,0.6)"
            },
            initial: { scale: 0.8, opacity: 0, y: 40 },
            animate: { scale: 1, opacity: 1, y: 0 },
            exit: { scale: 0.8, opacity: 0, y: 40 },
            transition: { type: "spring", damping: 20, stiffness: 300 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-1 w-full",
                  style: {
                    background: "linear-gradient(90deg, oklch(0.65 0.19 22), oklch(0.75 0.24 325))"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 py-8 flex flex-col items-center gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { scale: 0, rotate: 20 },
                    animate: { scale: 1, rotate: 0 },
                    transition: { delay: 0.2, type: "spring", damping: 15 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-20 h-20 rounded-full flex items-center justify-center",
                        style: {
                          background: "oklch(0.18 0.06 22 / 0.6)",
                          border: "2px solid oklch(0.65 0.19 22 / 0.6)",
                          boxShadow: "0 0 24px oklch(0.65 0.19 22 / 0.4)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Skull,
                          {
                            size: 36,
                            style: { color: "oklch(0.72 0.19 22)" },
                            strokeWidth: 1.5
                          }
                        )
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    className: "text-center",
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.3 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h2",
                        {
                          className: "text-4xl font-display font-bold tracking-wider uppercase",
                          style: {
                            color: "oklch(0.72 0.19 22)",
                            textShadow: "0 0 16px oklch(0.65 0.19 22 / 0.6)"
                          },
                          children: "Game Over"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
                        "Out of moves on Level ",
                        level
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    className: "w-full rounded-2xl p-4 space-y-3",
                    style: { background: "oklch(0.1 0.02 240 / 0.6)" },
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.4 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Your Score" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-display font-bold text-xl",
                            style: { color: "oklch(0.75 0.2 210)" },
                            children: score.toLocaleString()
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-px",
                          style: { background: "oklch(0.22 0.03 240)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Best Score" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "font-bold text-sm",
                            style: {
                              color: isNewBest ? "oklch(0.82 0.17 90)" : "oklch(0.5 0 0)"
                            },
                            children: [
                              isNewBest ? "🏆 " : "",
                              bestScore.toLocaleString()
                            ]
                          }
                        )
                      ] }),
                      isNewBest && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.p,
                        {
                          className: "text-center text-xs font-bold tracking-widest uppercase",
                          style: { color: "oklch(0.78 0.16 90)" },
                          initial: { opacity: 0, scale: 0.8 },
                          animate: { opacity: 1, scale: 1 },
                          transition: { delay: 0.6 },
                          children: "✨ New Best Score!"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    className: "w-full flex flex-col gap-3",
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.5 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: onRestart,
                          "data-ocid": "game_over.restart_button",
                          className: "w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-display font-bold text-lg transition-smooth",
                          style: {
                            background: "linear-gradient(135deg, oklch(0.65 0.19 22), oklch(0.58 0.22 22))",
                            color: "oklch(0.98 0 0)",
                            boxShadow: "0 0 20px oklch(0.65 0.19 22 / 0.4)"
                          },
                          onMouseEnter: (e) => {
                            e.currentTarget.style.boxShadow = "0 0 32px oklch(0.65 0.19 22 / 0.7)";
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.boxShadow = "0 0 20px oklch(0.65 0.19 22 / 0.4)";
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 18 }),
                            " Restart Level"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: onMainMenu,
                          "data-ocid": "game_over.main_menu_button",
                          className: "w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-body font-medium text-sm transition-smooth border",
                          style: {
                            background: "oklch(0.15 0.03 240 / 0.6)",
                            color: "oklch(0.6 0 0)",
                            borderColor: "oklch(0.25 0.03 240)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 16 }),
                            " Main Menu"
                          ]
                        }
                      )
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function LevelCompleteOverlay({
  level,
  score,
  matchScore,
  bonusScore,
  movesLeft,
  onNextLevel,
  onMainMenu
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "absolute inset-0 z-50 flex items-center justify-center",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
      "data-ocid": "level_complete.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/70 backdrop-blur-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 w-full max-w-sm mx-4 rounded-3xl border border-primary/40 overflow-hidden",
            style: {
              background: "radial-gradient(ellipse at 50% 0%, oklch(0.18 0.04 240) 0%, oklch(0.12 0.03 240) 100%)",
              boxShadow: "0 0 40px oklch(0.66 0.19 210 / 0.4), 0 20px 60px rgba(0,0,0,0.6)"
            },
            initial: { scale: 0.8, opacity: 0, y: 40 },
            animate: { scale: 1, opacity: 1, y: 0 },
            exit: { scale: 0.8, opacity: 0, y: 40 },
            transition: { type: "spring", damping: 20, stiffness: 300 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-1 w-full",
                  style: {
                    background: "linear-gradient(90deg, oklch(0.66 0.19 210), oklch(0.75 0.24 325))"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 py-8 flex flex-col items-center gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { scale: 0, rotate: -20 },
                    animate: { scale: 1, rotate: 0 },
                    transition: { delay: 0.2, type: "spring", damping: 15 },
                    className: "relative",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-20 h-20 rounded-full flex items-center justify-center",
                        style: {
                          background: "oklch(0.22 0.06 90 / 0.6)",
                          border: "2px solid oklch(0.78 0.16 90 / 0.6)",
                          boxShadow: "0 0 24px oklch(0.78 0.16 90 / 0.5)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Trophy,
                          {
                            size: 36,
                            style: { color: "oklch(0.82 0.17 90)" },
                            strokeWidth: 1.5
                          }
                        )
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    className: "text-center",
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.3 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          className: "text-xs font-bold tracking-widest uppercase mb-1",
                          style: { color: "oklch(0.78 0.16 90)" },
                          children: [
                            "Level ",
                            level,
                            " Complete!"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h2",
                        {
                          className: "text-5xl font-display font-bold text-glow-primary",
                          style: { color: "oklch(0.75 0.2 210)" },
                          children: score.toLocaleString()
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Total Score" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    className: "w-full rounded-2xl p-4 space-y-2",
                    style: { background: "oklch(0.1 0.02 240 / 0.6)" },
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.4 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Matches" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "font-bold text-sm",
                            style: { color: "oklch(0.75 0.2 210)" },
                            children: [
                              "+",
                              matchScore.toLocaleString()
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-sm flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 12, className: "inline" }),
                          " Move Bonus ×",
                          movesLeft
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "font-bold text-sm",
                            style: { color: "oklch(0.78 0.16 90)" },
                            children: [
                              "+",
                              bonusScore.toLocaleString()
                            ]
                          }
                        )
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    className: "w-full flex flex-col gap-3",
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.5 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: onNextLevel,
                          "data-ocid": "level_complete.next_level_button",
                          className: "w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-display font-bold text-lg transition-smooth",
                          style: {
                            background: "linear-gradient(135deg, oklch(0.66 0.19 210), oklch(0.58 0.22 210))",
                            color: "oklch(0.1 0.02 240)",
                            boxShadow: "0 0 20px oklch(0.66 0.19 210 / 0.5)"
                          },
                          onMouseEnter: (e) => {
                            e.currentTarget.style.boxShadow = "0 0 32px oklch(0.66 0.19 210 / 0.8)";
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.boxShadow = "0 0 20px oklch(0.66 0.19 210 / 0.5)";
                          },
                          children: [
                            "Next Level ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 20 })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: onMainMenu,
                          "data-ocid": "level_complete.main_menu_button",
                          className: "w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-body font-medium text-sm transition-smooth border",
                          style: {
                            background: "oklch(0.15 0.03 240 / 0.6)",
                            color: "oklch(0.6 0 0)",
                            borderColor: "oklch(0.25 0.03 240)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 16 }),
                            " Main Menu"
                          ]
                        }
                      )
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function PauseOverlay({
  level,
  score,
  movesLeft,
  onResume,
  onRestart,
  onMainMenu
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "absolute inset-0 z-50 flex items-center justify-center",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
      "data-ocid": "pause.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-md" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 w-full max-w-xs mx-4 rounded-3xl border overflow-hidden",
            style: {
              background: "radial-gradient(ellipse at 50% 0%, oklch(0.2 0.04 240) 0%, oklch(0.13 0.02 240) 100%)",
              borderColor: "oklch(0.66 0.19 210 / 0.3)",
              boxShadow: "0 0 32px oklch(0.66 0.19 210 / 0.2), 0 20px 60px rgba(0,0,0,0.6)"
            },
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.9, opacity: 0 },
            transition: { type: "spring", damping: 22, stiffness: 350 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-1 w-full",
                  style: {
                    background: "linear-gradient(90deg, oklch(0.75 0.24 325), oklch(0.66 0.19 210))"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-7 py-7 flex flex-col items-center gap-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { scale: 0 },
                    animate: { scale: 1 },
                    transition: { delay: 0.1, type: "spring", damping: 15 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-16 h-16 rounded-full flex items-center justify-center",
                        style: {
                          background: "oklch(0.2 0.04 210 / 0.6)",
                          border: "2px solid oklch(0.66 0.19 210 / 0.5)",
                          boxShadow: "0 0 18px oklch(0.66 0.19 210 / 0.3)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Pause,
                          {
                            size: 28,
                            style: { color: "oklch(0.75 0.2 210)" },
                            strokeWidth: 2
                          }
                        )
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    className: "text-center",
                    initial: { opacity: 0, y: 8 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.15 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h2",
                        {
                          className: "text-3xl font-display font-bold tracking-wider uppercase",
                          style: {
                            color: "oklch(0.75 0.2 210)",
                            textShadow: "0 0 12px oklch(0.66 0.19 210 / 0.5)"
                          },
                          children: "Paused"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mt-1 tracking-wider", children: [
                        "Level ",
                        level
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    className: "w-full rounded-2xl p-3 flex justify-around",
                    style: { background: "oklch(0.1 0.02 240 / 0.6)" },
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.2 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-xs font-bold tracking-widest uppercase",
                            style: { color: "oklch(0.78 0.16 90)" },
                            children: "Score"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-display font-bold text-lg",
                            style: { color: "oklch(0.75 0.2 210)" },
                            children: score.toLocaleString()
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-px",
                          style: { background: "oklch(0.22 0.03 240)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-xs font-bold tracking-widest uppercase",
                            style: { color: "oklch(0.78 0.16 90)" },
                            children: "Moves"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-display font-bold text-lg",
                            style: { color: "oklch(0.75 0.2 210)" },
                            children: movesLeft
                          }
                        )
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    className: "w-full flex flex-col gap-2.5",
                    initial: { opacity: 0, y: 8 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.25 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: onResume,
                          "data-ocid": "pause.resume_button",
                          className: "w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-display font-bold text-lg transition-smooth",
                          style: {
                            background: "linear-gradient(135deg, oklch(0.66 0.19 210), oklch(0.58 0.22 210))",
                            color: "oklch(0.1 0.02 240)",
                            boxShadow: "0 0 20px oklch(0.66 0.19 210 / 0.5)"
                          },
                          onMouseEnter: (e) => {
                            e.currentTarget.style.boxShadow = "0 0 32px oklch(0.66 0.19 210 / 0.8)";
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.boxShadow = "0 0 20px oklch(0.66 0.19 210 / 0.5)";
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 18, fill: "currentColor" }),
                            " Resume"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: onRestart,
                          "data-ocid": "pause.restart_button",
                          className: "w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-body font-medium text-sm transition-smooth border",
                          style: {
                            background: "oklch(0.15 0.03 240 / 0.5)",
                            color: "oklch(0.65 0.19 22)",
                            borderColor: "oklch(0.65 0.19 22 / 0.3)"
                          },
                          onMouseEnter: (e) => {
                            e.currentTarget.style.borderColor = "oklch(0.65 0.19 22 / 0.7)";
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.borderColor = "oklch(0.65 0.19 22 / 0.3)";
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { size: 15 }),
                            " Restart Level"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: onMainMenu,
                          "data-ocid": "pause.main_menu_button",
                          className: "w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-body font-medium text-sm transition-smooth border",
                          style: {
                            background: "oklch(0.13 0.02 240 / 0.4)",
                            color: "oklch(0.5 0 0)",
                            borderColor: "oklch(0.22 0.03 240)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 15 }),
                            " Main Menu"
                          ]
                        }
                      )
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function PatternIcon({
  pattern,
  size = 36
}) {
  const s = size;
  switch (pattern) {
    case "diamond":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          width: s,
          height: s,
          viewBox: "0 0 40 40",
          fill: "none",
          strokeWidth: "2.5",
          stroke: "currentColor",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "diamond" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "20,4 36,20 20,36 4,20" })
          ]
        }
      );
    case "triangle":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          width: s,
          height: s,
          viewBox: "0 0 40 40",
          fill: "none",
          strokeWidth: "2.5",
          stroke: "currentColor",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "triangle" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "20,5 36,35 4,35" })
          ]
        }
      );
    case "hexagon":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          width: s,
          height: s,
          viewBox: "0 0 40 40",
          fill: "none",
          strokeWidth: "2.5",
          stroke: "currentColor",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "hexagon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "20,4 34,12 34,28 20,36 6,28 6,12" })
          ]
        }
      );
    case "circle":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          width: s,
          height: s,
          viewBox: "0 0 40 40",
          fill: "none",
          strokeWidth: "2.5",
          stroke: "currentColor",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "circle" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "20", cy: "20", r: "15" })
          ]
        }
      );
    case "equals":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          width: s,
          height: s,
          viewBox: "0 0 40 40",
          fill: "none",
          strokeWidth: "3",
          stroke: "currentColor",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "equals" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8", y1: "15", x2: "32", y2: "15" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8", y1: "25", x2: "32", y2: "25" })
          ]
        }
      );
    case "star":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          width: s,
          height: s,
          viewBox: "0 0 40 40",
          fill: "none",
          strokeWidth: "2",
          stroke: "currentColor",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "star" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "20,4 23.5,14.6 35,14.6 25.6,21.4 29.1,32 20,25.2 10.9,32 14.4,21.4 5,14.6 16.5,14.6" })
          ]
        }
      );
    case "cross":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          width: s,
          height: s,
          viewBox: "0 0 40 40",
          fill: "none",
          strokeWidth: "3",
          stroke: "currentColor",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "cross" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "20", y1: "6", x2: "20", y2: "34" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "6", y1: "20", x2: "34", y2: "20" })
          ]
        }
      );
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          width: s,
          height: s,
          viewBox: "0 0 40 40",
          fill: "none",
          strokeWidth: "2.5",
          stroke: "currentColor",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "wave" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4,20 C8,12 12,28 20,20 C28,12 32,28 36,20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "12", y: "8", width: "16", height: "24", rx: "8" })
          ]
        }
      );
  }
}
function TileCell({ tile, tileSize, onFlip, seqIndex }) {
  const isHidden = tile.state === "hidden";
  const isFlipped = tile.state === "flipped";
  const isMatched = tile.state === "matched";
  const isWrong = tile.state === "wrong";
  const isRevealed = isFlipped || isWrong;
  const colorClass = `tile-${tile.definition.color}`;
  const iconSize = Math.floor(tileSize * 0.45);
  let stateClass = "tile-base";
  if (isFlipped) stateClass = "tile-flipped";
  else if (isMatched) stateClass = "tile-matched";
  else if (isWrong) stateClass = "tile-wrong";
  if (isMatched) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: { width: tileSize, height: tileSize },
        className: "rounded-xl opacity-0 pointer-events-none"
      },
      `${tile.id}-placeholder`
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      "data-ocid": `tile.item.${seqIndex + 1}`,
      className: `relative flex items-center justify-center rounded-xl cursor-pointer select-none ${colorClass} ${stateClass} transition-game focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`,
      style: { width: tileSize, height: tileSize },
      onClick: () => onFlip(tile.id),
      disabled: !isHidden,
      "aria-label": isRevealed ? `${tile.definition.pattern} ${tile.definition.color} tile` : "Hidden tile",
      initial: { scale: 0, opacity: 0 },
      animate: isWrong ? { x: [0, -4, 4, -4, 4, 0], scale: 1, opacity: 1 } : { scale: 1, opacity: 1 },
      whileTap: isHidden ? { scale: 0.88 } : {},
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: seqIndex * 0.02
      },
      children: [
        isHidden && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/30 font-display font-bold text-lg select-none", children: "?" }),
        isRevealed && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            className: "tile-icon-color",
            initial: { scale: 0.5, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { duration: 0.18 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(PatternIcon, { pattern: tile.definition.pattern, size: iconSize })
          }
        )
      ]
    },
    tile.id
  );
}
function TileGrid({ tiles, gridSize, onFlip, disabled }) {
  const maxBoardPx = Math.min(
    360,
    typeof window !== "undefined" ? window.innerWidth - 32 : 360
  );
  const gap = gridSize >= 6 ? 6 : 8;
  const tileSize = Math.floor((maxBoardPx - gap * (gridSize - 1)) / gridSize);
  const handleFlip = (id) => {
    if (!disabled) onFlip(id);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": "tile.grid",
      className: "flex flex-col items-center",
      style: { gap },
      children: Array.from({ length: gridSize }, (_, row) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", style: { gap }, children: tiles.filter((t) => t.row === row).sort((a, b) => a.col - b.col).map((tile) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        TileCell,
        {
          tile,
          tileSize,
          onFlip: handleFlip,
          seqIndex: tile.row * gridSize + tile.col
        },
        tile.id
      )) }, `row-${String(row)}`))
    }
  ) });
}
const LEVEL_CONFIGS = [
  {
    level: 1,
    gridSize: 4,
    moves: 12,
    pointsPerMatch: 100,
    bonusPerRemainingMove: 10
  },
  {
    level: 2,
    gridSize: 4,
    moves: 10,
    pointsPerMatch: 120,
    bonusPerRemainingMove: 15
  },
  {
    level: 3,
    gridSize: 4,
    moves: 8,
    pointsPerMatch: 150,
    bonusPerRemainingMove: 20
  },
  {
    level: 4,
    gridSize: 4,
    moves: 7,
    pointsPerMatch: 180,
    bonusPerRemainingMove: 25
  },
  {
    level: 5,
    gridSize: 6,
    moves: 18,
    pointsPerMatch: 200,
    bonusPerRemainingMove: 30
  },
  {
    level: 6,
    gridSize: 6,
    moves: 16,
    pointsPerMatch: 230,
    bonusPerRemainingMove: 35
  },
  {
    level: 7,
    gridSize: 6,
    moves: 14,
    pointsPerMatch: 260,
    bonusPerRemainingMove: 40
  },
  {
    level: 8,
    gridSize: 6,
    moves: 12,
    pointsPerMatch: 300,
    bonusPerRemainingMove: 50
  },
  {
    level: 9,
    gridSize: 6,
    moves: 16,
    pointsPerMatch: 320,
    bonusPerRemainingMove: 60
  },
  {
    level: 10,
    gridSize: 6,
    moves: 14,
    pointsPerMatch: 360,
    bonusPerRemainingMove: 70
  },
  {
    level: 11,
    gridSize: 6,
    moves: 12,
    pointsPerMatch: 400,
    bonusPerRemainingMove: 80
  },
  {
    level: 12,
    gridSize: 6,
    moves: 10,
    pointsPerMatch: 450,
    bonusPerRemainingMove: 100
  }
];
function getLevelConfig(level) {
  const idx = Math.min(level - 1, LEVEL_CONFIGS.length - 1);
  const base = LEVEL_CONFIGS[idx];
  if (level > LEVEL_CONFIGS.length) {
    const extra = level - LEVEL_CONFIGS.length;
    return {
      ...base,
      level,
      moves: Math.max(8, base.moves - extra),
      pointsPerMatch: base.pointsPerMatch + extra * 50,
      bonusPerRemainingMove: base.bonusPerRemainingMove + extra * 10
    };
  }
  return base;
}
const PATTERNS = [
  "diamond",
  "triangle",
  "hexagon",
  "circle",
  "equals",
  "star",
  "cross",
  "wave"
];
const COLORS = ["cyan", "amber", "magenta", "teal"];
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function buildTileDefinitions(count) {
  const defs = [];
  for (let i = 0; i < count; i++) {
    defs.push({
      pattern: PATTERNS[i % PATTERNS.length],
      color: COLORS[Math.floor(i / PATTERNS.length) % COLORS.length]
    });
  }
  return defs;
}
function buildBoard(gridSize) {
  const pairCount = gridSize * gridSize / 2;
  const defs = buildTileDefinitions(pairCount);
  const pairs = shuffleArray([...defs, ...defs]);
  return pairs.map((def, idx) => {
    const row = Math.floor(idx / gridSize);
    const col = idx % gridSize;
    return {
      id: `${row}-${col}`,
      pairId: `${def.pattern}-${def.color}`,
      definition: def,
      state: "hidden",
      row,
      col
    };
  });
}
function buildInitialState(level, cumulativeScore) {
  const config = getLevelConfig(level);
  return {
    phase: "playing",
    level,
    score: cumulativeScore,
    movesLeft: config.moves,
    tiles: buildBoard(config.gridSize),
    flippedIds: [],
    config
  };
}
function useGameEngine() {
  const [state, setState] = reactExports.useState(() => buildInitialState(1, 0));
  const checkTimeoutRef = reactExports.useRef(null);
  const startGame = reactExports.useCallback((level = 1) => {
    if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    setState(buildInitialState(level, 0));
  }, []);
  const nextLevel = reactExports.useCallback(() => {
    setState((prev) => {
      if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
      const bonus = prev.movesLeft * prev.config.bonusPerRemainingMove;
      return buildInitialState(prev.level + 1, prev.score + bonus);
    });
  }, []);
  const restartGame = reactExports.useCallback(() => {
    if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    setState((prev) => buildInitialState(prev.level, 0));
  }, []);
  const setPaused = reactExports.useCallback((paused) => {
    setState((prev) => {
      if (prev.phase === "playing" && paused)
        return { ...prev, phase: "paused" };
      if (prev.phase === "paused" && !paused)
        return { ...prev, phase: "playing" };
      return prev;
    });
  }, []);
  const flipTile = reactExports.useCallback((id) => {
    setState((prev) => {
      if (prev.phase !== "playing") return prev;
      const tile = prev.tiles.find((t) => t.id === id);
      if (!tile || tile.state !== "hidden") return prev;
      if (prev.flippedIds.includes(id)) return prev;
      if (prev.flippedIds.length >= 2) return prev;
      const newFlipped = [...prev.flippedIds, id];
      const updatedTiles = prev.tiles.map(
        (t) => t.id === id ? { ...t, state: "flipped" } : t
      );
      if (newFlipped.length < 2) {
        return { ...prev, tiles: updatedTiles, flippedIds: newFlipped };
      }
      const [id1, id2] = newFlipped;
      const t1 = updatedTiles.find((t) => t.id === id1);
      const t2 = updatedTiles.find((t) => t.id === id2);
      const isMatch = t1.pairId === t2.pairId;
      const movesLeft = prev.movesLeft - 1;
      if (isMatch) {
        const afterMatch = updatedTiles.map(
          (t) => t.id === id1 || t.id === id2 ? { ...t, state: "matched" } : t
        );
        const newScore = prev.score + prev.config.pointsPerMatch;
        const allMatched = afterMatch.every((t) => t.state === "matched");
        const phase2 = allMatched ? "levelComplete" : movesLeft <= 0 ? "gameOver" : "playing";
        return {
          ...prev,
          tiles: afterMatch,
          flippedIds: [],
          score: newScore,
          movesLeft,
          phase: phase2
        };
      }
      const afterWrong = updatedTiles.map(
        (t) => t.id === id1 || t.id === id2 ? { ...t, state: "wrong" } : t
      );
      const phase = movesLeft <= 0 ? "gameOver" : "checking";
      checkTimeoutRef.current = setTimeout(() => {
        setState((s) => {
          if (s.phase !== "checking" && s.phase !== "gameOver") return s;
          const resetPhase = s.movesLeft <= 0 ? "gameOver" : "playing";
          return {
            ...s,
            phase: resetPhase,
            flippedIds: [],
            tiles: s.tiles.map(
              (t) => t.state === "wrong" ? { ...t, state: "hidden" } : t
            )
          };
        });
      }, 800);
      return {
        ...prev,
        tiles: afterWrong,
        flippedIds: newFlipped,
        movesLeft,
        phase
      };
    });
  }, []);
  return { state, flipTile, startGame, nextLevel, restartGame, setPaused };
}
function Game() {
  const navigate = useNavigate();
  const { state, flipTile, nextLevel, restartGame, setPaused } = useGameEngine();
  const submitScore = useSubmitScore();
  const { data: stats } = useMyStats();
  const hasSubmittedRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if ((state.phase === "gameOver" || state.phase === "levelComplete") && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      submitScore.mutate({ score: state.score, level: state.level });
    }
    if (state.phase === "playing" || state.phase === "idle") {
      hasSubmittedRef.current = false;
    }
  }, [state.phase, state.score, state.level, submitScore]);
  reactExports.useEffect(() => {
    const handleKey = (e) => {
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
  const pairsCount = state.config.gridSize * state.config.gridSize / 2;
  const matchScore = pairsCount * state.config.pointsPerMatch;
  const bonusScore = state.movesLeft * state.config.bonusPerRemainingMove;
  const bestScore = (stats == null ? void 0 : stats.bestScore) ?? 0;
  const highestLevel = (stats == null ? void 0 : stats.highestLevel) ?? 0;
  const boardDisabled = state.phase !== "playing" && state.phase !== "checking";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { bare: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 flex flex-col items-center justify-between game-bg relative overflow-hidden py-4 px-4 min-h-0",
      "data-ocid": "game.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none overflow-hidden",
            "aria-hidden": "true",
            children: [...Array(8)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute rounded-full opacity-10",
                style: {
                  width: `${i % 3 * 40 + 20}px`,
                  height: `${i % 3 * 40 + 20}px`,
                  left: `${i * 13 % 90}%`,
                  top: `${i * 17 % 80}%`,
                  background: i % 3 === 0 ? "oklch(0.66 0.19 210)" : i % 3 === 1 ? "oklch(0.75 0.24 325)" : "oklch(0.78 0.16 90)",
                  filter: "blur(30px)"
                }
              },
              `particle-${String(i)}`
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-full flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          GameHUD,
          {
            state,
            bestScore,
            highestLevel,
            onPause: () => setPaused(true),
            onRestart: handleRestart
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative z-10 flex-1 flex items-center justify-center py-4",
            "data-ocid": "game.board",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              TileGrid,
              {
                tiles: state.tiles,
                gridSize: state.config.gridSize,
                onFlip: flipTile,
                disabled: boardDisabled
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
          state.phase === "paused" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            PauseOverlay,
            {
              level: state.level,
              score: state.score,
              movesLeft: state.movesLeft,
              onResume: () => setPaused(false),
              onRestart: handleRestart,
              onMainMenu: handleMainMenu
            },
            "pause"
          ),
          state.phase === "levelComplete" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            LevelCompleteOverlay,
            {
              level: state.level,
              score: state.score,
              matchScore,
              bonusScore,
              movesLeft: state.movesLeft,
              onNextLevel: handleNextLevel,
              onMainMenu: handleMainMenu
            },
            "level-complete"
          ),
          state.phase === "gameOver" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            GameOverOverlay,
            {
              level: state.level,
              score: state.score,
              bestScore,
              onRestart: handleRestart,
              onMainMenu: handleMainMenu
            },
            "game-over"
          )
        ] })
      ]
    }
  ) });
}
export {
  Game as default
};
