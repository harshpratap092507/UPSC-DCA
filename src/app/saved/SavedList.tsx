"use client";

import { Article } from "@/types";
import { ArticleCard } from "@/components/ArticleCard";
import { useSaved } from "@/context/SavedContext";

interface SavedListProps {
  allArticles: Article[];
}

export function SavedList({ allArticles }: SavedListProps) {
  const { savedIds } = useSaved();
  const saved = allArticles.filter((a) => savedIds.has(a.id));

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 lg:px-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Saved</h1>
        <p className="mt-1 text-sm text-muted md:text-base">
          {saved.length} bookmarked for revision · stored locally on this device
        </p>
      </header>

      {saved.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-muted">No saved articles yet.</p>
          <p className="mt-2 text-sm text-muted">
            Tap ☆ Save on any article to add it here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {saved.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
