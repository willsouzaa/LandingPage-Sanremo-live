import { motion } from "framer-motion";
import { Home, TrendingUp, Star } from "lucide-react";

const stats = [
  {
    icon: Home,
    value: "98,5%",
    label: "Das obras concluídas",
  },
  {
    icon: Star,
    value: "78",
    label: "Unidades exclusivas",
  },
  {
    icon: TrendingUp,
    value: "2 Torres",
    label: "Torre A e Torre B",
  },
];

export function UrgencyBar() {
  return (
    <section className="section-padding bg-[linear-gradient(180deg,rgba(11,29,68,1)_0%,rgba(16,44,88,1)_100%)] text-white">
      <div className="container max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-champagne animate-pulse" />
          Pronto para morar
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-6 max-w-3xl text-lg font-body text-white/80 md:text-xl"
        >
          O Live Cacupé está com as obras quase finalizadas e pronto para receber seus moradores.
          Últimas unidades disponíveis.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 grid grid-cols-3 gap-4 md:gap-8"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <s.icon className="h-6 w-6 text-champagne" />
              </div>
              <p className="font-heading text-2xl font-bold text-champagne md:text-4xl">{s.value}</p>
              <p className="text-xs font-body uppercase tracking-[0.2em] text-white/60 md:text-sm">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.a
          href="#formulario"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 inline-block rounded-xl bg-accent px-10 py-4 font-body text-lg font-semibold text-accent-foreground transition-all hover:scale-105 hover:bg-accent/90"
        >
          Quero garantir minha unidade
        </motion.a>
      </div>
    </section>
  );
}
