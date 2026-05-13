import { useState } from "react";
import { activeDevelopments, neighborhoodFilters } from "@/content/developments";

export function useDevelopmentFilter() {
  const [filter, setFilter] = useState("Todos");

  const filtered =
    filter === "Todos"
      ? activeDevelopments
      : activeDevelopments.filter((d) => d.neighborhood === filter);

  return { filter, setFilter, filtered, neighborhoods: neighborhoodFilters };
}
