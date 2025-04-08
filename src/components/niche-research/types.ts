
export type TrendDirection = "up" | "neutral" | "down";

export interface Trend {
  id: number;
  keyword: string;
  category: string;
  trend: TrendDirection;
  score: number;
  competition: string;
  roi: string;
}
