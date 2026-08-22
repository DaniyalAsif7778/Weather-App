import type { CurrentConditions } from "./weather-types.js";

export type WeatherCondition = "rain" | "auto";

// Change this one value to control weather presentation everywhere.
// Set to "auto" when the live API condition should be used again.
export const WEATHER_CONDITION_OVERRIDE: WeatherCondition = "rain";

export interface WeatherPresentation {
  icon: string;
  isRainy: boolean;
  label: string;
  key: "clear" | "rain";
}

export function getWeatherPresentation(current: CurrentConditions): WeatherPresentation {
  const apiCondition = `${current.conditions} ${current.icon ?? ""}`.toLowerCase();
  const isRainy = WEATHER_CONDITION_OVERRIDE === "rain" || /rain|shower|drizzle|thunderstorm/.test(apiCondition);

  return {
    key: isRainy ? "rain" : "clear",
    isRainy,
    icon: isRainy ? "cloud-rain" : "cloud-sun",
    label: isRainy ? "Rain" : current.conditions,
  };
}
