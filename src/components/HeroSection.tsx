import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/lumis/lumis-hero.webp";
import logoSanremo from "@/assets/Sanremo.png";
import logoLumis from "@/assets/lumis/lumis-logo.png";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,39,34,0.95)_0%,rgba(24,39,34,0.84)_42%,rgba(24,39,34,0.44)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#182722] to-transparent" />

      <div className="relative z-10 container flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center md:py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 flex w-fit max-w-full items-center justify-center gap-3 md:mb-8 md:gap-6"
        >
          <img
            src={logoSanremo}
            alt="San Remo"
            className="h-10 w-auto max-w-[38vw] brightness-0 invert drop-shadow-2xl md:h-20 md:max-w-none"
          />
          <div className="h-9 w-px bg-white/35 md:h-16" />
          <img
            src={logoLumis}
            alt="Lumis Construtora"
            className="h-12 w-auto max-w-[38vw] brightness-0 invert drop-shadow-2xl md:h-20 md:max-w-none"
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
            Pregão de Guerra Lumis • 30/05/2026 • Acesso VIP 8h
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mx-auto mb-4 max-w-4xl text-[2.35rem] font-heading font-bold leading-[1.05] text-primary-foreground md:mb-5 md:text-5xl lg:text-7xl"
        >
          Uma condição{" "}
          <span className="text-champagne drop-shadow-[0_2px_12px_rgba(255,235,200,0.18)]">
            que nunca houve antes
          </span>{" "}
          na história da Lumis
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#formulario"
            className="min-w-[280px] rounded-xl bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-xl transition-all hover:scale-[1.03] hover:bg-accent/90"
          >
            Quero meu acesso VIP
          </a>

          <a
            href="#empreendimentos"
            className="min-w-[240px] rounded-xl border-2 border-primary-foreground/25 bg-white/5 px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:border-primary-foreground/60 hover:bg-white/10 md:py-4 md:text-lg"
          >
            Ver oportunidades
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="mx-auto mt-5 max-w-xl text-sm text-primary-foreground/70 md:mt-6 md:text-base"
        >
          Cadastre-se e garanta acesso VIP prioritário — atendimento das 8h às 9h, uma hora antes do público geral.
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
