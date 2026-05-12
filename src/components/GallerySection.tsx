import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const slides = [
  {
    url: "/content/developments/live-cacupe/hero/piscina-no-rooftop.webp",
    label: "Piscina no Rooftop com Vista Mar",
    tag: "Área de Lazer",
  },
  {
    url: "/content/developments/live-cacupe/gallery/wine-pub-externo-com-ofuro.webp",
    label: "Wine Bar com Ofurô Privativo",
    tag: "Torre B",
  },
  {
    url: "/content/developments/live-cacupe/gallery/Sala-Yoga.webp",
    label: "Espaço Yoga",
    tag: "Torre A",
  },
  {
    url: "/content/developments/live-cacupe/gallery/academia.webp",
    label: "Academia Completa",
    tag: "Torre A",
  },
  {
    url: "/content/developments/live-cacupe/cover/fachada.webp",
    label: "Fachada — Lumis Empreendimentos",
    tag: "Fachada",
  },
  {
    url: "/content/developments/live-cacupe/gallery/sala.webp",
    label: "Sala de Estar",
    tag: "Interior",
  },
  {
    url: "/content/developments/live-cacupe/gallery/cozinha.webp",
    label: "Cozinha Integrada",
    tag: "Interior",
  },
  {
    url: "/content/developments/live-cacupe/gallery/quarto-casal.webp",
    label: "Suíte Master",
    tag: "Interior",
  },
  {
    url: "/content/developments/live-cacupe/gallery/quarto-casal1.webp",
    label: "Suíte",
    tag: "Interior",
  },
  {
    url: "/content/developments/live-cacupe/gallery/salao-de-festa-externo.webp",
    label: "Salão de Festas — Área Externa",
    tag: "Torre B",
  },
  {
    url: "/content/developments/live-cacupe/gallery/salao-de-festa-interno.webp",
    label: "Salão de Festas — Área Interna",
    tag: "Torre B",
  },
  {
    url: "/content/developments/live-cacupe/gallery/sauna.webp",
    label: "Sauna",
    tag: "Área de Lazer",
  },
  {
    url: "/content/developments/live-cacupe/gallery/coworking.webp",
    label: "Coworking",
    tag: "Torre B",
  },
  {
    url: "/content/developments/live-cacupe/gallery/espaco-kids.png",
    label: "Espaço Kids — Torres A e B",
    tag: "Família",
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export function GallerySection() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [lightbox, setLightbox] = useState(false);
  const [paused, setPaused] = useState(false);

  const paginate = useCallback(
    (dir: number) => {
      setCurrent(([prev]) => {
        const next = (prev + dir + slides.length) % slides.length;
        return [next, dir];
      });
    },
    [],
  );

  useEffect(() => {
    if (paused || lightbox) return;
    const id = setInterval(() => paginate(1), 5000);
    return () => clearInterval(id);
  }, [paused, lightbox, paginate]);

  const slide = slides[current];

  return (
    <section id="galeria" className="section-padding bg-white">
      <div className="container max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-3"
        >
          Galeria do <span className="text-accent">empreendimento</span>
        </motion.h2>
        <p className="text-center text-sm text-muted-foreground mb-8 md:text-base">
          Conheça cada detalhe do Live Cacupé — interiores, lazer e áreas comuns.
        </p>

        {/* carrossel principal */}
        <div
          className="relative overflow-hidden rounded-[24px] bg-navy"
          style={{ aspectRatio: "16/9", maxHeight: 760 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={slide.url}
                alt={slide.label}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* tag + label */}
          <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between p-4 md:p-6">
            <div>
              <span className="inline-block rounded-full bg-accent/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-foreground backdrop-blur-sm md:text-xs">
                {slide.tag}
              </span>
              <p className="mt-1.5 font-heading text-lg font-bold text-white drop-shadow md:text-2xl">
                {slide.label}
              </p>
            </div>
            <button
              onClick={() => setLightbox(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/25"
              aria-label="Ampliar imagem"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>

          {/* setas */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30 md:left-5 md:h-12 md:w-12"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30 md:right-5 md:h-12 md:w-12"
            aria-label="Próxima"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* contador */}
          <div className="absolute right-4 top-4 z-10 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm">
            {current + 1} / {slides.length}
          </div>
        </div>

        {/* dots */}
        <div className="mt-4 flex justify-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent([i, i > current ? 1 : -1])}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-muted-foreground/30"
              }`}
              aria-label={`Ir para imagem ${i + 1}`}
            />
          ))}
        </div>

        {/* thumbnails — visible md+ */}
        <div className="mt-4 hidden gap-2 overflow-x-auto md:flex md:flex-wrap md:justify-center">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrent([i, i > current ? 1 : -1])}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl transition-all ${
                i === current
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={s.url}
                alt={s.label}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4"
            onClick={() => setLightbox(false)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={slide.url}
              alt={slide.label}
              className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white text-2xl hover:bg-white/20"
              onClick={() => setLightbox(false)}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
