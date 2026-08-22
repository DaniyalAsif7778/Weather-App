import type { WeatherData } from "./weather-types.js";

const WEATHER_API_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

export async function fetchWeather(city: string): Promise<WeatherData> {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) throw new Error("Missing VITE_API_KEY.");

  const url = new URL(`${WEATHER_API_URL}/${encodeURIComponent(city)}/`);
  url.searchParams.set("key", apiKey);
  url.searchParams.set("unitGroup", "metric");

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Weather service returned ${response.status}.`);

  return (await response.json()) as WeatherData;
}
