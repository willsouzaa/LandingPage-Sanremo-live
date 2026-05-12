import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const highlights = [
  "2 torres com 78 unidades exclusivas",
  "Arquitetura biofílica assinada pela ARK7",
  "Piscina no rooftop com vista para o mar",
  "Wine pub com ofurô privativo",
  "Espaços de coworking, yoga e academia",
  "Pronto para morar — obra 98,5% concluída",
];

export function VideoSection() {
  return (
    <section className="section-padding bg-navy text-white overflow-hidden">
      <div className="container max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* vídeo */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[24px] overflow-hidden shadow-2xl aspect-video bg-black"
          >
            <iframe
              src="https://www.youtube.com/embed/5isz6MCszqM?si=Yr26NccNtR85m1g7"
              title="Live Cacupé — Lumis Empreendimentos"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </motion.div>

          {/* conteúdo */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block rounded-full border border-champagne/30 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-champagne backdrop-blur-sm md:text-xs mb-5">
              Cacupé · Florianópolis
            </span>

            <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight mb-4">
              Viva o melhor da{" "}
              <span className="text-champagne">ilha em um único endereço</span>
            </h2>

            <p className="text-white/75 font-body text-base md:text-lg mb-8 leading-relaxed">
              O Live Cacupé une natureza, arquitetura e exclusividade em um condomínio
              pronto para morar, com infraestrutura completa de lazer e localização
              privilegiada às margens da Baía Norte.
            </p>

            <ul className="space-y-3 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-champagne mt-0.5" />
                  <span className="text-white/85 font-body text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#formulario"
              className="inline-block rounded-xl bg-accent px-8 py-4 text-base font-bold text-accent-foreground shadow-lg transition-all hover:scale-[1.03] hover:bg-accent/90 md:text-lg"
            >
              Quero saber mais
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
