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

// NOTA: horários são provisórios — confirmar com a Annelux antes de publicar.
export const siteConfig = {
  name: "Annelux",
  tagline: "Estética e Bem-Estar",
  // Trocar pelo domínio final quando existir (ex.: https://annelux.pt)
  url: "https://annelux.vercel.app",
  description:
    "Annelux — Estética e Bem-Estar em Fátima. Unhas de gel, manicure, pedicure, extensão de pestanas e design de sobrancelhas, com marcação fácil por WhatsApp.",
  phoneDisplay: "911 766 814",
  phoneHref: "tel:+351911766814",
  whatsappHref:
    "https://wa.me/351911766814?text=Ol%C3%A1%21%20Gostaria%20de%20fazer%20uma%20marca%C3%A7%C3%A3o%20na%20Annelux.",
  location: {
    city: "Fátima",
    region: "Ourém, Portugal",
    mapsUrl: "https://maps.app.goo.gl/tvyUSFvVr45vtvG6A",
  },
  hours: [
    { days: "Segunda a Sexta", time: "09:00 — 19:00" },
    { days: "Sábado", time: "09:00 — 13:00" },
    { days: "Domingo", time: "Encerrado" },
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

export const services: Service[] = [
  {
    id: "manicure",
    title: "Manicure & Verniz Gel",
    description:
      "Cuidado completo das mãos com acabamento impecável e cor que dura semanas sem perder o brilho.",
    image: "/images/svc-manicure.webp",
    imageAlt: "Aplicação de verniz gel numa manicure profissional",
    highlights: ["Duração até 3 semanas", "Acabamento de brilho intenso"],
  },
  {
    id: "unhas-gel",
    title: "Unhas de Gel & Extensões",
    description:
      "Alongamento e construção de unhas à medida — do natural discreto ao design mais arrojado.",
    image: "/images/svc-gel.webp",
    imageAlt: "Unhas de gel com francesa e detalhes dourados",
    highlights: ["Formato à sua escolha", "Nail art personalizada"],
  },
  {
    id: "pedicure",
    title: "Pedicure Spa",
    description:
      "Um ritual de bem-estar para os pés: esfoliação, hidratação profunda e acabamento perfeito.",
    image: "/images/svc-pedicure.webp",
    imageAlt: "Pedicure spa com toalhas e flor de orquídea",
    highlights: ["Ritual relaxante", "Pés renovados"],
  },
  {
    id: "pestanas",
    title: "Extensão de Pestanas",
    description:
      "Olhar intenso e natural todos os dias, com extensões aplicadas fio a fio por mãos especialistas.",
    image: "/images/svc-lashes.webp",
    imageAlt: "Olho fechado com extensões de pestanas de volume",
    highlights: ["Efeito natural ou volume", "Manutenção regular"],
  },
  {
    id: "lifting",
    title: "Lifting de Pestanas",
    description:
      "Curvatura e definição das suas pestanas naturais — acorde todos os dias com o olhar levantado.",
    image: "/images/gal-2.webp",
    imageAlt: "Olho com pestanas curvadas e definidas",
    highlights: ["Sem extensões", "Efeito até 8 semanas"],
  },
  {
    id: "sobrancelhas",
    title: "Design de Sobrancelhas",
    description:
      "Sobrancelhas desenhadas à medida do seu rosto, com técnica de precisão e acabamento natural.",
    image: "/images/svc-brows.webp",
    imageAlt: "Sobrancelha perfeitamente desenhada a ser penteada",
    highlights: ["Visagismo personalizado", "Laminação disponível"],
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
    question: "A extensão de pestanas danifica as pestanas naturais?",
    answer:
      "Não. Quando aplicadas corretamente, fio a fio e com o peso adequado, as extensões respeitam o ciclo natural das suas pestanas.",
  },
  {
    question: "Onde fica a Annelux?",
    answer:
      "Estamos em Fátima, no concelho de Ourém. Abra a nossa localização no Google Maps e chegue até nós em poucos minutos.",
  },
];

export const galleryItems: GalleryItem[] = [
  { image: "/images/gal-1.webp", alt: "Mãos com unhas de gel nude a segurar uma chávena de café" },
  { image: "/images/gal-4.webp", alt: "Unhas de gel bordeaux sobre seda champanhe" },
  { image: "/images/gal-5.webp", alt: "Mão de cliente no catalisador UV durante a manicure" },
  { image: "/images/gal-7.webp", alt: "Unhas rosa peroladas a segurar uma orquídea branca" },
  { image: "/images/gal-6.webp", alt: "Ambiente do salão com toalhas, vela e orquídea" },
  { image: "/images/gal-3.webp", alt: "Produtos de cuidado de unhas em mármore" },
];
