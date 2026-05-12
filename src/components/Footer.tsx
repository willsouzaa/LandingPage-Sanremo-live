import logoSanremo from "@/assets/Sanremo.png";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy px-4 py-16 text-navy-foreground md:py-20">
      <div className="container max-w-6xl">
        <div className="grid gap-10 border-t border-white/10 pt-10 md:grid-cols-[1.35fr_0.95fr] md:gap-16 md:pt-12">
          <div>
            <img
              src={logoSanremo}
              alt="San Remo Investimentos Imobiliarios"
              className="mb-6 h-12 w-auto brightness-0 invert md:h-14"
            />
            <h3 className="max-w-[16ch] font-body text-[1.9rem] font-bold leading-[1.15] text-white md:text-[2.15rem]">
              San Remo Investimentos Imobiliarios - CRECI 9715-J
            </h3>
            <p className="mt-5 max-w-xl font-body text-[1rem] leading-8 text-white/70 md:text-[1.05rem]">
              Imoveis de alto padrao e solucoes em investimento imobiliario. Atendimento personalizado para compra, venda e investimento em apartamentos e terrenos em Florianopolis e regiao.
            </p>
            <div className="mt-7 space-y-3 font-body text-[1rem] text-white/76 md:text-[1.05rem]">
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-white/70" />
                <span>(48) 3244-3344</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-white/70" />
                <span>contato@sanremoimoveis.com.br</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-white/70" />
                <span>Rua Coronel Pedro Demoro, 1595 - Loja 02 Florianopolis/SC</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-body text-sm font-semibold uppercase tracking-[0.45em] text-[#ff9d2b]">
              Fale com a San Remo
            </h3>
            <p className="mb-6 max-w-md font-body text-[1rem] leading-8 text-white/70 md:text-[1.05rem]">
              Nosso time de consultores auxilia na selecao de imoveis ideais para moradia ou investimento, com orientacao consultiva e foco em resultado.
            </p>
            <div className="mb-7 rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="font-body text-sm leading-7 text-white/74">
                Atendimento personalizado para compra, venda e investimento imobiliario em Florianopolis e regiao.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                aria-label="Site"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Telefone"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
