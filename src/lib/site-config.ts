export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: string[];
}

export interface Testimonial {
  name: string;
  service: string;
  quote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GalleryItem {
  image: string;
  alt: string;
}

export interface GalleryFeature {
  video: { webm: string; mp4: string };
  poster: string;
  alt: string;
}

// NOTA: horários são provisórios — confirmar com a Annelux antes de publicar.
export const siteConfig = {
  name: "Annelux",
  tagline: "Estética e Bem-Estar",
  // Trocar pelo domínio final quando existir (ex.: https://annelux.pt)
  url: "https://annelux.vercel.app",
  description:
    "Annelux — Estética e Bem-Estar em Fátima. Unhas de gel, manicure e pedicure, limpeza de pele, lifting de pestanas, sobrancelhas e depilação a laser e a cera, com marcação fácil por WhatsApp.",
  phoneDisplay: "911 766 814",
  phoneHref: "tel:+351911766814",
  whatsappHref:
    "https://wa.me/351911766814?text=Ol%C3%A1%21%20Gostaria%20de%20fazer%20uma%20marca%C3%A7%C3%A3o%20na%20Annelux.",
  location: {
    city: "Fátima",
    region: "Ourém, Portugal",
    mapsUrl: "https://maps.app.goo.gl/tvyUSFvVr45vtvG6A",
  },
  // Horário conforme o letreiro na porta do salão.
  hours: [
    { days: "Abertura", time: "09:30" },
    { days: "Pausa de almoço", time: "13:00 — 14:30" },
    { days: "Fecho", time: "19:00" },
  ],
  // Instagram: adicionar aqui quando o perfil real for confirmado, p.ex.
  // instagramHandle: "annelux.estetica",
  // instagramUrl: "https://www.instagram.com/annelux.estetica/",
} as const;

export const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contactos", href: "#contactos" },
] as const;

// Serviços conforme a tabela afixada na montra ("Mãos e Pés" + "Cuidados e Bem-Estar").
export const services: Service[] = [
  {
    id: "unhas-gel",
    title: "Unhas de Gel & Verniz Gel",
    description:
      "Aplicação de gel e verniz gel com acabamento impecável — cor perfeita que dura semanas sem perder o brilho.",
    image: "/images/svc-gel.webp",
    imageAlt: "Unhas de gel com francesa e detalhes dourados",
    highlights: ["Aplicação, remoção e manutenção", "Formato e cor à sua escolha"],
  },
  {
    id: "manicure-pedicure",
    title: "Manicure & Pedicure Tradicional",
    description:
      "O cuidado clássico das mãos e dos pés, feito com calma e atenção ao detalhe, do início ao fim.",
    image: "/images/svc-pedicure.webp",
    imageAlt: "Pedicure com toalhas e flor de orquídea",
    highlights: ["Mãos e pés renovados", "Com calma e sem pressas"],
  },
  {
    id: "limpeza-pele",
    title: "Limpeza de Pele",
    description:
      "Um ritual de cuidado facial que devolve a luminosidade e a suavidade naturais da sua pele.",
    image: "/images/svc-facial.webp",
    imageAlt: "Cliente relaxada durante um tratamento de limpeza de pele",
    highlights: ["Pele renovada e luminosa", "Protocolo adaptado a si"],
  },
  {
    id: "lifting",
    title: "Lifting de Pestanas",
    description:
      "Curvatura e definição das suas pestanas naturais — acorde todos os dias com o olhar levantado.",
    image: "/images/svc-lashes.webp",
    imageAlt: "Olho fechado com pestanas curvadas e definidas",
    highlights: ["Sem extensões", "Efeito natural e duradouro"],
  },
  {
    id: "sobrancelhas",
    title: "Laminação & Design de Sobrancelhas",
    description:
      "Sobrancelhas desenhadas à medida do seu rosto, com técnica de precisão e acabamento natural.",
    image: "/images/svc-brows.webp",
    imageAlt: "Sobrancelha perfeitamente desenhada a ser penteada",
    highlights: ["Visagismo personalizado", "Laminação disponível"],
  },
  {
    id: "depilacao",
    title: "Depilação a Laser & a Cera",
    description:
      "Pele suave e cuidada com a técnica certa para si — depilação profissional a laser ou a cera.",
    image: "/images/svc-depilacao.webp",
    imageAlt: "Pernas suaves e luminosas numa marquesa de estética",
    highlights: ["Laser e cera profissional", "Conforto e resultados"],
  },
];

// EXEMPLOS ilustrativos — substituir por avaliações reais do Google Maps antes de publicar.
export const testimonials: Testimonial[] = [
  {
    name: "Sofia M.",
    service: "Unhas de gel",
    quote:
      "Um atendimento impecável e um espaço lindíssimo. As minhas unhas nunca duraram tanto tempo perfeitas.",
  },
  {
    name: "Carla R.",
    service: "Extensão de pestanas",
    quote:
      "Saí de lá a sentir-me outra pessoa. O efeito é super natural e recebo elogios todos os dias.",
  },
  {
    name: "Inês F.",
    service: "Pedicure spa",
    quote:
      "O momento da semana só para mim. Profissionalismo, carinho e um resultado sempre acima das expectativas.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Preciso de marcação prévia?",
    answer:
      "Sim, trabalhamos por marcação para lhe dedicar toda a atenção que merece. Envie mensagem por WhatsApp para o 911 766 814 e encontramos o horário ideal para si.",
  },
  {
    question: "Quanto tempo dura o verniz gel?",
    answer:
      "Com os cuidados adequados, o verniz gel mantém-se impecável durante 2 a 3 semanas, sem lascar e sem perder o brilho.",
  },
  {
    question: "O lifting de pestanas danifica as pestanas naturais?",
    answer:
      "Não. O lifting trabalha as suas próprias pestanas com produtos adequados, realçando a curvatura natural sem extensões nem danos.",
  },
  {
    question: "Onde fica a Annelux?",
    answer:
      "Estamos em Fátima, no concelho de Ourém. Abra a nossa localização no Google Maps e chegue até nós em poucos minutos.",
  },
];

// Vídeo principal da galeria (Google Flow): a manicure a trabalhar com uma cliente.
export const galleryFeature: GalleryFeature = {
  video: { webm: "/videos/gallery-feature.webm", mp4: "/videos/gallery-feature.mp4" },
  poster: "/images/gallery-feature-poster.webp",
  alt: "A nossa manicure a cuidar das unhas de uma cliente, à luz da janela",
};

export const galleryItems: GalleryItem[] = [
  { image: "/images/gal-1.webp", alt: "Mãos com unhas de gel nude a segurar uma chávena de café" },
  { image: "/images/gal-8.webp", alt: "Unhas vermelho-escuras acabadas de fazer, junto a um café" },
  { image: "/images/svc-manicure.webp", alt: "Aplicação de verniz gel numa manicure profissional" },
  { image: "/images/gal-9.webp", alt: "Manicure a limar as unhas de uma cliente" },
  { image: "/images/gal-10.webp", alt: "Mãos de clientes com manicure em tons nude" },
  { image: "/images/gal-5.webp", alt: "Mão de cliente no catalisador UV durante a manicure" },
];
