"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Mail } from "lucide-react";

import { WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/products";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const inputClasses =
  "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm transition-colors outline-none placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40";

const orderTypes = [
  ...categories.map((c) => c.title),
  "Mesa de doces completa",
  "Outro (descrevo na mensagem)",
];

interface OrderData {
  name: string;
  phone: string;
  date: string;
  type: string;
  people: string;
  message: string;
}

const emptyOrder: OrderData = {
  name: "",
  phone: "",
  date: "",
  type: orderTypes[0],
  people: "",
  message: "",
};

function buildMessage(order: OrderData): string {
  const lines = [
    `Olá! Gostaria de pedir um orçamento à ${siteConfig.name}.`,
    `• Nome: ${order.name}`,
    order.phone && `• Contacto: ${order.phone}`,
    `• Tipo de encomenda: ${order.type}`,
    order.date && `• Data pretendida: ${order.date}`,
    order.people && `• Número de pessoas: ${order.people}`,
    order.message && `• Detalhes: ${order.message}`,
  ];
  return lines.filter(Boolean).join("\n");
}

export function OrderForm() {
  const [order, setOrder] = useState<OrderData>(emptyOrder);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof OrderData) => (value: string) =>
    setOrder((prev) => ({ ...prev, [field]: value }));

  const message = useMemo(() => buildMessage(order), [order]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    `Pedido de orçamento — ${order.type}`
  )}&body=${encodeURIComponent(message)}`;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-4xl border border-border/70 bg-card p-7 shadow-sm sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="mb-1.5 block text-sm font-medium">
            O seu nome *
          </label>
          <input
            id="nome"
            name="nome"
            required
            autoComplete="name"
            placeholder="Maria Santos"
            className={inputClasses}
            value={order.name}
            onChange={(e) => set("name")(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="telefone" className="mb-1.5 block text-sm font-medium">
            Telemóvel
          </label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            autoComplete="tel"
            placeholder="912 345 678"
            className={inputClasses}
            value={order.phone}
            onChange={(e) => set("phone")(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tipo" className="mb-1.5 block text-sm font-medium">
            Tipo de encomenda *
          </label>
          <select
            id="tipo"
            name="tipo"
            required
            className={cn(inputClasses, "appearance-none")}
            value={order.type}
            onChange={(e) => set("type")(e.target.value)}
          >
            {orderTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="data" className="mb-1.5 block text-sm font-medium">
            Data pretendida
          </label>
          <input
            id="data"
            name="data"
            type="date"
            className={inputClasses}
            value={order.date}
            onChange={(e) => set("date")(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="pessoas" className="mb-1.5 block text-sm font-medium">
            Número de pessoas
          </label>
          <input
            id="pessoas"
            name="pessoas"
            type="number"
            min="1"
            inputMode="numeric"
            placeholder="20"
            className={inputClasses}
            value={order.people}
            onChange={(e) => set("people")(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="mensagem" className="mb-1.5 block text-sm font-medium">
            Conte-nos o que imagina *
          </label>
          <textarea
            id="mensagem"
            name="mensagem"
            required
            rows={4}
            placeholder="Ex.: bolo de dois andares para 40 pessoas, recheio de frutos vermelhos, decoração simples com flores…"
            className={cn(inputClasses, "resize-y")}
            value={order.message}
            onChange={(e) => set("message")(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          className="h-12 rounded-full bg-[#25D366] px-7 text-base text-white hover:bg-[#1fb457]"
        >
          <WhatsAppIcon data-icon="inline-start" />
          Enviar por WhatsApp
        </Button>
        <a
          href={mailto}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          <Mail className="size-4" aria-hidden="true" />
          Prefiro enviar por e-mail
        </a>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        Ao enviar, abre-se o WhatsApp com a mensagem já escrita — nada é enviado
        sem a sua confirmação. Os dados servem apenas para responder ao seu
        pedido.
      </p>

      {submitted ? (
        <p
          role="status"
          className="mt-4 rounded-xl border border-primary/30 bg-secondary px-4 py-3 text-sm text-foreground"
        >
          Obrigado, {order.name.split(" ")[0] || "amigo doce"}! Se o WhatsApp
          não abriu,{" "}
          <a href={whatsappLink(message)} target="_blank" rel="noreferrer" className="font-medium text-primary underline underline-offset-4">
            toque aqui para tentar de novo
          </a>{" "}
          ou ligue-nos: {siteConfig.phone}.
        </p>
      ) : null}
    </form>
  );
}
