import { ArticleFeed } from "@/components/ArticleFeed";
import { getArticlesByLens } from "@/lib/article-store";

export const dynamic = "force-dynamic";

export default async function PrelimsPage() {
  const articles = await getArticlesByLens("prelims");

  return (
    <ArticleFeed
      articles={articles}
      title="Prelims Lens"
      subtitle="Fact-heavy items — schemes, bodies, dates, reports & MCQ-worthy updates"
    />
  );
}
