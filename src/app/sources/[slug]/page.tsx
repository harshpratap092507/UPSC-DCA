import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticlesBySource } from "@/lib/article-store";
import { getSourceBySlug, SOURCE_GROUPS, sources } from "@/data/sources";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return sources.map((s) => ({ slug: s.slug }));
}

export default async function SourceDetailPage({ params }: Props) {
  const source = getSourceBySlug(params.slug);
  if (!source) notFound();

  const articles = await getArticlesBySource(source.id);
  const group = SOURCE_GROUPS[source.group];
  const isLive = source.fetchMethod === "rss";

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 lg:px-6">
      <Link
        href="/sources"
        className="mb-4 inline-flex text-sm text-muted hover:text-brand"
      >
        ← All sources
      </Link>

      <header className="mb-6 rounded-xl border border-border bg-surface p-5">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{source.icon}</span>
          <div>
            <h1 className="text-2xl font-bold">{source.name}</h1>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-sm text-brand hover:underline"
            >
              {source.url} ↗
            </a>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className={cn("rounded-md px-2 py-0.5 text-xs font-medium", group.color)}>
                {group.label}
              </span>
              {isLive && (
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                  Live RSS
                </span>
              )}
              {source.gsPapers.map((gs) => (
                <span
                  key={gs}
                  className="rounded-md bg-surface-hover px-2 py-0.5 text-xs"
                >
                  {gs}
                </span>
              ))}
            </div>
            {source.feedNote && (
              <p className="mt-3 text-xs text-muted">{source.feedNote}</p>
            )}
            {source.rssFeedUrl && (
              <p className="mt-1 text-xs text-muted">
                RSS:{" "}
                <a
                  href={source.rssFeedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  feed
                </a>
                {" · "}
                <a href={`/api/feeds/${source.id}`} className="text-brand hover:underline">
                  JSON
                </a>
                {" · "}
                <a href="/api/feeds/refresh" className="text-brand hover:underline">
                  Refresh all
                </a>
              </p>
            )}
          </div>
        </div>
      </header>

      <p className="mb-4 text-sm text-muted">
        {articles.length} articles · auto-refresh every {source.fetchIntervalMinutes} min
      </p>

      <div className="space-y-4">
        {articles.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-12 text-center text-muted">
            {isLive
              ? "No live articles yet. Visit /api/feeds/refresh to fetch now."
              : "Press-listing fetcher coming soon — this source is registered but not wired yet."}
          </div>
        ) : (
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        )}
      </div>
    </div>
  );
}
