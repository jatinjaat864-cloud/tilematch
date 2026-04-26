import { Link, useLocation } from "@tanstack/react-router";
import { BarChart2, Gamepad2, Home } from "lucide-react";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  /** Hide nav chrome (used on the game screen for immersive play) */
  bare?: boolean;
}

const NAV_LINKS = [
  { to: "/", label: "Home", icon: Home, ocid: "nav.home_link" },
  { to: "/game", label: "Play", icon: Gamepad2, ocid: "nav.play_link" },
  { to: "/stats", label: "Stats", icon: BarChart2, ocid: "nav.stats_link" },
] as const;

export function Layout({ children, bare = false }: LayoutProps) {
  const { pathname } = useLocation();

  if (bare) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-xs sticky top-0 z-40">
        <div className="mx-auto max-w-lg px-4 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="font-display font-bold text-lg text-primary tracking-widest uppercase transition-game hover:opacity-80"
            data-ocid="header.logo_link"
          >
            TileMatch
          </Link>
          <nav className="flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, icon: Icon, ocid }) => {
              const active = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  data-ocid={ocid}
                  className={[
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-body transition-game",
                    active
                      ? "bg-primary/15 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  ].join(" ")}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Footer */}
      <footer className="bg-muted/40 border-t border-border py-4">
        <p className="text-center text-xs text-muted-foreground font-body">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline transition-game"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
