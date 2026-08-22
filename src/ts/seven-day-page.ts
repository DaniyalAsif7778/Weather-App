import "../css/style.css";
import { getStoredWeather, renderEmptyState } from "./stored-weather.js";
import type { WeatherDay } from "./weather-types.js";

function dayCard(day: WeatherDay, index: number): string {
  const label = index === 0 ? "Today" : new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(new Date(`${day.datetime}T12:00:00`));
  return `<article class="daily-detail-card"><header><div><p class="text-sm font-semibold">${label}</p><p class="hour-condition">${day.conditions}</p></div><i class="ph ph-${day.icon} text-3xl text-cyan"></i></header><div class="mt-5 flex items-end gap-3"><strong class="text-4xl">${Math.round(day.tempmax)}°</strong><span class="text-lg text-muted">${Math.round(day.tempmin)}°</span></div><div class="daily-metrics"><span><i class="ph ph-drop mr-1 text-cyan"></i>${Math.round(day.precipprob)}% rain</span><span><i class="ph ph-sun mr-1 text-sun"></i>UV ${day.uvindex ?? 0}</span><span><i class="ph ph-wind mr-1 text-cyan"></i>${Math.round(day.hours[12]?.windspeed ?? 0)} km/h</span></div></article>`;
}

const container = document.querySelector<HTMLElement>("#daily-details");
const stored = getStoredWeather();
if (container && stored) { container.innerHTML = stored.weather.days.slice(0, 7).map(dayCard).join(""); document.querySelector<HTMLElement>("#page-city")!.textContent = stored.city; }
else if (container) renderEmptyState(container);
