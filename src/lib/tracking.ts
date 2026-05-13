import { campaignName, landingPageId } from "@/content/site";

function inferTrafficSource(url: URL, referrer: string): string {
  const utmSource = url.searchParams.get("utm_source");
  if (utmSource) return utmSource.toLowerCase();

  if (url.searchParams.get("gclid")) return "google_ads";
  if (url.searchParams.get("fbclid")) return "facebook_ads";
  if (url.searchParams.get("ttclid")) return "tiktok_ads";

  const ref = referrer.toLowerCase();
  if (ref.includes("google.")) return "google";
  if (ref.includes("instagram.")) return "instagram";
  if (ref.includes("facebook.")) return "facebook";
  if (ref.includes("linkedin.")) return "linkedin";
  if (ref.includes("tiktok.")) return "tiktok";
  if (ref.includes("bing.")) return "bing";

  return "direto";
}

export function getTrackingPayload(origem?: string, gatilho_modal?: string) {
  const url = new URL(window.location.href);
  const referrer = document.referrer || "";

  return {
    landing_page_id: landingPageId,
    origem: origem ?? `Landing Page ${campaignName}`,
    ...(gatilho_modal ? { gatilho_modal } : {}),
    origem_detectada: inferTrafficSource(url, referrer),
    url_pagina: url.href,
    url_origem: referrer || null,
    path: url.pathname,
    querystring: url.search,
    utm_source: url.searchParams.get("utm_source"),
    utm_medium: url.searchParams.get("utm_medium"),
    utm_campaign: url.searchParams.get("utm_campaign"),
    utm_content: url.searchParams.get("utm_content"),
    utm_term: url.searchParams.get("utm_term"),
    gclid: url.searchParams.get("gclid"),
    fbclid: url.searchParams.get("fbclid"),
    ttclid: url.searchParams.get("ttclid"),
  };
}
