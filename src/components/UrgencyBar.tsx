import { Clock } from "lucide-react";
import { Countdown } from "./Countdown";

export function UrgencyBar() {
  return (
    <section className="section-padding bg-[linear-gradient(180deg,hsl(154,40%,12%)_0%,hsl(154,38%,17%)_100%)] text-white">
      <div className="container max-w-5xl text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
          <Clock className="h-4 w-4 shrink-0" />
          Pregão de Guerra Lumis
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-lg font-body text-white/80 md:text-xl">
          Cadastre-se agora e garanta acesso VIP — atendimento das 8h às 9h com condições que nunca houve antes na história da Lumis.
        </p>
        <div className="mt-8">
          <p className="mb-4 text-sm font-body uppercase tracking-[0.3em] text-white/60">
            Faltam
          </p>
          <div className="flex justify-center">
            <Countdown />
          </div>
          <p className="mt-5 font-heading text-2xl font-bold text-champagne md:text-4xl">
            30 de Maio de 2026
          </p>
        </div>
      </div>
    </section>
  );
}
