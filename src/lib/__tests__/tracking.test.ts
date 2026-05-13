import { describe, it, expect, beforeEach, vi } from "vitest";

// Simula window.location e document.referrer para testes
const mockGetTrackingPayload = async (href: string, referrer: string, extraParams = "") => {
  Object.defineProperty(window, "location", {
    value: { href: `${href}${extraParams}` },
    writable: true,
  });
  Object.defineProperty(document, "referrer", { value: referrer, configurable: true });

  const { getTrackingPayload } = await import("@/lib/tracking");
  return getTrackingPayload();
};

describe("tracking — inferTrafficSource", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("detecta google_ads via gclid", async () => {
    const payload = await mockGetTrackingPayload(
      "http://localhost:3000/",
      "",
      "?gclid=abc123",
    );
    expect(payload.origem_detectada).toBe("google_ads");
  });

  it("detecta facebook_ads via fbclid", async () => {
    const payload = await mockGetTrackingPayload(
      "http://localhost:3000/",
      "",
      "?fbclid=xyz",
    );
    expect(payload.origem_detectada).toBe("facebook_ads");
  });

  it("detecta utm_source quando presente", async () => {
    const payload = await mockGetTrackingPayload(
      "http://localhost:3000/",
      "",
      "?utm_source=newsletter",
    );
    expect(payload.origem_detectada).toBe("newsletter");
  });

  it("detecta google via referrer", async () => {
    const payload = await mockGetTrackingPayload(
      "http://localhost:3000/",
      "https://www.google.com/search?q=sanremo",
    );
    expect(payload.origem_detectada).toBe("google");
  });

  it("retorna direto quando sem referrer e sem params", async () => {
    const payload = await mockGetTrackingPayload("http://localhost:3000/", "");
    expect(payload.origem_detectada).toBe("direto");
  });

  it("inclui campos UTM no payload", async () => {
    const payload = await mockGetTrackingPayload(
      "http://localhost:3000/",
      "",
      "?utm_source=google&utm_medium=cpc&utm_campaign=lumis",
    );
    expect(payload.utm_source).toBe("google");
    expect(payload.utm_medium).toBe("cpc");
    expect(payload.utm_campaign).toBe("lumis");
  });

  it("usa origem customizada quando passada", async () => {
    vi.resetModules();
    Object.defineProperty(window, "location", {
      value: { href: "http://localhost:3000/" },
      writable: true,
    });
    const { getTrackingPayload } = await import("@/lib/tracking");
    const payload = getTrackingPayload("Modal CTA Promoção Lumis", "tempo_na_pagina");
    expect(payload.origem).toBe("Modal CTA Promoção Lumis");
    expect(payload.gatilho_modal).toBe("tempo_na_pagina");
  });
});
