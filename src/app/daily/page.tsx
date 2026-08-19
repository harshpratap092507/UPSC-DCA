import { getDayArchives } from "@/lib/article-store";
import { formatDayCard, groupByMonth, GS_COLORS } from "@/lib/utils";
import { GSPaper } from "@/types";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DailyArchivePage() {
  const archives = await getDayArchives();
  const dates = archives.map((a) => a.date);
  const byMonth = groupByMonth(dates);
  const archiveMap = Object.fromEntries(archives.map((a) => [a.date, a]));

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Daily Archive</h1>
        <p className="mt-1 text-sm text-muted md:text-base">
          Browse current affairs by date — built from live RSS feeds
        </p>
      </header>

      {Object.entries(byMonth).map(([monthLabel, monthDates]) => (
        <section key={monthLabel} className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-brand">{monthLabel}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {monthDates.map((date) => {
              const archive = archiveMap[date];
              if (!archive) return null;
              const [y, m, d] = date.split("-");

              return (
                <Link
                  key={date}
                  href={`/daily/${y}/${m}/${d}`}
                  className="rounded-xl border border-border bg-surface p-4 transition-all hover:border-brand/30 hover:shadow-md"
                >
                  <p className="font-semibold">{formatDayCard(date)}</p>
                  <p className="mt-1 text-sm text-muted">
                    {archive.articleCount} items · {archive.sourceCount} sources
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {(Object.entries(archive.gsBreakdown) as [GSPaper, number][]).map(
                      ([gs, count]) => (
                        <span
                          key={gs}
                          className={`rounded px-1.5 py-0.5 text-xs font-medium ${GS_COLORS[gs]}`}
                        >
                          {gs}({count})
                        </span>
                      )
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
