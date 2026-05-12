import { motion } from "framer-motion";

const amenities = [
  {
    image: "/content/developments/live-cacupe/hero/piscina-no-rooftop.webp",
    label: "Lazer Premium",
    title: "Rooftop com piscina vista mar",
    description: "Piscina adulto e infantil no rooftop com vista panorâmica para o mar e o pôr do sol.",
  },
  {
    image: "/content/developments/live-cacupe/gallery/wine-pub-externo-com-ofuro.webp",
    label: "Exclusividade",
    title: "Wine pub com ofurô privativo",
    description: "Espaço gourmet externo com ofurô, ideal para momentos de relaxamento com vista para a natureza.",
  },
  {
    image: "/content/developments/live-cacupe/gallery/Sala-Yoga.webp",
    label: "Bem-estar",
    title: "Sala de yoga e meditação",
    description: "Espaço dedicado ao equilíbrio e bem-estar, com iluminação natural e conexão com o entorno verde.",
  },
  {
    image: "/content/developments/live-cacupe/gallery/academia.webp",
    label: "Fitness",
    title: "Academia completa",
    description: "Equipamentos modernos com vista privilegiada para manter sua rotina de saúde no próprio condomínio.",
  },
];

export function ConditionsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-4"
        >
          Lazer e <span className="text-accent">bem-estar completo</span>
        </motion.h2>
        <p className="text-muted-foreground font-body mb-12 max-w-lg mx-auto text-center">
          Uma área de lazer pensada para cada momento do seu dia, com sofisticação e integração à natureza.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group overflow-hidden rounded-[20px] border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-accent/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-foreground backdrop-blur-sm">
                  {item.label}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-heading text-base font-bold text-foreground">{item.title}</h3>
                <p className="mt-1.5 font-body text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
