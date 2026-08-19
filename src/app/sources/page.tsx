import { getTodayCountsBySource } from "@/lib/article-store";
import { SourcesGrid } from "./SourcesGrid";

export const dynamic = "force-dynamic";

export default async function SourcesPage() {
  const todayCounts = await getTodayCountsBySource();
  return <SourcesGrid todayCounts={todayCounts} />;
}
