export interface Step {
  title: string;
  description: string;
}

export const orderSteps: Step[] = [
  {
    title: "Conte-nos a sua festa",
    description:
      "Envie mensagem por WhatsApp, e-mail ou passe na loja. Diga-nos a data, o número de pessoas e o que imagina.",
  },
  {
    title: "Provamos e afinamos",
    description:
      "Propomos sabores, decoração e orçamento. Para bolos de casamento, marcamos uma prova sem compromisso.",
  },
  {
    title: "Entregamos no grande dia",
    description:
      "Levante na loja ou receba em casa — entregamos na Grande Lisboa com o bolo montado e pronto a servir.",
  },
];

export interface Testimonial {
  quote: string;
  author: string;
  context: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "O bolo do nosso casamento estava lindíssimo e, mais importante, era o melhor bolo que já comi. Os convidados ainda falam dele.",
    author: "Marta & Rui",
    context: "Bolo de casamento, setembro",
  },
  {
    quote:
      "Encomendo a tarte de amêndoa todas as semanas. É igual à da minha avó — e eu não digo isto de ânimo leve.",
    author: "Dona Fernanda",
    context: "Cliente de todas as sextas-feiras",
  },
  {
    quote:
      "Pedimos 120 mini pastéis de nata para um evento da empresa. Chegaram quentes, a horas, e desapareceram em dez minutos.",
    author: "Pedro M.",
    context: "Evento de empresa",
  },
];

export interface Value {
  title: string;
  description: string;
}

export const values: Value[] = [
  {
    title: "Ingredientes de verdade",
    description:
      "Manteiga dos Açores, ovos de campo, fruta da época dos mercados de Lisboa. Nada de pré-misturas.",
  },
  {
    title: "Feito à mão, todos os dias",
    description:
      "A massa folhada é estendida de madrugada e o que não se vende ao dia não volta à vitrine.",
  },
  {
    title: "Receitas de família",
    description:
      "Três gerações de cadernos de receitas, afinadas ao longo de quinze anos de balcão.",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const orderFaqs: Faq[] = [
  {
    question: "Com quanta antecedência devo encomendar?",
    answer:
      "Bolos caseiros e tartes: 48 horas. Bolos de aniversário decorados: 1 semana. Bolos de casamento: idealmente 4 a 6 semanas, para haver tempo de prova.",
  },
  {
    question: "Fazem entregas?",
    answer:
      "Sim, entregamos na Grande Lisboa. A entrega de bolos de festa inclui montagem no local. O custo depende da distância e é confirmado no orçamento.",
  },
  {
    question: "Têm opções sem glúten ou sem lactose?",
    answer:
      "Temos receitas adaptadas para a maioria dos bolos caseiros e alguns doces. Avise-nos ao encomendar — a cozinha não é 100% isenta de vestígios.",
  },
  {
    question: "Como funciona o pagamento?",
    answer:
      "Encomendas de festa confirmam-se com um sinal de 30% (MB WAY ou transferência). O restante é pago no levantamento ou na entrega.",
  },
  {
    question: "Posso provar antes de encomendar?",
    answer:
      "Para bolos de casamento sim — a prova está incluída. Para outros bolos, há sempre fatias na vitrine para conhecer os sabores.",
  },
];
