import "../css/style.css";
import type { WeatherData, WeatherHour } from "./weather-types.js";

function hourCard(hour: WeatherHour): string {
  return `<article class="hour-card forecast-hour-card">
    <div class="flex items-start justify-between gap-3"><div><p class="hour-time">${hour.datetime}</p><p class="hour-condition">${hour.conditions ?? "Current conditions"}</p></div><div class="hour-icon-wrap m-0"><i class="ph ph-${hour.icon}"></i></div></div>
    <p class="hour-temp mt-4 text-3xl">${Math.round(hour.temp)}°</p>
    <div class="forecast-metrics">
      <p><i class="ph ph-thermometer"></i><span>Feels like</span><strong>${Math.round(hour.feelslike ?? hour.temp)}°</strong></p>
      <p><i class="ph ph-wind"></i><span>Wind</span><strong>${Math.round(hour.windspeed)} km/h${hour.winddir == null ? "" : ` · ${Math.round(hour.winddir)}°`}</strong></p>
      <p><i class="ph ph-drop"></i><span>Rain chance</span><strong>${Math.round(hour.precipprob)}%</strong></p>
      <p><i class="ph ph-drop-half"></i><span>Humidity</span><strong>${Math.round(hour.humidity ?? 0)}%</strong></p>
      <p><i class="ph ph-gauge"></i><span>Pressure</span><strong>${Math.round(hour.pressure ?? 0)} hPa</strong></p>
      <p><i class="ph ph-sun"></i><span>UV index</span><strong>${hour.uvindex ?? 0}</strong></p>
    </div>
  </article>`;
}

const weatherText = localStorage.getItem("weather");
const city = localStorage.getItem("weather-city");
const hoursContainer = document.querySelector<HTMLElement>("#forecast-hours");
const emptyState = document.querySelector<HTMLElement>("#forecast-empty");
const cityLabel = document.querySelector<HTMLElement>("#forecast-city");

if (weatherText && city && hoursContainer) {
  const weather = JSON.parse(weatherText) as WeatherData;
  const hours = weather.days[0]?.hours ?? [];
  hoursContainer.innerHTML = hours.slice(0, 24).map(hourCard).join("");
  if (cityLabel) cityLabel.textContent = city;
} else if (emptyState) {
  emptyState.hidden = false;
}
