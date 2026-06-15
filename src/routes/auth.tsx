import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acesso — The Newsprint" },
      { name: "description", content: "Entre na sua conta de editor." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
      navigate({ to: "/admin" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      setError(
        msg.includes("Invalid login")
          ? "Email ou senha inválidos."
          : msg.includes("already registered")
            ? "Este email já está cadastrado. Tente entrar."
            : msg,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        Redação
      </p>
      <h1 className="mt-3 text-center font-serif text-5xl font-black tracking-tighter">
        {mode === "signin" ? "Acesso de Editor" : "Criar Conta"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-5 border-2 border-foreground p-6"
      >
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest">
            Email
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-foreground bg-background px-3 py-2 font-body focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest">
            Senha
          </label>
          <input
            type="password"
            required
            minLength={6}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-foreground bg-background px-3 py-2 font-body focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {error && (
          <p className="border border-destructive bg-destructive/10 p-2 font-mono text-xs text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full border-2 border-foreground bg-foreground py-3 font-sans text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-background hover:text-foreground disabled:opacity-50"
        >
          {loading
            ? "Aguarde…"
            : mode === "signin"
              ? "Entrar"
              : "Cadastrar"}
        </button>

        <button
          type="button"
          onClick={() => {
            setError(null);
            setMode(mode === "signin" ? "signup" : "signin");
          }}
          className="block w-full text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          {mode === "signin"
            ? "Não tem conta? Cadastre-se"
            : "Já tem conta? Entrar"}
        </button>
      </form>

      <p className="mt-8 text-center">
        <Link
          to="/"
          className="font-mono text-[10px] uppercase tracking-widest underline decoration-accent decoration-2 underline-offset-4"
        >
          ← Voltar à capa
        </Link>
      </p>
    </div>
  );
}
