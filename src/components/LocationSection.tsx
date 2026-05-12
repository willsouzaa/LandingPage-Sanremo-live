import { motion } from "framer-motion";
import { MapPin, Car } from "lucide-react";

const proximidades = [
  { tempo: "8 min", local: "Shopping Beira Mar Norte" },
  { tempo: "10 min", local: "Centro de Florianópolis" },
  { tempo: "12 min", local: "Aeroporto Internacional" },
  { tempo: "15 min", local: "Lagoa da Conceição" },
  { tempo: "5 min", local: "Praia do Cacupé" },
  { tempo: "20 min", local: "Costa Norte Shopping" },
];

export function LocationSection() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            Localização <span className="text-accent">privilegiada</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            No coração do Cacupé, com acesso fácil aos principais pontos de Florianópolis
            e a natureza a poucos passos.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          {/* mapa */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[24px] overflow-hidden shadow-lg aspect-video lg:aspect-[4/3] bg-muted"
          >
            <iframe
              title="Localização Live Cacupé"
              src="https://maps.google.com/maps?q=-27.540037,-48.515738&z=15&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* proximidades */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="h-5 w-5 text-accent" />
              <span className="font-heading font-semibold text-foreground text-lg">
                Cacupé, Florianópolis — SC
              </span>
            </div>

            <p className="text-muted-foreground font-body mb-8 leading-relaxed">
              Às margens da Baía Norte, com vista permanente para o mar e integração
              total com a natureza da região. Uma das localizações mais valorizadas da
              Grande Florianópolis.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {proximidades.map(({ tempo, local }) => (
                <div
                  key={local}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Car className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-accent">{tempo}</p>
                    <p className="text-sm font-body text-foreground leading-tight">{local}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://maps.app.goo.gl/WHX1oHAp69CxjpKH9"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl border-2 border-accent px-6 py-3 text-sm font-semibold text-accent transition-all hover:bg-accent hover:text-accent-foreground"
            >
              <MapPin className="h-4 w-4" />
              Ver no Google Maps
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
