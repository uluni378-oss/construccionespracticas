import assert from "node:assert/strict";
import test from "node:test";

async function createWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

const environment = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const executionContext = {
  waitUntil() {},
  passThroughOnException() {},
};

test("server-renders the Construcciones Prácticas portfolio", async () => {
  const worker = await createWorker();
  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    environment,
    executionContext,
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="es">/i);
  assert.match(html, /<title>Construcciones Prácticas<\/title>/i);
  assert.match(html, /Casa Doporto/);
  assert.match(html, /Construcción de Barda Perimetral/);
  assert.match(html, /GESCRAP/);
  assert.match(html, /Construcciones Prácticas ofrece servicios de arquitectura/);
  assert.match(html, /comunicación directa y ejecución cuidada/);
  assert.match(html, /747 275 0541/);
  assert.match(html, /Ubicación/);
  assert.match(html, /16908727582461103723/);
  assert.match(html, /loading="lazy"/);
  assert.doesNotMatch(html, /2026/);
  assert.match(html, /href="\/proceso"[^>]*>Proceso</);
  assert.doesNotMatch(html, /id="proceso"/);
  assert.doesNotMatch(html, />Planeación</);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /src="\/projects\/casa-doporto\.webp"/);
  assert.doesNotMatch(html, /_vinext\/image\?url=%2Fprojects/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders the dedicated process page", async () => {
  const worker = await createWorker();
  const response = await worker.fetch(
    new Request("http://localhost/proceso", {
      headers: { accept: "text/html" },
    }),
    environment,
    executionContext,
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Proceso \| Construcciones Prácticas<\/title>/i);
  assert.match(html, /Diagnóstico y visita técnica/);
  assert.match(html, /Cierre, registro y recomendaciones/);
  assert.match(html, /De la primera visita al cierre de obra\./);
  assert.doesNotMatch(html, /src="\/projects\//);
  assert.match(html, /747 275 0541/);
  assert.doesNotMatch(html, /2026/);
});

test("serves sitemap and robots using the request origin", async () => {
  const worker = await createWorker();
  const sitemap = await worker.fetch(
    new Request("https://example.test/sitemap.xml"),
    environment,
    executionContext,
  );
  const robots = await worker.fetch(
    new Request("https://example.test/robots.txt"),
    environment,
    executionContext,
  );

  assert.equal(sitemap.status, 200);
  assert.match(await sitemap.clone().text(), /https:\/\/example\.test\/proceso/);
  assert.match(await sitemap.text(), /https:\/\/example\.test\/proyectos\/casa-doporto/);
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap: https:\/\/example\.test\/sitemap\.xml/);
});
