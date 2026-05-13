import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, CheckCircle, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { allDevelopmentsForForm, neighborhoods } from "@/content/developments";
import { campaignName, eventDateLabel, leadWebhookUrl } from "@/content/site";
import { getTrackingPayload } from "@/lib/tracking";
import { leadSchema, type LeadFormData } from "@/lib/schemas";

export function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { nome: "", telefone: "", email: "", bairro: "", empreendimento: "", mensagem: "" },
  });

  useEffect(() => {
    const applyPrefill = (prefill?: { empreendimento?: string; bairro?: string }) => {
      if (prefill?.empreendimento) setValue("empreendimento", prefill.empreendimento);
      if (prefill?.bairro) setValue("bairro", prefill.bairro);
    };

    const savedPrefill = sessionStorage.getItem("sanremo-interest-prefill");
    if (savedPrefill) {
      try { applyPrefill(JSON.parse(savedPrefill)); } catch { /* ignore */ }
    }

    const handlePrefill = (event: Event) => {
      const customEvent = event as CustomEvent<{ empreendimento?: string; bairro?: string }>;
      applyPrefill(customEvent.detail);
    };

    window.addEventListener("sanremo-prefill-form", handlePrefill as EventListener);
    return () => window.removeEventListener("sanremo-prefill-form", handlePrefill as EventListener);
  }, [setValue]);

  async function onSubmit(data: LeadFormData) {
    setLoading(true);
    const payload = {
      ...data,
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

      if (!response.ok) throw new Error("Webhook response was not ok");

      setSuccess(true);
      reset();
    } catch {
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 font-body text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition md:text-sm";

  const inputErrorClass = `${inputClass} border-red-400 focus:ring-red-300`;
  const selectClass = `${inputClass} appearance-none pr-12`;
  const selectErrorClass = `${inputErrorClass} appearance-none pr-12`;

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
          onSubmit={handleSubmit(onSubmit)}
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
            <div>
              <input
                {...register("nome")}
                autoComplete="name"
                placeholder="Seu nome completo"
                className={errors.nome ? inputErrorClass : inputClass}
                maxLength={100}
              />
              {errors.nome && <p className="mt-1 text-xs text-red-500">{errors.nome.message}</p>}
            </div>
            <div>
              <input
                {...register("telefone")}
                autoComplete="tel"
                placeholder="WhatsApp / Telefone"
                className={errors.telefone ? inputErrorClass : inputClass}
                maxLength={20}
              />
              {errors.telefone && <p className="mt-1 text-xs text-red-500">{errors.telefone.message}</p>}
            </div>
          </div>

          <div>
            <input
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="Seu e-mail"
              className={errors.email ? inputErrorClass : inputClass}
              maxLength={255}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="pt-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Interesse no evento
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="relative">
                <Controller
                  name="bairro"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className={errors.bairro ? selectErrorClass : selectClass}
                    >
                      <option value="" disabled>Bairro de interesse</option>
                      {neighborhoods.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  )}
                />
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
              {errors.bairro && <p className="mt-1 text-xs text-red-500">{errors.bairro.message}</p>}
            </div>

            <div className="relative">
              <Controller
                name="empreendimento"
                control={control}
                render={({ field }) => (
                  <select {...field} className={selectClass}>
                    <option value="">Empreendimento (opcional)</option>
                    {allDevelopmentsForForm.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                )}
              />
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <textarea
            {...register("mensagem")}
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
