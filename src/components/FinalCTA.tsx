import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="section-padding bg-white text-center">
      <div className="container max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-3xl font-heading font-bold text-foreground md:text-4xl"
        >
          Não perca essa oportunidade única
        </motion.h2>
        <p className="mx-auto mb-8 max-w-lg font-body text-muted-foreground">
          A Promoção Lumis acontece em 30/05/2026 com oportunidades selecionadas em Florianópolis. Garanta seu atendimento prioritário.
        </p>
        <a
          href="#formulario"
          className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground font-body font-semibold px-10 py-4 rounded-lg text-lg transition-all hover:scale-105 animate-pulse-glow"
        >
          Quero minha condição especial
        </a>
      </div>
    </section>
  );
}
