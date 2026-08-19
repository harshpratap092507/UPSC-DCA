"use client";

import { useState, useCallback } from "react";
import { Article } from "@/types";
import { getSourceById } from "@/data/sources";
import { formatRelativeTime } from "@/data/articles";
import { GS_COLORS, cn } from "@/lib/utils";
import { useSaved } from "@/context/SavedContext";
import { getArticleLines, LINES_PER_CHUNK } from "@/lib/content";

interface ArticleCardProps {
  article: Article;
  compact?: boolean;
}

export function ArticleCard({ article, compact = false }: ArticleCardProps) {
  const source = getSourceById(article.sourceId);
  const { isSaved, toggleSave } = useSaved();
  const saved = isSaved(article.id);

  const lines = getArticleLines(article);
  const [expanded, setExpanded] = useState(false);
  const [visibleLines, setVisibleLines] = useState(LINES_PER_CHUNK);

  const hasMore = visibleLines < lines.length;
  const visibleText = lines.slice(0, visibleLines);
  const canExpand = lines.length > 0;

  const handleToggleExpand = useCallback(() => {
    if (!canExpand) return;
    setExpanded((prev) => {
      if (prev) {
        setVisibleLines(LINES_PER_CHUNK);
        return false;
      }
      setVisibleLines(LINES_PER_CHUNK);
      return true;
    });
  }, [canExpand]);

  const handleReadMore = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setVisibleLines((n) => Math.min(n + LINES_PER_CHUNK, lines.length));
    },
    [lines.length]
  );

  const handleSave = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleSave(article.id);
    },
    [article.id, toggleSave]
  );

  return (
    <article
      className={cn(
        "rounded-xl border border-border bg-surface transition-shadow",
        expanded ? "shadow-md ring-1 ring-brand/20" : "hover:shadow-md",
        compact ? "p-3" : "p-4"
      )}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-md bg-surface-hover px-2 py-0.5 text-xs font-semibold">
          {source?.icon} {source?.shortName}
        </span>
        <span
          className={cn(
            "rounded-md border px-2 py-0.5 text-xs font-medium",
            GS_COLORS[article.gsPaper]
          )}
        >
          {article.gsPaper}
        </span>
        <span className="text-xs text-muted">{article.subTopic}</span>
        {article.lens !== "both" && (
          <span className="rounded-md bg-violet-50 px-2 py-0.5 text-xs font-medium capitalize text-violet-700 dark:bg-violet-950 dark:text-violet-300">
            {article.lens}
          </span>
        )}
        <span className="ml-auto text-xs text-muted">
          {formatRelativeTime(article.publishedAt)}
        </span>
      </div>

      <button
        type="button"
        onClick={handleToggleExpand}
        className={cn(
          "w-full text-left",
          canExpand && "cursor-pointer"
        )}
        aria-expanded={expanded}
      >
        <h3
          className={cn(
            "font-semibold leading-snug text-foreground transition-colors",
            canExpand && "hover:text-brand",
            compact ? "text-sm" : "text-base"
          )}
        >
          {article.title}
        </h3>
        {!expanded && article.summary && (
          <p className="mt-2 line-clamp-2 text-sm text-muted">{article.summary}</p>
        )}
        {canExpand && !expanded && (
          <p className="mt-1 text-xs font-medium text-brand">
            Tap to expand ↓
          </p>
        )}
      </button>

      <div
        className={cn(
          "grid transition-all duration-500 ease-in-out",
          expanded ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-2 border-t border-border pt-3">
            {visibleText.map((line, i) => (
              <p key={i} className="text-sm leading-relaxed text-foreground/90">
                {line}
              </p>
            ))}

            {expanded && hasMore && (
              <button
                type="button"
                onClick={handleReadMore}
                className="mt-2 text-sm font-semibold text-brand hover:underline min-h-[44px] md:min-h-0"
              >
                Read more ({lines.length - visibleLines} lines left) ↓
              </button>
            )}

            {expanded && !hasMore && lines.length > LINES_PER_CHUNK && (
              <button
                type="button"
                onClick={handleToggleExpand}
                className="mt-2 text-xs text-muted hover:text-foreground"
              >
                Collapse ↑
              </button>
            )}
          </div>
        </div>
      </div>

      {article.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-surface-hover px-1.5 py-0.5 text-xs text-muted"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0",
            saved
              ? "bg-amber-100 text-amber-800"
              : "bg-surface-hover text-muted hover:text-foreground"
          )}
        >
          {saved ? "★ Saved" : "☆ Save"}
        </button>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="rounded-lg bg-brand px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 min-h-[44px] flex items-center md:min-h-0"
        >
          Open original ↗
        </a>
      </div>
    </article>
  );
}
