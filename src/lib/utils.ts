import { GSPaper } from "@/types";

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDayCard(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getMonthYear(dateStr: string): { month: string; year: string } {
  const d = new Date(dateStr + "T00:00:00");
  return {
    month: d.toLocaleDateString("en-IN", { month: "long" }),
    year: d.getFullYear().toString(),
  };
}

export function groupByMonth(
  dates: string[]
): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  for (const date of dates) {
    const { month, year } = getMonthYear(date);
    const key = `${month} ${year}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(date);
  }
  return groups;
}

export const GS_COLORS: Record<GSPaper, string> = {
  "GS-1": "bg-rose-100 text-rose-800 border-rose-200",
  "GS-2": "bg-blue-100 text-blue-800 border-blue-200",
  "GS-3": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "GS-4": "bg-amber-100 text-amber-800 border-amber-200",
};
