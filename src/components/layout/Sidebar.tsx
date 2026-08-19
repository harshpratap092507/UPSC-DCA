"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sections = [
  {
    title: "Lens",
    items: [
      { href: "/", label: "Today", icon: "📋" },
      { href: "/prelims", label: "Prelims", icon: "🎯" },
      { href: "/mains", label: "Mains", icon: "✍️" },
    ],
  },
  {
    title: "GS Papers",
    items: [
      { href: "/gs-1", label: "GS-1", icon: "1" },
      { href: "/gs-2", label: "GS-2", icon: "2" },
      { href: "/gs-3", label: "GS-3", icon: "3" },
      { href: "/gs-4", label: "GS-4", icon: "4" },
    ],
  },
  {
    title: "Archive",
    items: [
      { href: "/sources", label: "Sources", icon: "📡" },
      { href: "/daily", label: "Daily", icon: "📅" },
      { href: "/saved", label: "Saved", icon: "⭐" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="hidden w-52 shrink-0 border-r border-border bg-surface lg:block xl:w-56">
      <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-4">
        {sections.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-brand/10 text-brand"
                        : "text-muted hover:bg-surface-hover hover:text-foreground"
                    )}
                  >
                    <span className="w-5 text-center text-xs">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
