export const CATEGORIES = [
  "Tecnologia",
  "Desenvolvimento",
  "Design",
  "Marketing",
  "Produtividade",
  "Negócios",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Article {
  id: string;
  slug: string;
  title: string;
  dek: string;
  category: string;
  author: string;
  date: string;
  read_minutes: number;
  hero: string;
  body: string[];
  featured: boolean;
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
