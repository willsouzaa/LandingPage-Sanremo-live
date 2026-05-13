import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDevelopmentFilter } from "@/hooks/use-development-filter";
import { activeDevelopments } from "@/content/developments";

describe("useDevelopmentFilter", () => {
  it("retorna todos os empreendimentos com filtro inicial 'Todos'", () => {
    const { result } = renderHook(() => useDevelopmentFilter());
    expect(result.current.filter).toBe("Todos");
    expect(result.current.filtered).toEqual(activeDevelopments);
  });

  it("filtra por bairro corretamente", () => {
    const { result } = renderHook(() => useDevelopmentFilter());
    const bairro = activeDevelopments[0].neighborhood;

    act(() => result.current.setFilter(bairro));

    expect(result.current.filter).toBe(bairro);
    result.current.filtered.forEach((d) => {
      expect(d.neighborhood).toBe(bairro);
    });
  });

  it("volta a mostrar todos ao selecionar 'Todos'", () => {
    const { result } = renderHook(() => useDevelopmentFilter());
    const bairro = activeDevelopments[0].neighborhood;

    act(() => result.current.setFilter(bairro));
    act(() => result.current.setFilter("Todos"));

    expect(result.current.filtered).toEqual(activeDevelopments);
  });

  it("expõe a lista de bairros (neighborhoods)", () => {
    const { result } = renderHook(() => useDevelopmentFilter());
    expect(result.current.neighborhoods).toContain("Todos");
    expect(result.current.neighborhoods.length).toBeGreaterThan(1);
  });
});
