import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "O que é o Live Cacupé?",
    a: "O Live Cacupé é um residencial de alto padrão desenvolvido pela Lumis Empreendimentos, localizado no bairro Cacupé em Florianópolis/SC. São 78 unidades distribuídas em 2 torres (A e B), com tipologias que incluem apartamentos, lofts, duplex, garden e giardino.",
  },
  {
    q: "Qual é o status da obra?",
    a: "A obra está 98,5% concluída e pronta para morar. A entrega comercial foi em abril de 2026. Você pode se mudar praticamente de imediato.",
  },
  {
    q: "Quais são as tipologias e metragens disponíveis?",
    a: "O empreendimento oferece apartamentos, lofts, duplex, garden e giardino com áreas privativas que variam de 76 m² a 141 m². Há opções de 1, 2 e 3 quartos, com 1 suíte e 1 vaga de garagem.",
  },
  {
    q: "Quais os valores das unidades?",
    a: "Os valores partem de R$ 1.346.063 para um apartamento de 77 m². Há opções até R$ 2.202.649 para unidades garden de 141 m². Entre em contato para receber a tabela atualizada.",
  },
  {
    q: "Onde fica o Live Cacupé e como é a localização?",
    a: "O empreendimento fica na Estrada Haroldo Soares Glavan 566, no bairro Cacupé — bairro nobre, tranquilo e reservado. Está a 3 min da SC-401, 5 min do SESC e ACATE, 10 min de Jurerê Internacional e 15 min do centro de Florianópolis.",
  },
  {
    q: "Quais são os diferenciais do condomínio?",
    a: "O condomínio conta com rooftop com piscina vista mar, ofurô privativo, wine pub, sala de yoga, academia, smart lounge, coworking, salões de festas, brinquedoteca, pet place, sauna, mini market interno, smart locker, controle de acesso digital, infraestrutura para carro elétrico e wi-fi nas áreas de lazer.",
  },
  {
    q: "Como faço para agendar uma visita?",
    a: "Preencha o formulário nesta página e nossa equipe de consultores entrará em contato pelo canal de sua preferência para agendar uma visita exclusiva.",
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
