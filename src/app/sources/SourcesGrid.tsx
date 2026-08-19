"use client";

import { useState } from "react";
import { SourceCard } from "@/components/SourceCard";
import { FilterChips } from "@/components/FilterChips";
import { sources, SOURCE_GROUPS } from "@/data/sources";

const groupFilters = [
  { value: "all", label: "All" },
  ...Object.entries(SOURCE_GROUPS).map(([value, { label }]) => ({
    value,
    label,
  })),
];

interface SourcesGridProps {
  todayCounts: Record<string, number>;
}

export function SourcesGrid({ todayCounts }: SourcesGridProps) {
  const [group, setGroup] = useState("all");

  const filtered =
    group === "all" ? sources : sources.filter((s) => s.group === group);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Sources</h1>
        <p className="mt-1 text-sm text-muted md:text-base">
          {sources.length} whitelisted feeds — RSS sources update automatically every 30 min
        </p>
      </header>

      <FilterChips options={groupFilters} selected={group} onChange={setGroup} />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((source) => (
          <SourceCard
            key={source.id}
            source={source}
            newCount={todayCounts[source.id] ?? 0}
          />
        ))}
      </div>
    </div>
  );
}
