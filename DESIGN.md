# Design Brief — Pattern Matching Puzzle Game

## Tone & Aesthetic
Bold, playful, energetic arcade meets modern minimalism. Gameplay-first focus with clean UI chrome. Vibrant but intentional color choices. Snappy interactions.

## Differentiation
Game board occupies full focus; UI overlay (score, moves, level) sits atop dark navy background with bright accent tiles. Zero decorative overhead — 100% focus on pattern matching mechanics.

## Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary (Cyan) | `0.62 0.18 210` | `0.66 0.19 210` | Primary actions, tile highlights, game board accents |
| Secondary (Amber) | `0.74 0.15 90` | `0.78 0.16 90` | Score display, stat counters, info elements |
| Accent (Magenta) | `0.70 0.22 325` | `0.75 0.24 325` | Level complete, reward popups, match effects |
| Background | `0.97 0 0` | `0.12 0 0` | Page background; dark mode is deep navy for board |
| Card | `0.99 0 0` | `0.16 0 0` | UI panels, score displays, stat cards |
| Foreground | `0.18 0 0` | `0.94 0 0` | Body text, UI labels |
| Border | `0.88 0 0` | `0.24 0 0` | Dividers, tile edges |

## Typography

| Layer | Font | Weight | Usage |
|-------|------|--------|-------|
| Display | General Sans | 700 | Level title, score header, prominent labels |
| Body | DM Sans | 400–500 | UI labels, stat text, instructions |
| Mono | System | 400 | Score numerics if needed |

## Elevation & Depth
- **Board tiles**: `shadow-tile` (4px, 0.15 opacity) — subtle lift above board
- **Active/matching tiles**: `shadow-match` (20px glow, cyan highlight) — game feedback
- **Stat cards**: Minimal shadow, emphasis via border or background color
- **Popups**: `shadow-md` equivalent (8–12px depth)

## Structural Zones

| Zone | Background | Treatment | Purpose |
|------|------------|-----------|---------|
| Header | `card` | Border bottom, center title | Level info, game title |
| Game Board | `card` (dark mode: darker overlay) | Rounded 1.5rem corners, tile grid | Core 4×4 or 3×3 tile grid |
| Score Display | `muted` or inline | Compact row, secondary color for numbers | Active score, moves remaining |
| Stats Sidebar/Panel | `card` | Right/bottom panel, stat rows | Best score, highest level, total games |
| Buttons | `primary` / `secondary` | Full width or paired, rounded 1.5rem | Play, retry, menu actions |

## Spacing & Rhythm
- **Tile gap**: 8px between tiles (tight for fast interaction)
- **Card padding**: 1.5rem (generous for touch targets)
- **Type scale**: 12px (label), 14px (body), 16px (info), 20px (title), 28px (display)
- **Density**: Game board compact; UI overlays generous

## Component Patterns
- **Tiles**: Square or rectangular, `rounded-lg` (12px), hover/active state via `ring` and `shadow-match`
- **Buttons**: Full rounded, `primary` or `secondary`, no uppercase
- **Score counter**: Large display text in `secondary`, supporting label in `muted-foreground`
- **Level badge**: Centered, display font, `primary` background
- **Stat rows**: Flex row, label + value, top border separator

## Motion & Interaction
- **Tile reveal**: `animate-tile-pop` (300ms, scale 0.8→1)
- **Tile flip**: `animate-tile-flip` (600ms, rotateY)
- **Match feedback**: `animate-tile-match` (400ms, scale 1→1.15→0)
- **Button hover**: `transition-game` (200ms, scale/opacity shift)
- **Level transition**: Fade in from dark, `transition-smooth` (300ms)

## Constraints
- Game board must support 3×3 and 4×4 grids (6 and 8 levels)
- Tiles must be touch-friendly (min 48px×48px)
- Score display always visible (sticky header or overlay)
- Dark mode is primary; light mode available
- No animations should block interaction (z-index and pointer-events managed)

## Signature Detail
Cyan-to-magenta gradient hint on level-up popup — subtle visual flourish that reinforces the primary/accent color pair without dominating the interface.
