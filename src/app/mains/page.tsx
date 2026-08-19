import { ArticleFeed } from "@/components/ArticleFeed";
import { getArticlesByLens } from "@/lib/article-store";

export const dynamic = "force-dynamic";

export default async function MainsPage() {
  const articles = await getArticlesByLens("mains");

  return (
    <ArticleFeed
      articles={articles}
      title="Mains Lens"
      subtitle="Analytical depth — committees, IR implications, governance & answer-writing material"
    />
  );
}
