import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title: {
      default: "Construcciones Prácticas",
      template: "%s | Construcciones Prácticas",
    },
    description:
      "Portafolio de arquitectura, proyecto, obra y mantenimiento de Construcciones Prácticas.",
    applicationName: "Construcciones Prácticas",
    openGraph: {
      type: "website",
      locale: "es_MX",
      siteName: "Construcciones Prácticas",
      title: "Construcciones Prácticas",
      description:
        "Portafolio de arquitectura, proyecto, obra y mantenimiento.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Construcciones Prácticas",
      description:
        "Portafolio de arquitectura, proyecto, obra y mantenimiento.",
    },
    icons: {
      icon: "/brand/construcciones-practicas-display.png",
      shortcut: "/brand/construcciones-practicas-display.png",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Construcciones Prácticas",
    telephone: "+52 747 275 0541",
    url: origin,
    image: `${origin}/brand/construcciones-practicas-display.png`,
    areaServed: "México",
  };

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
