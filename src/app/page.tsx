import { ArticleFeed } from "@/components/ArticleFeed";
import {
  getArticlesMeta,
  getTodayArticles,
} from "@/lib/article-store";

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  const articles = await getTodayArticles();
  const meta = await getArticlesMeta();
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const sourceCount = new Set(articles.map((a) => a.sourceId)).size;

  const liveNote = meta.live
    ? ` · Live RSS · ${meta.liveCount} items · updated ${new Date(meta.lastRefreshedAt!).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`
    : " · Mock data (RSS fetch pending)";

  return (
    <ArticleFeed
      articles={articles}
      title="Today"
      subtitle={`${today} · ${articles.length} articles from ${sourceCount} sources${liveNote}`}
      showSourceStrips
      emptyMessage="No articles fetched yet today. Try /api/feeds/refresh or check back shortly."
    />
  );
}
