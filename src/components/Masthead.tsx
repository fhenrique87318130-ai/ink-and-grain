import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/data/articles";

const editionDate = new Date().toLocaleDateString("pt-BR", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export function Header() {
  return (
    <header className="border-b-4 border-foreground bg-background">
      {/* Meta strip */}
      <div className="border-b border-foreground">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-2 font-mono text-[10px] uppercase tracking-widest sm:text-xs">
          <span>Vol. I — Nº 042</span>
          <span className="hidden sm:inline">{editionDate}</span>
          <span>Edição Brasil · R$ 0,00</span>
        </div>
      </div>

      {/* Masthead */}
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-center sm:py-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          Toda notícia digna de ser impressa
        </p>
        <Link to="/" className="block">
          <h1 className="font-serif text-5xl font-black leading-none tracking-tighter sm:text-7xl lg:text-8xl">
            The Newsprint
          </h1>
        </Link>
        <p className="mt-2 font-body italic text-muted-foreground sm:text-lg">
          Um diário de ideias sobre tecnologia, design e o ofício de pensar.
        </p>
      </div>

      {/* Nav */}
      <nav className="border-y border-foreground bg-background">
        <div className="mx-auto max-w-screen-xl overflow-x-auto px-4">
          <ul className="flex items-center justify-start gap-6 whitespace-nowrap py-3 font-sans text-xs font-semibold uppercase tracking-widest sm:justify-center sm:gap-8">
            <li>
              <Link
                to="/"
                className="border-b-2 border-transparent pb-0.5 hover:border-foreground"
                activeOptions={{ exact: true }}
                activeProps={{ className: "border-b-2 border-foreground pb-0.5" }}
              >
                Capa
              </Link>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link
                  to="/categoria/$category"
                  params={{ category: c.toLowerCase() }}
                  className="border-b-2 border-transparent pb-0.5 hover:border-foreground"
                  activeProps={{ className: "border-b-2 border-foreground pb-0.5" }}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t-4 border-foreground">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-0 px-0 md:grid-cols-3">
        <div className="border-b border-foreground p-8 md:border-b-0 md:border-r">
          <h3 className="font-serif text-3xl font-black tracking-tighter">
            The Newsprint
          </h3>
          <p className="mt-3 font-body text-sm text-muted-foreground">
            Publicação independente. Pensamento longo num mundo curto.
          </p>
        </div>
        <div className="border-b border-foreground p-8 md:border-b-0 md:border-r">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Seções
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-1 font-sans text-sm">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link
                  to="/categoria/$category"
                  params={{ category: c.toLowerCase() }}
                  className="hover:underline hover:decoration-2 hover:decoration-accent hover:underline-offset-4"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Colofão
          </p>
          <p className="mt-3 font-body text-sm">
            Composto em Playfair Display & Lora. Impresso digitalmente em São Paulo.
          </p>
          <p className="mt-4 font-mono text-xs">
            © {new Date().getFullYear()} The Newsprint. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
