import { demos } from "./demos";

export type Category = "websites" | "design" | "ads";
export const categories: Category[] = ["websites", "design", "ads"];

/**
 * Portfolio items. Texts live in messages → "cases.<slug>".
 * Add your real work here (and put images in public/portfolio/).
 * Never invent results — demo items show goals, not numbers.
 */
export const portfolio = demos.map((d) => ({
  slug: d.slug,
  category: "websites" as Category,
  demo: true,
  palette: d.palette,
}));

export type PortfolioItem = (typeof portfolio)[number];
export const getItem = (slug: string) => portfolio.find((p) => p.slug === slug);
