import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  CATEGORIES,
  getArticlesByCategory,
  type Category,
} from "@/data/articles";
import { ArticleCard } from "@/components/ArticleCard";

export const Route = createFileRoute("/categoria/$category")({
  loader: ({ params }) => {
    const matched = CATEGORIES.find(
      (c) => c.toLowerCase() === params.category.toLowerCase(),
    );
    if (!matched) throw notFound();
    return {
      category: matched,
      articles: getArticlesByCategory(matched),
    };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.category ?? "Categoria";
    return {
      meta: [
        { title: `${c} — The Newsprint` },
        {
          name: "description",
          content: `Ensaios e reportagens da seção ${c} de The Newsprint.`,
        },
        { property: "og:title", content: `${c} — The Newsprint` },
        {
          property: "og:description",
          content: `Ensaios e reportagens da seção ${c}.`,
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-screen-md px-4 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Erratum 404
      </p>
      <h1 className="mt-4 font-serif text-6xl font-black tracking-tighter">
        Seção inexistente
      </h1>
      <Link
        to="/"
        className="mt-8 inline-block border border-foreground bg-foreground px-6 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-background hover:bg-background hover:text-foreground"
      >
        Voltar à capa
      </Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category, articles } = Route.useLoaderData() as {
    category: Category;
    articles: ReturnType<typeof getArticlesByCategory>;
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="border-b border-foreground/30 pb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Capa</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{category}</span>
      </nav>

      {/* Section masthead */}
      <header className="mt-10 border-y-4 border-foreground py-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Seção
        </p>
        <h1 className="mt-3 font-serif text-6xl font-black tracking-tighter sm:text-8xl lg:text-9xl">
          {category}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-body text-lg italic text-foreground/70">
          {articles.length}{" "}
          {articles.length === 1 ? "artigo em circulação" : "artigos em circulação"}
        </p>
      </header>

      {/* Grid */}
      {articles.length > 0 ? (
        <section className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </section>
      ) : (
        <p className="mt-20 text-center font-body text-xl italic text-muted-foreground">
          Nenhum artigo nesta seção ainda. As prensas estão sendo aquecidas.
        </p>
      )}
    </div>
  );
}
