import { createFileRoute, Link } from "@tanstack/react-router";
import { ARTICLES, CATEGORIES, formatDate } from "@/data/articles";
import { ArticleCard } from "@/components/ArticleCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Newsprint — Capa" },
      {
        name: "description",
        content:
          "Manchetes do dia: ensaios sobre tecnologia, design, negócios e produtividade. Publicação independente.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = ARTICLES.filter((a) => a.featured);
  const lead = featured[0];
  const sub = featured.slice(1, 3);
  const rest = ARTICLES.filter((a) => !a.featured);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10">
      {/* Breaking ticker */}
      <div className="mb-10 flex items-center gap-4 border-y-2 border-foreground bg-foreground px-4 py-2 text-background">
        <span className="bg-accent px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest">
          Última hora
        </span>
        <p className="truncate font-mono text-xs uppercase tracking-widest">
          {formatDate(new Date().toISOString())} · Edição diária · Pensamento longo num mundo curto · {ARTICLES.length} ensaios em circulação
        </p>
      </div>

      {/* Hero grid */}
      <section className="grid grid-cols-1 gap-0 border-y-2 border-foreground lg:grid-cols-12">
        {/* Lead story */}
        <article className="border-foreground p-6 sm:p-10 lg:col-span-8 lg:border-r">
          <Link
            to="/categoria/$category"
            params={{ category: lead.category.toLowerCase() }}
            className="inline-block bg-accent px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-accent-foreground"
          >
            {lead.category} · Manchete
          </Link>
          <Link to="/artigo/$slug" params={{ slug: lead.slug }}>
            <h2 className="mt-5 font-serif text-5xl font-black leading-[0.92] tracking-tighter sm:text-6xl lg:text-8xl">
              {lead.title}
            </h2>
          </Link>
          <p className="mt-6 max-w-3xl font-body text-lg leading-relaxed text-foreground/80 sm:text-xl">
            {lead.dek}
          </p>
          <div className="mt-6 overflow-hidden border border-foreground bg-muted">
            <img
              src={lead.hero}
              alt={lead.title}
              className="aspect-[16/9] w-full object-cover grayscale"
            />
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Fig. 1.1 — {lead.title}
          </p>
          <div className="mt-6 flex items-center justify-between border-t border-foreground/30 pt-4 font-mono text-xs uppercase tracking-widest">
            <span>por {lead.author}</span>
            <span>{formatDate(lead.date)} · {lead.readMinutes} min de leitura</span>
          </div>
          <Link
            to="/artigo/$slug"
            params={{ slug: lead.slug }}
            className="mt-6 inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-background transition-colors hover:bg-background hover:text-foreground"
          >
            Continuar lendo →
          </Link>
        </article>

        {/* Sub stories */}
        <div className="grid grid-cols-1 lg:col-span-4">
          {sub.map((a, i) => (
            <article
              key={a.slug}
              className={`p-6 sm:p-8 ${i === 0 ? "border-b border-foreground" : ""}`}
            >
              <Link
                to="/categoria/$category"
                params={{ category: a.category.toLowerCase() }}
                className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                {a.category}
              </Link>
              <Link to="/artigo/$slug" params={{ slug: a.slug }}>
                <h3 className="mt-2 font-serif text-2xl font-black leading-tight tracking-tight transition-colors hover:text-accent sm:text-3xl">
                  {a.title}
                </h3>
              </Link>
              <p className="mt-3 font-body text-sm leading-relaxed text-foreground/70">
                {a.dek}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {a.author} · {a.readMinutes} min
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Ornament */}
      <div className="my-16 text-center font-serif text-2xl tracking-[0.5em] text-foreground/40">
        ✦ ✦ ✦
      </div>

      {/* Section header */}
      <div className="mb-8 flex items-end justify-between border-b-2 border-foreground pb-3">
        <h2 className="font-serif text-3xl font-black tracking-tighter sm:text-4xl">
          Mais nesta edição
        </h2>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Página B · Seção de Ensaios
        </span>
      </div>

      <section className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </section>

      {/* Inverted section — categorias */}
      <section className="mt-24 border-4 border-foreground bg-foreground p-8 text-background sm:p-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-background/60">
          Índice editorial
        </p>
        <h2 className="mt-3 font-serif text-4xl font-black tracking-tighter sm:text-6xl">
          Seis seções. <span className="text-accent">Um único critério:</span> ideias que duram.
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-0 border-t border-background/30 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <li
              key={c}
              className={`border-b border-background/30 ${i % 3 !== 2 ? "lg:border-r" : ""} ${i % 2 !== 1 ? "sm:border-r lg:border-r" : ""}`}
            >
              <Link
                to="/categoria/$category"
                params={{ category: c.toLowerCase() }}
                className="group flex items-center justify-between p-6 transition-colors hover:bg-accent"
              >
                <span className="font-serif text-2xl font-bold sm:text-3xl">{c}</span>
                <span className="font-mono text-xs uppercase tracking-widest text-background/60 group-hover:text-background">
                  Ler →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
