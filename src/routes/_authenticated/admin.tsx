import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  createArticle,
  deleteArticle,
  isCurrentUserAdmin,
  listArticles,
} from "@/lib/articles.functions";
import { CATEGORIES, formatDate } from "@/lib/articles-shared";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Redação — Admin" }] }),
  component: AdminPage,
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
}

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchList = useServerFn(listArticles);
  const checkAdmin = useServerFn(isCurrentUserAdmin);
  const create = useServerFn(createArticle);
  const remove = useServerFn(deleteArticle);

  const adminQ = useQuery({ queryKey: ["is-admin"], queryFn: () => checkAdmin() });
  const listQ = useQuery({
    queryKey: ["articles"],
    queryFn: () => fetchList(),
    enabled: adminQ.data === true,
  });

  const [title, setTitle] = useState("");
  const [dek, setDek] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [author, setAuthor] = useState("");
  const [hero, setHero] = useState("");
  const [body, setBody] = useState("");
  const [readMinutes, setReadMinutes] = useState(5);
  const [featured, setFeatured] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const createMut = useMutation({
    mutationFn: async () => {
      const slug = slugify(title);
      if (!slug) throw new Error("Título inválido");
      return create({
        data: {
          slug,
          title,
          dek,
          category,
          author,
          date: new Date().toISOString(),
          read_minutes: readMinutes,
          hero,
          body: body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean),
          featured,
        },
      });
    },
    onSuccess: () => {
      setTitle(""); setDek(""); setAuthor(""); setHero(""); setBody("");
      setReadMinutes(5); setFeatured(false); setFormError(null);
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (e) => setFormError(e instanceof Error ? e.message : String(e)),
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string) => remove({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["articles"] }),
  });

  async function handleSignOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (adminQ.isLoading) {
    return <div className="mx-auto max-w-screen-md p-10 text-center font-mono text-xs uppercase tracking-widest">Verificando credenciais…</div>;
  }

  if (adminQ.data === false) {
    return (
      <div className="mx-auto max-w-screen-md p-10 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Acesso negado</p>
        <h1 className="mt-4 font-serif text-4xl font-black tracking-tighter">Sem permissões de editor</h1>
        <p className="mt-3 font-body text-muted-foreground">
          Sua conta não tem privilégios de administrador.
        </p>
        <button onClick={handleSignOut} className="mt-6 border border-foreground px-5 py-2 font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background">
          Sair
        </button>
      </div>
    );
  }

  const articles = listQ.data ?? [];

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10">
      <div className="flex items-end justify-between border-b-2 border-foreground pb-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Painel de Redação</p>
          <h1 className="mt-2 font-serif text-5xl font-black tracking-tighter">Administração</h1>
        </div>
        <button onClick={handleSignOut} className="border border-foreground px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background">
          Sair
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* New article */}
        <section className="border-2 border-foreground p-6">
          <h2 className="font-serif text-2xl font-black">Novo artigo</h2>
          <form
            className="mt-5 space-y-4"
            onSubmit={(e) => { e.preventDefault(); createMut.mutate(); }}
          >
            <Field label="Título">
              <input required value={title} onChange={(e) => setTitle(e.target.value)} className="input" maxLength={300} />
            </Field>
            <Field label="Subtítulo / linha-fina">
              <input value={dek} onChange={(e) => setDek(e.target.value)} className="input" maxLength={1000} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Categoria">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Autor">
                <input value={author} onChange={(e) => setAuthor(e.target.value)} className="input" maxLength={120} />
              </Field>
            </div>
            <Field label="URL da imagem de capa">
              <input value={hero} onChange={(e) => setHero(e.target.value)} className="input" maxLength={2000} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Minutos de leitura">
                <input type="number" min={1} max={120} value={readMinutes} onChange={(e) => setReadMinutes(Number(e.target.value))} className="input" />
              </Field>
              <Field label="Destaque">
                <label className="flex items-center gap-2 pt-2">
                  <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                  <span className="font-body text-sm">Marcar como destaque</span>
                </label>
              </Field>
            </div>
            <Field label="Corpo (parágrafos separados por linha em branco)">
              <textarea value={body} onChange={(e) => setBody(e.target.value)} className="input min-h-[200px]" />
            </Field>
            {formError && (
              <p className="border border-destructive bg-destructive/10 p-2 font-mono text-xs text-destructive">{formError}</p>
            )}
            <button
              type="submit"
              disabled={createMut.isPending}
              className="w-full border-2 border-foreground bg-foreground py-3 font-sans text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-background hover:text-foreground disabled:opacity-50"
            >
              {createMut.isPending ? "Publicando…" : "Publicar artigo"}
            </button>
          </form>
        </section>

        {/* List */}
        <section>
          <h2 className="font-serif text-2xl font-black">Artigos publicados ({articles.length})</h2>
          {listQ.isLoading ? (
            <p className="mt-4 font-mono text-xs uppercase">Carregando…</p>
          ) : (
            <ul className="mt-4 divide-y divide-foreground/30 border-y border-foreground/30">
              {articles.map((a) => (
                <li key={a.id} className="flex items-start justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <Link
                      to="/artigo/$slug"
                      params={{ slug: a.slug }}
                      className="font-serif text-lg font-bold leading-tight hover:underline decoration-accent decoration-2 underline-offset-4"
                    >
                      {a.title}
                    </Link>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {a.category} · {formatDate(a.date)} · {a.read_minutes} min
                    </p>
                  </div>
                  <button
                    onClick={() => { if (confirm(`Excluir "${a.title}"?`)) deleteMut.mutate(a.id); }}
                    className="shrink-0 border border-foreground px-3 py-1 font-mono text-[10px] uppercase tracking-widest hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                  >
                    Excluir
                  </button>
                </li>
              ))}
              {articles.length === 0 && (
                <li className="py-6 text-center font-body italic text-muted-foreground">Nenhum artigo ainda.</li>
              )}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-widest">{label}</label>
      <div className="mt-1">{children}</div>
      <style>{`.input{width:100%;border:1px solid hsl(var(--foreground));background:hsl(var(--background));padding:.5rem .75rem;font-family:var(--font-body, inherit);}`}</style>
    </div>
  );
}
