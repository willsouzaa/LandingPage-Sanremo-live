import { z } from "zod";

export const leadSchema = z.object({
  nome: z.string().min(2, "Nome obrigatório"),
  telefone: z.string().min(8, "Telefone inválido"),
  email: z.string().email("E-mail inválido"),
  bairro: z.string().min(1, "Selecione um bairro"),
  empreendimento: z.string().optional(),
  mensagem: z.string().max(1000).optional(),
});

export const modalLeadSchema = leadSchema.omit({ bairro: true, mensagem: true });

export type LeadFormData = z.infer<typeof leadSchema>;
export type ModalLeadFormData = z.infer<typeof modalLeadSchema>;
