import { developmentItems } from "./items";

export const developments = developmentItems;

export const activeDevelopments = developments
  .filter((development) => development.isActive)
  .sort((first, second) => first.displayOrder - second.displayOrder);

export const neighborhoodFilters = [
  "Todos",
  ...new Set(activeDevelopments.map((development) => development.neighborhood)),
];

export const neighborhoods = [
  ...new Set(activeDevelopments.map((development) => development.neighborhood)),
];

export const allDevelopmentsForForm = [...new Set(activeDevelopments.map(
  (development) => development.formLabel,
))];

export function getDevelopmentBySlug(slug?: string) {
  return activeDevelopments.find((development) => development.slug === slug);
}

export type {
  DevelopmentAsset,
  DevelopmentContent,
  DevelopmentDocument,
  DevelopmentStatus,
} from "./types";
