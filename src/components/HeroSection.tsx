import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import logoLiveCacupe from "@/assets/logo-lumis.webp";

import logoSanremo from "@/assets/Sanremo.png";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* imagem de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/content/developments/live-cacupe/hero/fachada.webp')" }}
      />

      {/* overlay degradê */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy/92" />

      {/* brilho decorativo */}
      <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-champagne/15 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-champagne/10 blur-3xl" />
      <div className="absolute bottom-8 left-1/2 h-40 w-[32rem] -translate-x-1/2 rounded-full bg-black/20 blur-3xl" />

      <div className="relative z-10 container flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 py-16 text-center md:py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 flex w-fit max-w-full items-center justify-center gap-2.5 md:mb-8 md:gap-6"
        >
          <img
            src={logoSanremo}
            alt="San Remo"
            className="h-9 w-auto max-w-[38vw] drop-shadow-2xl md:h-20 md:max-w-none"
          />
          <div className="h-8 w-px bg-white/35 md:h-16" />
          <img
            src={logoLiveCacupe}
            alt="Live Cacupé"
            className="h-10 w-auto max-w-[42vw] drop-shadow-2xl md:h-24 md:max-w-none"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mx-auto mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-champagne/30 bg-white/12 px-3 py-1.5 shadow-lg backdrop-blur-sm md:mb-5 md:px-4"
        >
          <span className="h-2 w-2 rounded-full bg-champagne animate-pulse" />
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-champagne md:text-xs">
            Pronto para morar • Cacupé • Florianópolis
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mb-4 text-[2.4rem] font-heading font-bold leading-[1.05] text-primary-foreground md:mb-5 md:text-5xl lg:text-7xl"
        >
          O privilégio de viver com{" "}
          <span className="text-champagne drop-shadow-[0_2px_12px_rgba(255,235,200,0.18)]">
            vista para o mar
          </span>{" "}
          e o pôr do sol mais bonito da ilha
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mx-auto mb-8 max-w-2xl text-base text-primary-foreground/80 md:mb-10 md:text-xl"
        >
          Arquitetura biofílica, exclusividade e natureza integrada. Lumis Empreendimentos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#formulario"
            className="min-w-[280px] rounded-xl bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-xl transition-all hover:scale-[1.03] hover:bg-accent/90"
          >
            Quero registrar meu interesse
          </a>

          <a
            href="#empreendimentos"
            className="min-w-[240px] rounded-xl border-2 border-primary-foreground/25 bg-white/5 px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:border-primary-foreground/60 hover:bg-white/10 md:py-4 md:text-lg"
          >
            Conhecer o empreendimento
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="mt-5 text-sm text-primary-foreground/70 md:mt-6 md:text-base"
        >
          98,5% das obras concluídas • Atendimento exclusivo por ordem de cadastro.
        </motion.p>
      </div>

      <motion.a
        href="#empreendimentos"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-primary-foreground/75 transition hover:text-primary-foreground md:bottom-16"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}
