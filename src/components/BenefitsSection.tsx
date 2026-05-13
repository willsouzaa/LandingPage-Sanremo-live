import { useRef } from "react";
import { motion } from "framer-motion";
import { benefits } from "@/content/benefits";

export function BenefitsSection() {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleCarouselWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 640) return;

    const container = carouselRef.current;
    if (!container) return;

    const movement = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    if (Math.abs(movement) < 10) return;

    event.preventDefault();

    const firstCard = container.firstElementChild as HTMLElement | null;
    if (!firstCard) return;

    const styles = window.getComputedStyle(container);
    const gap = parseFloat(styles.columnGap || styles.gap || "12");
    const direction = movement > 0 ? 1 : -1;

    container.scrollBy({
      left: direction * (firstCard.offsetWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section className="section-padding bg-navy text-navy-foreground">
      <div className="container max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-center text-3xl font-heading font-bold md:text-4xl"
        >
          Vantagens da <span className="text-accent">Promoção Lumis</span>
        </motion.h2>
        <p className="mx-auto mb-12 max-w-xl text-center font-body text-navy-foreground/72">
          Uma campanha comercial para conhecer oportunidades reais em empreendimentos selecionados.
        </p>

        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-navy-foreground/65 md:hidden">
          Deslize para ver mais vantagens
        </p>

        <div
          ref={carouselRef}
          onWheel={handleCarouselWheel}
          className="no-scrollbar -mx-3 flex gap-3 overflow-x-auto px-3 pb-3 snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
        >
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`w-[74vw] max-w-[292px] shrink-0 snap-center snap-always rounded-xl border p-6 text-center text-foreground transition-all hover:-translate-y-1 hover:shadow-lg sm:w-auto sm:max-w-none sm:shrink ${b.highlight ? "border-amber-400 bg-amber-50 ring-1 ring-amber-300" : "border-white/10 bg-white"}`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${b.highlight ? "bg-amber-100" : "bg-primary/10"}`}>
                <b.icon className={`w-7 h-7 ${b.highlight ? "text-amber-600" : "text-primary"}`} />
              </div>
              {b.highlight && (
                <span className="inline-block mb-2 rounded-full bg-amber-400 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-900">
                  Exclusivo VIP
                </span>
              )}
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{b.title}</h3>
              <p className="text-muted-foreground font-body text-sm">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
