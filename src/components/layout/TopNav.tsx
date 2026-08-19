"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const mainNav = [
  { href: "/", label: "Today", icon: "📋" },
  { href: "/prelims", label: "Prelims", icon: "🎯" },
  { href: "/mains", label: "Mains", icon: "✍️" },
];

const gsNav = [
  { href: "/gs-1", label: "GS-1" },
  { href: "/gs-2", label: "GS-2" },
  { href: "/gs-3", label: "GS-3" },
  { href: "/gs-4", label: "GS-4" },
];

const moreNav = [
  { href: "/sources", label: "Sources", icon: "📡" },
  { href: "/daily", label: "Daily", icon: "📅" },
  { href: "/saved", label: "Saved", icon: "⭐" },
];

export function TopNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 lg:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="text-lg font-bold text-brand">UPSC Desk</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 overflow-x-auto md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-brand text-white"
                  : "text-muted hover:bg-surface-hover hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <span className="mx-1 text-border">|</span>
          {gsNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-brand text-white"
                  : "text-muted hover:bg-surface-hover hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <span className="mx-1 text-border">|</span>
          {moreNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-brand text-white"
                  : "text-muted hover:bg-surface-hover hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 text-xs text-muted lg:flex">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Live feeds
          </span>
        </div>
      </div>
    </header>
  );
}
