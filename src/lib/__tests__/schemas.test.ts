import { describe, it, expect } from "vitest";
import { leadSchema, modalLeadSchema } from "@/lib/schemas";

const validLead = {
  nome: "João Silva",
  telefone: "48999999999",
  email: "joao@email.com",
  bairro: "Cacupé",
  empreendimento: "",
  mensagem: "",
};

describe("leadSchema", () => {
  it("aceita dados válidos", () => {
    const result = leadSchema.safeParse(validLead);
    expect(result.success).toBe(true);
  });

  it("rejeita nome muito curto", () => {
    const result = leadSchema.safeParse({ ...validLead, nome: "A" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe("nome");
  });

  it("rejeita e-mail inválido", () => {
    const result = leadSchema.safeParse({ ...validLead, email: "nao-é-email" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe("email");
  });

  it("rejeita bairro vazio", () => {
    const result = leadSchema.safeParse({ ...validLead, bairro: "" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe("bairro");
  });
});

describe("modalLeadSchema", () => {
  it("aceita dados sem bairro e mensagem", () => {
    const { bairro: _, mensagem: __, ...modalData } = validLead;
    const result = modalLeadSchema.safeParse(modalData);
    expect(result.success).toBe(true);
  });

  it("rejeita telefone muito curto", () => {
    const { bairro: _, mensagem: __, ...modalData } = validLead;
    const result = modalLeadSchema.safeParse({ ...modalData, telefone: "123" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path[0]).toBe("telefone");
  });
});
