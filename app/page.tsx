"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";

const mapsUrl =
  "https://www.google.com/maps/place/Construcciones+Pr%C3%A1cticas/data=!4m2!3m1!1s0x0:0xeaa7de2664718e6b?sa=X&ved=1t:2428&hl=es-419&ictx=111";

const navItems = [
  ["Proyectos", "#proyectos"],
  ["Nosotros", "#nosotros"],
  ["Proceso", "/proceso"],
  ["Contacto", "#contacto"],
] as const;

function Brand() {
  return (
    <Link className="brand" href="#inicio" aria-label="Construcciones Prácticas">
      <Image
        src="/brand/construcciones-practicas-display.png"
        alt="Construcciones Prácticas"
        width={1800}
        height={568}
        priority
        unoptimized
      />
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="site-header">
      <Brand />
      <nav className="desktop-nav" aria-label="Navegación principal">
        {navItems.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
      <motion.nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Navegación móvil"
        aria-hidden={!open}
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { opacity: 1, y: 0, pointerEvents: "auto" },
          closed: { opacity: 0, y: "-2%", pointerEvents: "none" },
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {navItems.map(([label, href], index) => (
          <motion.a
            key={href}
            href={href}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            initial={false}
            animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: open ? index * 0.06 : 0 }}
          >
            <span>0{index + 1}</span>
            {label}
          </motion.a>
        ))}
      </motion.nav>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ["0%", "0%"] : ["0%", "10%"],
  );
  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? ["0%", "0%"] : ["0%", "-18%"],
  );

  return (
    <section id="inicio" ref={ref} className="hero" aria-label="Portafolio">
      <motion.div className="hero-media" style={{ y: imageY }}>
        <Image
          src="/projects/casa-doporto.webp"
          alt="Casa Doporto, Bosques de Quauyocan, Puebla"
          fill
          priority
          sizes="100vw"
          unoptimized
        />
      </motion.div>
      <div className="hero-shade" />
      <motion.div
        className="hero-copy"
        style={{ y: titleY }}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p>Portafolio</p>
        <h1>
          Proyecto<span>·</span> Obra<span>·</span> Mantenimiento
        </h1>
      </motion.div>
      <a className="scroll-cue" href="#proyectos" aria-label="Ver proyectos">
        <span />
        Proyectos
      </a>
    </section>
  );
}

function ClientMark() {
  return (
    <span className="client-mark" aria-label="Proyecto realizado para GESCRAP">
      <Image
        src="/brand/gescrap.svg"
        alt="GESCRAP"
        width={286}
        height={92}
        unoptimized
      />
    </span>
  );
}

function ProjectFrame({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      id={project.slug}
      className="project-frame"
      initial={reducedMotion ? false : { opacity: 0.76 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="project-media"
        initial={reducedMotion ? false : { scale: 1.035 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={project.cover}
          alt={
            project.location
              ? `${project.name}, ${project.location}`
              : project.name
          }
          fill
          sizes="100vw"
          style={{ objectPosition: project.position }}
          unoptimized
        />
      </motion.div>
      <div className="project-shade" />
      <div className="project-index">{String(index + 1).padStart(2, "0")}</div>
      <motion.div
        className="project-caption"
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2>{project.name}</h2>
        {project.location && <p>{project.location}</p>}
      </motion.div>
      {project.client === "GESCRAP" && <ClientMark />}
      <Link
        className="project-link"
        href={`/proyectos/${project.slug}`}
        aria-label={`Ver ${project.name}`}
      />
    </motion.article>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section id="proyectos" className="projects" aria-label="Proyectos">
          <div className="section-intro">
            <p>Proyectos</p>
            <span>{String(projects.length).padStart(2, "0")} proyectos</span>
          </div>
          {projects.map((project, index) => (
            <ProjectFrame key={project.slug} project={project} index={index} />
          ))}
        </section>

        <section id="nosotros" className="about">
          <motion.div
            className="about-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <p>Nosotros</p>
            <h2>Arquitectura · Proyecto · Construcción · Remodelación</h2>
            <p className="about-copy">
              Construcciones Prácticas ofrece servicios de arquitectura,
              proyecto, obra, remodelación y mantenimiento para vivienda,
              locales comerciales y espacios de uso cotidiano. Trabajamos con
              enfoque técnico, soluciones funcionales, presupuestos claros y
              seguimiento ordenado del proceso. Nuestro objetivo es ayudar al
              cliente a resolver sus necesidades de construcción y mejora con
              criterio práctico, comunicación directa y ejecución cuidada.
            </p>
          </motion.div>
          <div className="about-image">
            <Image
              src="/projects/casa-tlaxcala-noche.webp"
              alt="Casa Tlaxcala"
              fill
              sizes="(max-width: 800px) 100vw, 72vw"
              unoptimized
            />
          </div>
          <p className="about-signature">Construcciones Prácticas</p>
        </section>

        <section id="contacto" className="location" aria-labelledby="location-title">
          <div className="location-heading">
            <h2 id="location-title">Ubicación</h2>
            <a href={mapsUrl} target="_blank" rel="noreferrer">
              Abrir en Google Maps <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="location-map">
            <iframe
              src="https://maps.google.com/maps?cid=16908727582461103723&output=embed"
              title="Ubicación de Construcciones Prácticas"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>

        <footer className="contact">
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
    </>
  );
}
