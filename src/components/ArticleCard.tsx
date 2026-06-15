import { Link } from "@tanstack/react-router";
import { type Article, formatDate } from "@/lib/articles-shared";

export function ArticleCard({
  article,
  size = "md",
}: {
  article: Article;
  size?: "sm" | "md" | "lg";
}) {
  const titleClass =
    size === "lg"
      ? "text-3xl sm:text-4xl lg:text-5xl"
      : size === "sm"
        ? "text-xl"
        : "text-2xl sm:text-3xl";

  return (
    <article className="group flex h-full flex-col">
      <Link
        to="/artigo/$slug"
        params={{ slug: article.slug }}
        className="block overflow-hidden border border-foreground bg-muted"
      >
        <img
          src={article.hero}
          alt={article.title}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <Link
            to="/categoria/$category"
            params={{ category: article.category.toLowerCase() }}
            className="bg-foreground px-2 py-1 text-background"
          >
            {article.category}
          </Link>
          <span>{formatDate(article.date)}</span>
        </div>
        <Link to="/artigo/$slug" params={{ slug: article.slug }}>
          <h3
            className={`mt-3 font-serif font-black leading-[1.05] tracking-tight transition-colors group-hover:text-accent ${titleClass}`}
          >
            {article.title}
          </h3>
        </Link>
        {size !== "sm" && (
          <p className="mt-3 font-body text-base leading-relaxed text-foreground/80">
            {article.dek}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between border-t border-foreground/30 pt-3 font-mono text-xs">
          <span className="uppercase tracking-widest">por {article.author}</span>
          <span className="text-muted-foreground">{article.read_minutes} min</span>
        </div>
      </div>
    </article>
  );
}
