import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle, ChevronDown, Clock, Send } from "lucide-react";
import { allDevelopmentsForForm } from "@/content/developments";
import { campaignName, eventDateLabel, leadWebhookUrl } from "@/content/site";
import { Countdown } from "@/components/Countdown";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MODAL_DISMISSED_KEY = "sanremo-cta-modal-dismissed";
const MODAL_SUBMITTED_KEY = "sanremo-cta-modal-submitted";
const MODAL_DELAY_MS = 22000;

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

function getTrackingPayload(trigger: string) {
  const url = new URL(window.location.href);
  const referrer = document.referrer || "";

  return {
    origem: `Modal CTA ${campaignName}`,
    gatilho_modal: trigger,
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

function canShowModal() {
  return (
    sessionStorage.getItem(MODAL_DISMISSED_KEY) !== "true" &&
    sessionStorage.getItem(MODAL_SUBMITTED_KEY) !== "true"
  );
}

export function CtaLeadModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const triggerRef = useRef("tempo_na_pagina");
  const pendingHrefRef = useRef<string | null>(null);

  const openModal = (trigger: string, pendingHref?: string) => {
    if (!canShowModal() || open || success) return;
    triggerRef.current = trigger;
    pendingHrefRef.current = pendingHref ?? null;
    setOpen(true);
  };

  useEffect(() => {
    if (!canShowModal()) return;

    const timer = window.setTimeout(() => {
      openModal("tempo_na_pagina");
    }, MODAL_DELAY_MS);

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        openModal("intencao_de_saida");
      }
    };

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link || !canShowModal()) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) {
        event.preventDefault();
        openModal("clique_saida_pagina", link.href);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [open, success]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const payload = {
      nome: form.get("nome"),
      telefone: form.get("telefone"),
      email: form.get("email"),
      empreendimento: form.get("empreendimento"),
      data_evento: eventDateLabel,
      enviado_em: new Date().toISOString(),
      ...getTrackingPayload(triggerRef.current),
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

      sessionStorage.setItem(MODAL_SUBMITTED_KEY, "true");
      setSuccess(true);
      event.currentTarget.reset();
    } catch {
      alert("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-white px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50";

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen && !success) {
          sessionStorage.setItem(MODAL_DISMISSED_KEY, "true");
          if (pendingHrefRef.current) {
            window.location.href = pendingHrefRef.current;
          }
        }
      }}
    >
      <DialogContent className="max-h-[92svh] max-w-[640px] overflow-y-auto rounded-2xl border-white/10 bg-white p-0 text-foreground shadow-2xl">
        <div className="bg-navy px-6 py-6 text-center text-white md:px-8">
          <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
            <Clock className="h-4 w-4" />
            Promoção Lumis
          </div>
          <DialogHeader className="text-center sm:text-center">
            <DialogTitle className="font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
              Garanta sua condição especial
            </DialogTitle>
            <DialogDescription className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/72 md:text-base">
              Cadastre-se para receber atendimento prioritário nos empreendimentos Lumis selecionados.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-5 flex justify-center">
            <Countdown />
          </div>
          <p className="mt-4 text-sm font-semibold text-champagne">30 de Maio de 2026</p>
        </div>

        <div className="px-6 py-6 md:px-8">
          {success ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">Interesse registrado!</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                Nossa equipe entrará em contato com as condições da campanha.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
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
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Seu e-mail"
                className={inputClass}
                maxLength={255}
              />
              <div className="relative">
                <select name="empreendimento" className={`${inputClass} appearance-none pr-12`} defaultValue="">
                  <option value="">Empreendimento de interesse</option>
                  {allDevelopmentsForForm.map((development) => (
                    <option key={development} value={development}>
                      {development}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-4 font-body text-base font-semibold text-accent-foreground transition hover:bg-accent/90 disabled:opacity-60"
              >
                <Send className="h-5 w-5" />
                {loading ? "Enviando..." : "Receber condições especiais"}
              </button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
