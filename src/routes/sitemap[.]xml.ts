import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CATEGORIES } from "@/lib/articles-shared";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import(
          "@/integrations/supabase/client.server"
        );
        const { data } = await supabaseAdmin
          .from("articles")
          .select("slug,date")
          .order("date", { ascending: false });
        const articles = (data ?? []) as { slug: string; date: string }[];

        const entries = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          ...CATEGORIES.map((c) => ({
            path: `/categoria/${encodeURIComponent(c.toLowerCase())}`,
            changefreq: "weekly",
            priority: "0.7",
          })),
          ...articles.map((a) => ({
            path: `/artigo/${a.slug}`,
            lastmod: a.date,
            changefreq: "monthly",
            priority: "0.8",
          })),
        ];

        const urls = entries.map((e) =>
          [
            "  <url>",
            `    <loc>${BASE_URL}${e.path}</loc>`,
            "lastmod" in e && e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            "  </url>",
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
