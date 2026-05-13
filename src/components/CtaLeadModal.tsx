import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, ChevronDown, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { allDevelopmentsForForm } from "@/content/developments";
import { campaignName, eventDateLabel, leadWebhookUrl } from "@/content/site";
import { getTrackingPayload } from "@/lib/tracking";
import { modalLeadSchema, type ModalLeadFormData } from "@/lib/schemas";
import { useModal } from "@/context/ModalContext";
import { Countdown } from "@/components/Countdown";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export function CtaLeadModal() {
  const { open, setOpen, trigger, success: submitted, setSuccess, dismiss, markSubmitted } = useModal();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ModalLeadFormData>({
    resolver: zodResolver(modalLeadSchema),
    defaultValues: { nome: "", telefone: "", email: "", empreendimento: "" },
  });

  async function onSubmit(data: ModalLeadFormData) {
    setLoading(true);
    const payload = {
      ...data,
      data_evento: eventDateLabel,
      enviado_em: new Date().toISOString(),
      ...getTrackingPayload(`Modal CTA ${campaignName}`, trigger),
    };

    try {
      const response = await fetch(leadWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Webhook response was not ok");

      markSubmitted();
      setSuccess(true);
      reset();
    } catch {
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-white px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50";
  const inputErrorClass = `${inputClass} border-red-400 focus:ring-red-300`;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen && !submitted) dismiss();
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
          {submitted ? (
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
              <div className="relative">
                <select
                  {...register("empreendimento")}
                  className={`${inputClass} appearance-none pr-12`}
                >
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
