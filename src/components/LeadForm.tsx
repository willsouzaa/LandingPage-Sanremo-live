import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, ChevronDown } from "lucide-react";
import { allDevelopmentsForForm, neighborhoods } from "@/content/developments";
import { campaignName, eventDateLabel, leadWebhookUrl } from "@/content/site";

function inferTrafficSource(url: URL, referrer: string) {
  const utmSource = url.searchParams.get("utm_source");
  if (utmSource) return utmSource.toLowerCase();

  if (url.searchParams.get("gclid")) return "google_ads";
  if (url.searchParams.get("fbclid")) return "facebook_ads";
  if (url.searchParams.get("ttclid")) return "tiktok_ads";

  const ref = referrer.toLowerCase();
  if (ref.includes("google.")) return "google";
  if (ref.includes("instagram.")) return "instagram";
  if (ref.includes("facebook.")) return "facebook";
  if (ref.includes("linkedin.")) return "linkedin";
  if (ref.includes("tiktok.")) return "tiktok";
  if (ref.includes("bing.")) return "bing";

  return "direto";
}

function getTrackingPayload() {
  const url = new URL(window.location.href);
  const referrer = document.referrer || "";

  return {
    origem: `Landing Page ${campaignName}`,
    origem_detectada: inferTrafficSource(url, referrer),
    url_pagina: url.href,
    url_origem: referrer || null,
    path: url.pathname,
    querystring: url.search,
    utm_source: url.searchParams.get("utm_source"),
    utm_medium: url.searchParams.get("utm_medium"),
    utm_campaign: url.searchParams.get("utm_campaign"),
    utm_content: url.searchParams.get("utm_content"),
    utm_term: url.searchParams.get("utm_term"),
    gclid: url.searchParams.get("gclid"),
    fbclid: url.searchParams.get("fbclid"),
    ttclid: url.searchParams.get("ttclid"),
  };
}

export function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [selectedDevelopment, setSelectedDevelopment] = useState("");

  const allDevs = allDevelopmentsForForm;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      nome: form.get("nome"),
      telefone: form.get("telefone"),
      email: form.get("email"),
      bairro: form.get("bairro"),
      empreendimento: form.get("empreendimento"),
      atendimento: form.get("atendimento"),
      mensagem: form.get("mensagem"),
      data_evento: eventDateLabel,
      enviado_em: new Date().toISOString(),
      ...getTrackingPayload(),
    };

    try {
      const response = await fetch(leadWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Webhook response was not ok");
      }

      setSuccess(true);
      e.currentTarget.reset();
    } catch {
      alert("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition md:text-sm";

  const selectClass = `${inputClass} appearance-none pr-12`;

  useEffect(() => {
    const applyPrefill = (prefill?: { empreendimento?: string; bairro?: string }) => {
      setSelectedDevelopment(prefill?.empreendimento ?? "");
      setSelectedNeighborhood(prefill?.bairro ?? "");
    };

    const savedPrefill = sessionStorage.getItem("sanremo-interest-prefill");
    if (savedPrefill) {
      try {
        applyPrefill(JSON.parse(savedPrefill));
      } catch {
        applyPrefill();
      }
    }

    const handlePrefill = (event: Event) => {
      const customEvent = event as CustomEvent<{ empreendimento?: string; bairro?: string }>;
      applyPrefill(customEvent.detail);
    };

    window.addEventListener("sanremo-prefill-form", handlePrefill as EventListener);

    return () => {
      window.removeEventListener("sanremo-prefill-form", handlePrefill as EventListener);
    };
  }, []);

  if (success) {
    return (
      <section id="formulario" className="section-padding bg-card">
        <div className="container max-w-2xl text-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
              Interesse registrado!
            </h2>
            <p className="text-muted-foreground font-body">
              Nossa equipe entrará em contato em breve com as condições da {campaignName} - {eventDateLabel}.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario" className="section-padding bg-card">
      <div className="container max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-2 text-center text-3xl font-heading font-bold text-foreground md:text-4xl"
        >
          Garanta seu <span className="text-accent">acesso VIP</span>
        </motion.h2>
        <p className="mb-3 text-center font-body text-muted-foreground md:mb-4">
          Preencha o formulário e entre na hora VIP — atendimento das 8h às 9h, antes do público geral.
        </p>
        <div className="mb-8 flex items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 md:mb-10">
          <span className="text-amber-500 text-lg">★</span>
          <p className="font-body text-sm font-semibold text-foreground">
            Clientes VIP têm acesso às condições da <strong>tabela AZUL</strong> antes que esgote — 30/05/2026.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 rounded-[28px] border border-border bg-background p-5 shadow-sm md:p-7"
        >
          <div className="mb-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Seus dados
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              name="nome"
              autoComplete="name"
              required
              placeholder="Seu nome completo"
              className={inputClass}
              maxLength={100}
            />
            <input
              name="telefone"
              autoComplete="tel"
              required
              placeholder="WhatsApp / Telefone"
              className={inputClass}
              maxLength={20}
            />
          </div>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Seu e-mail"
            className={inputClass}
            maxLength={255}
          />

          <div className="pt-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Interesse no evento
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <select
                name="bairro"
                required
                className={selectClass}
                value={selectedNeighborhood}
                onChange={(event) => setSelectedNeighborhood(event.target.value)}
              >
                <option value="" disabled>Bairro de interesse</option>
                {neighborhoods.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
            <div className="relative">
              <select
                name="empreendimento"
                className={selectClass}
                value={selectedDevelopment}
                onChange={(event) => setSelectedDevelopment(event.target.value)}
              >
                <option value="">Empreendimento (opcional)</option>
                {allDevs.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="relative">
            <select name="atendimento" className={selectClass} defaultValue="">
              <option value="">Preferência de atendimento</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="ligacao">Ligação</option>
              <option value="email">E-mail</option>
              <option value="presencial">Presencial</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>

          <textarea
            name="mensagem"
            rows={3}
            placeholder="Mensagem (opcional)"
            className={inputClass}
            maxLength={1000}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold py-4 rounded-lg text-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            {loading ? "Enviando..." : "Quero meu acesso VIP"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
