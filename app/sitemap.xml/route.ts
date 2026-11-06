import { projects } from "../../data/projects";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const updated = new Date().toISOString();
  const urls = [
    `<url><loc>${origin}</loc><lastmod>${updated}</lastmod><priority>1.0</priority></url>`,
    `<url><loc>${origin}/proceso</loc><lastmod>${updated}</lastmod><priority>0.9</priority></url>`,
    ...projects.map(
      ({ slug }) =>
        `<url><loc>${origin}/proyectos/${slug}</loc><lastmod>${updated}</lastmod><priority>0.8</priority></url>`,
    ),
  ].join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { "content-type": "application/xml; charset=utf-8" } },
  );
}
