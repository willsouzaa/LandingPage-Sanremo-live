import { useEffect, useState } from "react";
import { eventDateLabel, leadWebhookUrl } from "@/content/site";
import { getTrackingPayload } from "@/lib/tracking";

export function useLeadForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [selectedDevelopment, setSelectedDevelopment] = useState("");

  useEffect(() => {
    const applyPrefill = (prefill?: { empreendimento?: string; bairro?: string }) => {
      setSelectedDevelopment(prefill?.empreendimento ?? "");
      setSelectedNeighborhood(prefill?.bairro ?? "");
    };

    const savedPrefill = sessionStorage.getItem("sanremo-interest-prefill");
    if (savedPrefill) {
      try {
        applyPrefill(JSON.parse(savedPrefill));
      } catch {
        applyPrefill();
      }
    }

    const handlePrefill = (event: Event) => {
      const customEvent = event as CustomEvent<{ empreendimento?: string; bairro?: string }>;
      applyPrefill(customEvent.detail);
    };

    window.addEventListener("sanremo-prefill-form", handlePrefill as EventListener);
    return () => window.removeEventListener("sanremo-prefill-form", handlePrefill as EventListener);
  }, []);

  async function handleSubmit(
    data: {
      nome: string;
      telefone: string;
      email: string;
      bairro: string;
      empreendimento?: string;
      mensagem?: string;
    },
    onSuccess: () => void,
    onError: () => void,
  ) {
    setLoading(true);
    const payload = {
      ...data,
      data_evento: eventDateLabel,
      enviado_em: new Date().toISOString(),
      ...getTrackingPayload(),
    };

    try {
      const response = await fetch(leadWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Webhook response was not ok");

      setSuccess(true);
      onSuccess();
    } catch {
      onError();
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    success,
    selectedNeighborhood,
    setSelectedNeighborhood,
    selectedDevelopment,
    setSelectedDevelopment,
    handleSubmit,
  };
}
