import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Article } from "./articles-shared";

const ArticleInput = z.object({
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Use apenas letras minúsculas, números e hífens"),
  title: z.string().min(1).max(300),
  dek: z.string().max(1000).default(""),
  category: z.string().min(1).max(80),
  author: z.string().max(120).default(""),
  date: z.string().min(1),
  read_minutes: z.number().int().min(1).max(120),
  hero: z.string().max(2000).default(""),
  body: z.array(z.string().max(20000)).max(200).default([]),
  featured: z.boolean().default(false),
});

async function adminGuard(ctx: {
  supabase: Awaited<ReturnType<typeof getAuthSupabase>>;
  userId: string;
}) {
  const { data, error } = await ctx.supabase.rpc("has_role", {
    _user_id: ctx.userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden");
}

type AuthCtx = { supabase: any; userId: string };
async function getAuthSupabase(): Promise<any> {
  return null as any;
}

export const listArticles = createServerFn({ method: "GET" }).handler(
  async () => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const { data, error } = await supabaseAdmin
      .from("articles")
      .select("*")
      .order("date", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as Article[];
  },
);

export const getArticleBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) =>
    z.object({ slug: z.string().min(1).max(200) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const { data: row, error } = await supabaseAdmin
      .from("articles")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (row as Article | null) ?? null;
  });

export const getArticlesByCategory = createServerFn({ method: "GET" })
  .inputValidator((input: { category: string }) =>
    z.object({ category: z.string().min(1).max(80) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const { data: rows, error } = await supabaseAdmin
      .from("articles")
      .select("*")
      .ilike("category", data.category)
      .order("date", { ascending: false });
    if (error) throw new Error(error.message);
    return (rows ?? []) as Article[];
  });

export const createArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => ArticleInput.parse(input))
  .handler(async ({ data, context }) => {
    await adminGuard(context as AuthCtx);
    const { supabase } = context as AuthCtx;
    const { data: row, error } = await supabase
      .from("articles")
      .insert(data)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row as Article;
  });

export const updateArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), patch: ArticleInput.partial() }).parse(
      input,
    ),
  )
  .handler(async ({ data, context }) => {
    await adminGuard(context as AuthCtx);
    const { supabase } = context as AuthCtx;
    const { data: row, error } = await supabase
      .from("articles")
      .update(data.patch)
      .eq("id", data.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row as Article;
  });

export const deleteArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await adminGuard(context as AuthCtx);
    const { supabase } = context as AuthCtx;
    const { error } = await supabase.from("articles").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const isCurrentUserAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context as AuthCtx;
    const { data, error } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (error) return false;
    return Boolean(data);
  });
