import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { conditions } from "@/content/conditions";

export function ConditionsSection() {
  return (
    <section className="section-padding bg-navy text-navy-foreground">
      <div className="container max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold mb-4"
        >
          Regras do{" "}
          <span className="text-accent">Pregão de Guerra Lumis</span>
        </motion.h2>
        <p className="text-navy-foreground/70 font-body mb-10 max-w-lg mx-auto">
          Entenda como funciona o acesso VIP e as condições especiais do dia 30/05/2026.
        </p>

        <div className="space-y-4">
          {conditions.map((c, i) => (
            <motion.div
              key={c.letter}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5 text-left"
            >
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="font-body text-xs uppercase tracking-wider text-champagne">
                  Regra {c.letter}
                </span>
                <p className="font-body text-navy-foreground/90 mt-1">{c.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
