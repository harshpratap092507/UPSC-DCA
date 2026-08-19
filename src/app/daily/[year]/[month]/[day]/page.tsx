import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticlesByDate } from "@/lib/article-store";
import { formatDate, GS_COLORS } from "@/lib/utils";
import { GSPaper } from "@/types";

export const dynamic = "force-dynamic";

interface Props {
  params: { year: string; month: string; day: string };
}

export default async function DailyDetailPage({ params }: Props) {
  const month = params.month.padStart(2, "0");
  const day = params.day.padStart(2, "0");
  const dateStr = `${params.year}-${month}-${day}`;

  const articles = await getArticlesByDate(dateStr);
  if (articles.length === 0) notFound();

  const byGS = articles.reduce(
    (acc, a) => {
      if (!acc[a.gsPaper]) acc[a.gsPaper] = [];
      acc[a.gsPaper].push(a);
      return acc;
    },
    {} as Record<GSPaper, typeof articles>
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 lg:px-6">
      <Link
        href="/daily"
        className="mb-4 inline-flex text-sm text-muted hover:text-brand"
      >
        ← Daily archive
      </Link>

      <header className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">{formatDate(dateStr)}</h1>
        <p className="mt-1 text-sm text-muted">
          {articles.length} articles · {new Set(articles.map((a) => a.sourceId)).size} sources
        </p>
      </header>

      {(Object.entries(byGS) as [GSPaper, typeof articles][]).map(
        ([gs, items]) => (
          <section key={gs} className="mb-8">
            <h2
              className={`mb-3 inline-flex rounded-lg border px-3 py-1 text-sm font-semibold ${GS_COLORS[gs]}`}
            >
              {gs} · {items.length}
            </h2>
            <div className="space-y-3">
              {items.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )
      )}
    </div>
  );
}
