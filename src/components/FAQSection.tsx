import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "O que é a Promoção Lumis?",
    a: "É uma campanha comercial para apresentar condições especiais em empreendimentos selecionados da Lumis em Florianópolis.",
  },
  {
    q: "As condições são válidas por quanto tempo?",
    a: "As condições da campanha são organizadas para atendimento prioritário em 30/05/2026 e dependem da disponibilidade das unidades.",
  },
  {
    q: "Preciso comprar no dia?",
    a: "Você não precisa tomar decisão sem orientação. O cadastro garante contato prioritário para entender disponibilidade, valores e melhor opção para o seu perfil.",
  },
  {
    q: "Quais empreendimentos participam?",
    a: "Live Cacupé, Urban Lumis Centro, Home Cacupé e Now by Lumis participam da comunicação da campanha com oportunidades selecionadas.",
  },
  {
    q: "Como recebo atendimento?",
    a: "Preencha o formulário nesta página e nossa equipe entrará em contato pelo canal de sua preferência.",
  },
];

export function FAQSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-10"
        >
          Perguntas frequentes
        </motion.h2>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-5">
              <AccordionTrigger className="font-body font-semibold text-foreground text-left">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
