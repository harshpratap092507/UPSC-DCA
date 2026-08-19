import { notFound } from "next/navigation";
import { ArticleFeed } from "@/components/ArticleFeed";
import { getArticlesByGS, GS_LABELS } from "@/lib/article-store";
import { GSPaper } from "@/types";

export const dynamic = "force-dynamic";

const VALID: GSPaper[] = ["GS-1", "GS-2", "GS-3", "GS-4"];

interface Props {
  params: { paper: string };
}

export function generateStaticParams() {
  return [{ paper: "1" }, { paper: "2" }, { paper: "3" }, { paper: "4" }];
}

export default async function GSPaperPage({ params }: Props) {
  const paperKey = `GS-${params.paper}` as GSPaper;
  if (!VALID.includes(paperKey)) notFound();

  const articles = await getArticlesByGS(paperKey);

  return (
    <ArticleFeed
      articles={articles}
      title={paperKey}
      subtitle={GS_LABELS[paperKey]}
      emptyMessage={`No articles tagged ${paperKey} yet. Live feeds refresh every 30 min.`}
    />
  );
}
