"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Today", icon: "📋" },
  { href: "/sources", label: "Sources", icon: "📡" },
  { href: "/gs-2", label: "GS", icon: "📚" },
  { href: "/saved", label: "Saved", icon: "⭐" },
];

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/gs-2") return pathname.startsWith("/gs-");
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface/95 backdrop-blur-md md:hidden">
      <div className="flex h-16 items-stretch">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors",
              isActive(item.href)
                ? "text-brand"
                : "text-muted hover:text-foreground"
            )}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
