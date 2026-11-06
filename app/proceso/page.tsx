import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Proceso",
  description: "Proceso de trabajo de Construcciones Prácticas.",
  openGraph: {
    title: "Proceso | Construcciones Prácticas",
    description: "Proceso de trabajo de Construcciones Prácticas.",
  },
  twitter: {
    title: "Proceso | Construcciones Prácticas",
    description: "Proceso de trabajo de Construcciones Prácticas.",
  },
};

const processSteps = [
  {
    title: "Diagnóstico y visita técnica",
    detail:
      "Se revisan condiciones existentes, necesidades del cliente y restricciones visibles del inmueble.",
  },
  {
    title: "Levantamiento y registro fotográfico",
    detail:
      "Se documenta el estado inicial con medidas, fotografías y observaciones útiles para definir el trabajo.",
  },
  {
    title: "Definición de alcance",
    detail:
      "Se establecen trabajos, límites, exclusiones, prioridades y condiciones por confirmar antes de iniciar.",
  },
  {
    title: "Presupuesto por partidas",
    detail:
      "Se ordenan conceptos, cantidades y etapas para revisar costo y alcance antes de ejecutar.",
  },
  {
    title: "Documentación técnica o propuesta visual",
    detail:
      "Cuando aplica, se prepara documentación técnica o visual para coordinar decisiones y ejecución.",
  },
  {
    title: "Ejecución con control de avances",
    detail:
      "La intervención avanza con seguimiento técnico, revisión de calidad y registro de cambios relevantes.",
  },
  {
    title: "Cierre, registro y recomendaciones",
    detail:
      "Se documentan observaciones finales, cierre del trabajo y recomendaciones de uso o mantenimiento ligadas a la obra.",
  },
] as const;

export default function ProcessPage() {
  return (
    <div className="process-page">
      <header className="process-page-header">
        <Link href="/" aria-label="Ir al inicio de Construcciones Prácticas">
          <Image
            src="/brand/construcciones-practicas-display.png"
            alt="Construcciones Prácticas"
            width={1800}
            height={568}
            priority
            unoptimized
          />
        </Link>
        <nav aria-label="Navegación de proceso">
          <Link href="/#proyectos">Proyectos</Link>
          <Link href="/#nosotros">Nosotros</Link>
          <span aria-current="page">Proceso</span>
          <Link href="/#contacto">Contacto</Link>
        </nav>
        <Link className="process-page-return" href="/">
          Volver
        </Link>
      </header>

      <main>
        <section className="process-page-title" aria-labelledby="process-title">
          <p>Construcciones Prácticas</p>
          <h1 id="process-title">Proceso</h1>
          <span>01 — 07</span>
        </section>

        <section className="process-editorial" aria-label="Etapas del proceso">
          <div className="process-editorial-intro">
            <p>Proyecto · Obra · Mantenimiento</p>
            <h2>De la primera visita al cierre de obra.</h2>
          </div>

          <ol className="process-timeline">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span className="process-timeline-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2>{step.title}</h2>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <footer className="process-page-footer">
          <p>Construcciones Prácticas</p>
          <a href="tel:+527472750541">747 275 0541</a>
        </footer>
      </main>

      <a
        className="whatsapp"
        href="https://wa.me/527472750541"
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        WhatsApp
      </a>
    </div>
  );
}
