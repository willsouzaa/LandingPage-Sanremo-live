import { createContext, useContext, useEffect, useRef, useState } from "react";

const MODAL_DISMISSED_KEY = "sanremo-cta-modal-dismissed";
const MODAL_SUBMITTED_KEY = "sanremo-cta-modal-submitted";
const MODAL_DELAY_MS = 22000;

interface ModalContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger: string;
  pendingHref: string | null;
  success: boolean;
  setSuccess: (success: boolean) => void;
  canShow: () => boolean;
  dismiss: () => void;
  markSubmitted: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const triggerRef = useRef("tempo_na_pagina");
  const pendingHrefRef = useRef<string | null>(null);

  const canShow = () =>
    sessionStorage.getItem(MODAL_DISMISSED_KEY) !== "true" &&
    sessionStorage.getItem(MODAL_SUBMITTED_KEY) !== "true";

  const openModal = (trigger: string, pendingHref?: string) => {
    if (!canShow() || open || success) return;
    triggerRef.current = trigger;
    pendingHrefRef.current = pendingHref ?? null;
    setOpen(true);
  };

  const dismiss = () => {
    sessionStorage.setItem(MODAL_DISMISSED_KEY, "true");
    if (pendingHrefRef.current) window.location.href = pendingHrefRef.current;
  };

  const markSubmitted = () => {
    sessionStorage.setItem(MODAL_SUBMITTED_KEY, "true");
  };

  useEffect(() => {
    if (!canShow()) return;

    const timer = window.setTimeout(() => openModal("tempo_na_pagina"), MODAL_DELAY_MS);

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) openModal("intencao_de_saida");
    };

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link || !canShow()) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) {
        event.preventDefault();
        openModal("clique_saida_pagina", link.href);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [open, success]);

  return (
    <ModalContext.Provider
      value={{
        open,
        setOpen,
        trigger: triggerRef.current,
        pendingHref: pendingHrefRef.current,
        success,
        setSuccess,
        canShow,
        dismiss,
        markSubmitted,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
}
