import type { WeatherData } from "./weather-types.js";

export interface StoredWeather {
  city: string;
  weather: WeatherData;
}

export function getStoredWeather(): StoredWeather | undefined {
  const city = localStorage.getItem("weather-city");
  const weatherText = localStorage.getItem("weather");
  if (!city || !weatherText) return undefined;
  try {
    return { city, weather: JSON.parse(weatherText) as WeatherData };
  } catch {
    return undefined;
  }
}

export function renderEmptyState(container: HTMLElement): void {
  container.innerHTML = `<p class="glass-card p-6 text-slate-300">Search for a city on the <a class="text-cyan" href="/">dashboard</a> to view live weather data here.</p>`;
}
