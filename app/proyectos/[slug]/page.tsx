import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../../data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return {};

  return {
    title: project.name,
    description: project.location
      ? `${project.name}, ${project.location}.`
      : project.name,
    openGraph: {
      title: project.name,
      description: project.location ?? "Construcciones Prácticas",
      images: [project.cover],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <main className="project-page">
      <header className="project-page-header">
        <Link href="/" aria-label="Volver a Construcciones Prácticas">
          <Image
            src="/brand/construcciones-practicas-display.png"
            alt="Construcciones Prácticas"
            width={1800}
            height={568}
            priority
            unoptimized
          />
        </Link>
        <Link href="/#proyectos">Proyectos</Link>
      </header>

      <section className="project-page-intro">
        <p>Construcciones Prácticas</p>
        <h1>{project.name}</h1>
        {project.location && <span>{project.location}</span>}
        {project.client === "GESCRAP" && (
          <span className="project-page-client">
            <Image
              src="/brand/gescrap.svg"
              alt="GESCRAP"
              width={286}
              height={92}
              unoptimized
            />
          </span>
        )}
      </section>

      <section className="project-gallery" aria-label={project.name}>
        {project.images.map((image, index) => (
          <figure key={image} className={index % 2 ? "offset" : ""}>
            <Image
              src={image}
              alt={
                project.location
                  ? `${project.name}, ${project.location}`
                  : project.name
              }
              fill
              priority={index === 0}
              unoptimized
              sizes={
                index === 0
                  ? "100vw"
                  : "(max-width: 800px) 100vw, 76vw"
              }
            />
          </figure>
        ))}
      </section>

      <footer className="project-page-footer">
        <Link href="/#proyectos">Todos los proyectos</Link>
        <Link href="/#contacto">Contacto</Link>
      </footer>
    </main>
  );
}
