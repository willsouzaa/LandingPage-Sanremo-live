import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight, MapPin } from "lucide-react";
import {
  activeDevelopments,
  neighborhoodFilters,
  type DevelopmentContent,
} from "@/content/developments";

function handleInterestClick(dev: DevelopmentContent) {
  const payload = {
    empreendimento: dev.formLabel,
    bairro: dev.neighborhood,
  };

  sessionStorage.setItem("sanremo-interest-prefill", JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent("sanremo-prefill-form", { detail: payload }));
  document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function DevelopmentCard({ dev }: { dev: DevelopmentContent }) {
  const [coverFailed, setCoverFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const unitDetails = [
    dev.typology ? { label: "Tipologia", value: dev.typology } : null,
    dev.area ? { label: "Área", value: dev.area } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative min-h-[520px] w-[74vw] max-w-[292px] shrink-0 snap-center snap-always overflow-hidden rounded-[28px] border border-border bg-white shadow-none transition-transform hover:-translate-y-1 md:min-h-[540px] md:w-auto md:max-w-none md:shrink md:snap-none md:shadow-[0_10px_28px_rgba(15,23,42,0.08)]"
    >
      <div className="absolute inset-0">
        {dev.coverImage && !coverFailed ? (
          <img
            src={dev.coverImage}
            alt={dev.name}
            onError={() => setCoverFailed(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/40 to-navy">
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/15 via-transparent to-black/80" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/95 via-black/65 to-transparent" />
      </div>

      <div className="absolute left-4 top-4 z-10">
        <div className="inline-flex rounded-2xl bg-white px-4 py-3 shadow-lg">
          {dev.logoImage && !logoFailed ? (
            <img
              src={dev.logoImage}
              alt={`Logo ${dev.projectName}`}
              onError={() => setLogoFailed(true)}
              className="h-10 w-auto object-contain"
            />
          ) : (
            <span className="font-heading text-sm font-bold text-navy">{dev.projectName}</span>
          )}
        </div>
      </div>

      <div className="relative z-10 flex min-h-[520px] flex-col justify-end text-white md:min-h-[540px]">
        <div className="w-full border-t border-white/40 bg-white/12 px-4 py-3 backdrop-blur-[1px]">
          <h3 className="max-w-[12ch] font-heading text-[1.8rem] font-bold leading-none text-white md:text-[2rem]">
            {dev.projectName}
          </h3>
    

          <div className="mt-3 rounded-[18px] bg-white/18 px-4 py-2.5 backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">
              Dados da unidade
            </p>
            <div className="mt-2 space-y-1.5">
              {unitDetails.map((detail) => (
                <p key={detail.label} className="text-sm leading-snug text-white md:text-[15px]">
                  <span className="font-semibold text-white/72">{detail.label}: </span>
                  <span className="font-semibold">{detail.value}</span>
                </p>
              ))}
            </div>
          </div>

          <a
            href="#formulario"
            onClick={(event) => {
              event.preventDefault();
              handleInterestClick(dev);
            }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 text-center font-body text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 md:text-base"
          >
            {dev.cta || "Tenho interesse"}
            <ArrowDownRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function DevelopmentsSection() {
  const [filter, setFilter] = useState("Todos");
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const developments = activeDevelopments;
  const allNeighborhoods = neighborhoodFilters;

  const filtered =
    filter === "Todos" ? developments : developments.filter((d) => d.neighborhood === filter);

  const handleCarouselWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) return;

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
    <section id="empreendimentos" className="section-padding bg-white">
      <div className="container max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-4"
        >
          Empreendimentos em <span className="text-accent">promoção</span>
        </motion.h2>

        <p className="mx-auto mb-4 max-w-2xl text-center text-sm text-muted-foreground md:mb-6 md:text-base">
          Escolha o empreendimento Lumis que combina com seu momento e solicite as condições comerciais da campanha.
        </p>

        <div className="mb-8 -mx-3 overflow-x-auto px-3 pb-2 md:mx-0 md:mb-10 md:overflow-visible md:px-0">
          <div className="flex w-max gap-2 md:w-auto md:flex-wrap md:justify-center">
          {allNeighborhoods.map((neighborhood) => (
            <button
              key={neighborhood}
              onClick={() => setFilter(neighborhood)}
              className={`rounded-full px-5 py-2 font-body text-sm font-medium whitespace-nowrap transition-all ${
                filter === neighborhood
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {neighborhood}
            </button>
          ))}
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              ref={carouselRef}
              onWheel={handleCarouselWheel}
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="no-scrollbar -mx-3 flex gap-3 overflow-x-auto bg-white px-3 pb-3 snap-x snap-mandatory md:mx-auto md:grid md:max-w-6xl md:grid-cols-2 md:justify-center md:gap-5 md:overflow-visible md:bg-transparent md:px-0 md:pb-0 lg:grid-cols-4"
            >
              {filtered.map((d) => (
                <DevelopmentCard key={d.id} dev={d} />
              ))}
            </motion.div>
          </AnimatePresence>
          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground md:hidden">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
            Deslize para o lado
            <span className="h-1.5 w-1.5 rounded-full bg-primary/35" />
          </div>
        </div>
      </div>
    </section>
  );
}
