import { Article } from "@/types";

/** Approximate visual line length for read-more chunks */
export const LINES_PER_CHUNK = 10;
const CHARS_PER_LINE = 90;

/** Split prose into approximate visual lines for progressive reveal */
export function textToLines(text: string): string[] {
  const paragraphs = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const lines: string[] = [];

  for (const paragraph of paragraphs) {
    const words = paragraph.split(/\s+/);
    let current = "";

    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (next.length > CHARS_PER_LINE && current) {
        lines.push(current);
        current = word;
      } else {
        current = next;
      }
    }
    if (current) lines.push(current);
  }

  return lines;
}

export function getArticleLines(article: Article): string[] {
  const body =
    article.content?.join("\n\n") || article.summary || "No content available.";
  return textToLines(body);
}

export function getArticleBodyText(article: Article): string {
  return article.content?.join("\n\n") || article.summary || "";
}
