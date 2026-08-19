import { getAllArticles } from "@/lib/article-store";
import { SavedList } from "./SavedList";

export const dynamic = "force-dynamic";

export default async function SavedPage() {
  const allArticles = await getAllArticles();
  return <SavedList allArticles={allArticles} />;
}
