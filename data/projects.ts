export type Project = {
  slug: string;
  name: string;
  location?: string;
  client?: "GESCRAP";
  cover: string;
  images: string[];
  position?: string;
};

export const projects: Project[] = [
  {
    slug: "casa-doporto",
    name: "Casa Doporto",
    location: "Bosques de Quauyocan, Puebla",
    cover: "/projects/casa-doporto.webp",
    images: ["/projects/casa-doporto.webp"],
    position: "center",
  },
  {
    slug: "casa-tlaxcala",
    name: "Casa Tlaxcala",
    location: "Tlaxcala, Tlaxcala",
    cover: "/projects/casa-tlaxcala.webp",
    images: [
      "/projects/casa-tlaxcala.webp",
      "/projects/casa-tlaxcala-noche.webp",
    ],
    position: "center",
  },
  {
    slug: "cocina-aguilar",
    name: "Cocina Aguilar",
    location: "Puebla, Puebla",
    cover: "/projects/cocina-aguilar-despues.webp",
    images: [
      "/projects/cocina-aguilar.webp",
      "/projects/cocina-aguilar-antes.webp",
      "/projects/cocina-aguilar-despues.webp",
    ],
    position: "center",
  },
  {
    slug: "construccion-barda-perimetral",
    name: "Construcción de Barda Perimetral",
    location: "Cuautlancingo, Puebla",
    client: "GESCRAP",
    cover: "/projects/barda-perimetral-1.webp",
    images: [
      "/projects/barda-perimetral-1.webp",
      "/projects/barda-perimetral-2.webp",
      "/projects/gescrap.webp",
    ],
    position: "center",
  },
  {
    slug: "plataforma-prensa",
    name: "Plataforma de Prensa",
    location: "Cuautlancingo, Puebla",
    client: "GESCRAP",
    cover: "/projects/plataforma-prensa-1.webp",
    images: [
      "/projects/plataforma-prensa-1.webp",
      "/projects/plataforma-prensa-2.webp",
    ],
    position: "center",
  },
  {
    slug: "burger-king",
    name: "Burger King",
    location: "Puebla, Tlaxcala",
    cover: "/projects/burger-king.webp",
    images: ["/projects/burger-king.webp"],
    position: "center",
  },
  {
    slug: "moschata",
    name: "Moschata",
    location: "San Pedro Cholula, Puebla",
    cover: "/projects/moschata.webp",
    images: [
      "/projects/moschata.webp",
      "/projects/moschata-interior.webp",
      "/projects/moschata-barra.webp",
    ],
    position: "center",
  },
  {
    slug: "tubo-lamp",
    name: "Tubo Lamp",
    cover: "/projects/tubo-lamp.webp",
    images: [
      "/projects/tubo-lamp.webp",
      "/projects/mobiliario.webp",
      "/projects/mobiliario-interior.webp",
      "/projects/lamparas.webp",
      "/projects/iluminacion-interior.webp",
    ],
    position: "center",
  },
];
