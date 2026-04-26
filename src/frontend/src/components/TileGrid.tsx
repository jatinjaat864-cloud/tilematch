import { AnimatePresence, motion } from "motion/react";
import type { Tile, TilePattern } from "../types/game";

// ─── Pattern SVG Icons ────────────────────────────────────────────────────────

function PatternIcon({
  pattern,
  size = 36,
}: { pattern: TilePattern; size?: number }) {
  const s = size;
  switch (pattern) {
    case "diamond":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 40 40"
          fill="none"
          strokeWidth="2.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <title>diamond</title>
          <polygon points="20,4 36,20 20,36 4,20" />
        </svg>
      );
    case "triangle":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 40 40"
          fill="none"
          strokeWidth="2.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <title>triangle</title>
          <polygon points="20,5 36,35 4,35" />
        </svg>
      );
    case "hexagon":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 40 40"
          fill="none"
          strokeWidth="2.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <title>hexagon</title>
          <polygon points="20,4 34,12 34,28 20,36 6,28 6,12" />
        </svg>
      );
    case "circle":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 40 40"
          fill="none"
          strokeWidth="2.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <title>circle</title>
          <circle cx="20" cy="20" r="15" />
        </svg>
      );
    case "equals":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 40 40"
          fill="none"
          strokeWidth="3"
          stroke="currentColor"
          aria-hidden="true"
        >
          <title>equals</title>
          <line x1="8" y1="15" x2="32" y2="15" />
          <line x1="8" y1="25" x2="32" y2="25" />
        </svg>
      );
    case "star":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 40 40"
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <title>star</title>
          <polygon points="20,4 23.5,14.6 35,14.6 25.6,21.4 29.1,32 20,25.2 10.9,32 14.4,21.4 5,14.6 16.5,14.6" />
        </svg>
      );
    case "cross":
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 40 40"
          fill="none"
          strokeWidth="3"
          stroke="currentColor"
          aria-hidden="true"
        >
          <title>cross</title>
          <line x1="20" y1="6" x2="20" y2="34" />
          <line x1="6" y1="20" x2="34" y2="20" />
        </svg>
      );
    default:
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 40 40"
          fill="none"
          strokeWidth="2.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <title>wave</title>
          <path d="M4,20 C8,12 12,28 20,20 C28,12 32,28 36,20" />
          <rect x="12" y="8" width="16" height="24" rx="8" />
        </svg>
      );
  }
}

// ─── Single Tile ─────────────────────────────────────────────────────────────

interface TileProps {
  tile: Tile;
  tileSize: number;
  onFlip: (id: string) => void;
  seqIndex: number;
}

function TileCell({ tile, tileSize, onFlip, seqIndex }: TileProps) {
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
    return (
      <div
        key={`${tile.id}-placeholder`}
        style={{ width: tileSize, height: tileSize }}
        className="rounded-xl opacity-0 pointer-events-none"
      />
    );
  }

  return (
    <motion.button
      type="button"
      key={tile.id}
      data-ocid={`tile.item.${seqIndex + 1}`}
      className={`relative flex items-center justify-center rounded-xl cursor-pointer select-none ${colorClass} ${stateClass} transition-game focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
      style={{ width: tileSize, height: tileSize }}
      onClick={() => onFlip(tile.id)}
      disabled={!isHidden}
      aria-label={
        isRevealed
          ? `${tile.definition.pattern} ${tile.definition.color} tile`
          : "Hidden tile"
      }
      initial={{ scale: 0, opacity: 0 }}
      animate={
        isWrong
          ? { x: [0, -4, 4, -4, 4, 0], scale: 1, opacity: 1 }
          : { scale: 1, opacity: 1 }
      }
      whileTap={isHidden ? { scale: 0.88 } : {}}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: seqIndex * 0.02,
      }}
    >
      {isHidden && (
        <span className="text-muted-foreground/30 font-display font-bold text-lg select-none">
          ?
        </span>
      )}

      {isRevealed && (
        <motion.span
          className="tile-icon-color"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.18 }}
        >
          <PatternIcon pattern={tile.definition.pattern} size={iconSize} />
        </motion.span>
      )}
    </motion.button>
  );
}

// ─── TileGrid ─────────────────────────────────────────────────────────────────

interface TileGridProps {
  tiles: Tile[];
  gridSize: number;
  onFlip: (id: string) => void;
  disabled?: boolean;
}

export function TileGrid({ tiles, gridSize, onFlip, disabled }: TileGridProps) {
  const maxBoardPx = Math.min(
    360,
    typeof window !== "undefined" ? window.innerWidth - 32 : 360,
  );
  const gap = gridSize >= 6 ? 6 : 8;
  const tileSize = Math.floor((maxBoardPx - gap * (gridSize - 1)) / gridSize);

  const handleFlip = (id: string) => {
    if (!disabled) onFlip(id);
  };

  return (
    <AnimatePresence>
      <div
        data-ocid="tile.grid"
        className="flex flex-col items-center"
        style={{ gap }}
      >
        {Array.from({ length: gridSize }, (_, row) => (
          <div key={`row-${String(row)}`} className="flex" style={{ gap }}>
            {tiles
              .filter((t) => t.row === row)
              .sort((a, b) => a.col - b.col)
              .map((tile) => (
                <TileCell
                  key={tile.id}
                  tile={tile}
                  tileSize={tileSize}
                  onFlip={handleFlip}
                  seqIndex={tile.row * gridSize + tile.col}
                />
              ))}
          </div>
        ))}
      </div>
    </AnimatePresence>
  );
}
