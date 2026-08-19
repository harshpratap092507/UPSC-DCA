import Link from "next/link";
import { Source } from "@/types";
import { SOURCE_GROUPS } from "@/data/sources";
import { cn } from "@/lib/utils";

interface SourceCardProps {
  source: Source;
  newCount?: number;
}

export function SourceCard({ source, newCount = 0 }: SourceCardProps) {
  const group = SOURCE_GROUPS[source.group];

  return (
    <Link
      href={`/sources/${source.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-surface p-4 transition-all hover:border-brand/30 hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between">
        <span className="text-2xl">{source.icon}</span>
        {newCount > 0 && (
          <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-white">
            {newCount} new
          </span>
        )}
      </div>
      <h3 className="font-semibold text-foreground group-hover:text-brand">
        {source.shortName}
      </h3>
      <p className="mt-0.5 line-clamp-2 text-xs text-muted">{source.name}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        <span className={cn("rounded-md px-2 py-0.5 text-xs font-medium", group.color)}>
          {group.label}
        </span>
        {source.gsPapers.map((gs) => (
          <span
            key={gs}
            className="rounded-md bg-surface-hover px-2 py-0.5 text-xs text-muted"
          >
            {gs}
          </span>
        ))}
      </div>
    </Link>
  );
}

interface SourceStripProps {
  source: Source;
  newCount?: number;
}

export function SourceStrip({ source, newCount = 0 }: SourceStripProps) {

  return (
    <Link
      href={`/sources/${source.slug}`}
      className="flex shrink-0 flex-col rounded-xl border border-border bg-surface p-3 w-36 transition-all hover:border-brand/30 sm:w-40"
    >
      <div className="flex items-center justify-between">
        <span className="text-xl">{source.icon}</span>
        {newCount > 0 && (
          <span className="rounded-full bg-brand/10 px-1.5 py-0.5 text-xs font-bold text-brand">
            {newCount}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm font-semibold">{source.shortName}</p>
      <p className="text-xs text-muted">{newCount} today</p>
    </Link>
  );
}
