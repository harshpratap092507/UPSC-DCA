"use client";

import { useMemo } from "react";
import { Article } from "@/types";
import { ArticleCard } from "./ArticleCard";
import { SourceStrip } from "./SourceCard";
import { sources } from "@/data/sources";

interface ArticleFeedProps {
  articles: Article[];
  title?: string;
  subtitle?: string;
  showSourceStrips?: boolean;
  emptyMessage?: string;
}

export function ArticleFeed({
  articles,
  title,
  subtitle,
  showSourceStrips = false,
  emptyMessage = "No articles found for this filter.",
}: ArticleFeedProps) {
  const countsBySource = useMemo(() => {
    const m = new Map<string, number>();
    for (const a of articles) {
      m.set(a.sourceId, (m.get(a.sourceId) ?? 0) + 1);
    }
    return m;
  }, [articles]);

  const stripSources = useMemo(
    () =>
      sources.filter(
        (s) => s.fetchMethod === "rss" || (countsBySource.get(s.id) ?? 0) > 0
      ),
    [countsBySource]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      {(title || subtitle) && (
        <header className="mb-6">
          {title && (
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-muted md:text-base">{subtitle}</p>
          )}
        </header>
      )}

      {showSourceStrips && (
        <div className="mb-6 -mx-4 px-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
            Live sources
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {stripSources.map((s) => (
              <SourceStrip
                key={s.id}
                source={s}
                newCount={countsBySource.get(s.id) ?? 0}
              />
            ))}
          </div>
        </div>
      )}

      {articles.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1 xl:gap-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
