import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import {
  getArticleBySlug,
  getRelated,
  formatDate,
  ARTICLES,
} from "@/data/articles";
import { ArticleCard } from "@/components/ArticleCard";

export const Route = createFileRoute("/artigo/$slug")({
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Artigo — The Newsprint" }] };
    return {
      meta: [
        { title: `${a.title} — The Newsprint` },
        { name: "description", content: a.dek },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.dek },
        { property: "og:image", content: a.hero },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: a.hero },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-screen-md px-4 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Erratum 404
      </p>
      <h1 className="mt-4 font-serif text-6xl font-black tracking-tighter">
        Artigo não localizado
      </h1>
      <p className="mt-4 font-body text-lg text-muted-foreground">
        A edição que você procura saiu de circulação.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block border border-foreground bg-foreground px-6 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-background hover:bg-background hover:text-foreground"
      >
        Voltar à capa
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="mx-auto max-w-screen-md px-4 py-24 text-center">
        <h1 className="font-serif text-4xl font-black">Erro ao imprimir</h1>
        <p className="mt-3 font-body text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 border border-foreground px-5 py-2 font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background"
        >
          Tentar novamente
        </button>
      </div>
    );
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: NonNullable<ReturnType<typeof getArticleBySlug>> };
  const related = getRelated(article.slug);
  const allIndex = ARTICLES.findIndex((a) => a.slug === article.slug);
  const prev = ARTICLES[allIndex - 1];
  const next = ARTICLES[allIndex + 1];

  return (
    <article className="mx-auto max-w-screen-xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="border-b border-foreground/30 pb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Capa</Link>
        <span className="mx-2">/</span>
        <Link
          to="/categoria/$category"
          params={{ category: article.category.toLowerCase() }}
          className="hover:text-foreground"
        >
          {article.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Artigo</span>
      </nav>

      {/* Headline block */}
      <header className="mx-auto mt-10 max-w-4xl text-center">
        <Link
          to="/categoria/$category"
          params={{ category: article.category.toLowerCase() }}
          className="inline-block bg-foreground px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-background"
        >
          {article.category}
        </Link>
        <h1 className="mt-6 font-serif text-4xl font-black leading-[0.95] tracking-tighter sm:text-6xl lg:text-7xl">
          {article.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-body text-lg italic leading-relaxed text-foreground/80 sm:text-xl">
          {article.dek}
        </p>
        <div className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-6 border-y border-foreground/40 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>Por <strong className="text-foreground">{article.author}</strong></span>
          <span>{formatDate(article.date)}</span>
          <span>{article.readMinutes} min</span>
        </div>
      </header>

      {/* Hero image */}
      <figure className="mx-auto mt-12 max-w-5xl border border-foreground bg-muted">
        <img
          src={article.hero}
          alt={article.title}
          className="aspect-[16/9] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
        />
        <figcaption className="border-t border-foreground p-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Fig. 1.1 — Imagem editorial. Reprodução fotográfica.
        </figcaption>
      </figure>

      {/* Body — three column on desktop, single column on mobile */}
      <div className="mx-auto mt-16 max-w-5xl">
        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-3">
          <div className="border-foreground/30 pb-6 md:border-r md:pr-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Resumo
            </p>
            <p className="mt-3 font-serif text-xl font-bold italic leading-snug">
              "{article.dek}"
            </p>
            <div className="mt-6 hidden md:block">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Compartilhar
              </p>
              <ul className="mt-2 space-y-1 font-sans text-sm">
                <li><a href="#" className="hover:underline hover:decoration-accent hover:decoration-2">Twitter</a></li>
                <li><a href="#" className="hover:underline hover:decoration-accent hover:decoration-2">LinkedIn</a></li>
                <li><a href="#" className="hover:underline hover:decoration-accent hover:decoration-2">Copiar link</a></li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-2">
            {article.body.map((p, i) => (
              <p
                key={i}
                className={`mb-6 font-body text-lg leading-relaxed text-foreground/90 sm:text-justify ${i === 0 ? "drop-cap" : ""}`}
              >
                {p}
              </p>
            ))}

            <div className="my-10 text-center font-serif text-xl tracking-[0.5em] text-foreground/40">
              ✦ ✦ ✦
            </div>

            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Fim do artigo
            </p>
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      <nav className="mt-20 grid grid-cols-1 border-y-2 border-foreground sm:grid-cols-2">
        {prev ? (
          <Link
            to="/artigo/$slug"
            params={{ slug: prev.slug }}
            className="group border-foreground p-6 transition-colors hover:bg-foreground hover:text-background sm:border-r sm:p-8"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-background/60">
              ← Artigo anterior
            </p>
            <p className="mt-2 font-serif text-2xl font-black leading-tight">{prev.title}</p>
          </Link>
        ) : (
          <div className="border-foreground p-6 sm:border-r" />
        )}
        {next ? (
          <Link
            to="/artigo/$slug"
            params={{ slug: next.slug }}
            className="group p-6 text-right transition-colors hover:bg-foreground hover:text-background sm:p-8"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-background/60">
              Próximo artigo →
            </p>
            <p className="mt-2 font-serif text-2xl font-black leading-tight">{next.title}</p>
          </Link>
        ) : (
          <div />
        )}
      </nav>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="mb-8 flex items-end justify-between border-b-2 border-foreground pb-3">
            <h2 className="font-serif text-3xl font-black tracking-tighter sm:text-4xl">
              Continue lendo em {article.category}
            </h2>
            <Link
              to="/categoria/$category"
              params={{ category: article.category.toLowerCase() }}
              className="font-mono text-[10px] uppercase tracking-widest underline decoration-2 decoration-accent underline-offset-4"
            >
              Ver tudo
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
