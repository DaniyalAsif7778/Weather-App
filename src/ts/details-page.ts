import "../css/style.css";
import { getStoredWeather, renderEmptyState } from "./stored-weather.js";

const container = document.querySelector<HTMLElement>("#weather-details-grid");
const stored = getStoredWeather();
if (container && stored) {
  const current = stored.weather.currentConditions;
  const metrics = [["thermometer", "Temperature", `${Math.round(current.temp)}°C`], ["thermometer-hot", "Feels like", `${Math.round(current.feelslike)}°C`], ["drop", "Humidity", `${Math.round(current.humidity)}%`], ["wind", "Wind gust", `${Math.round(current.windgust ?? 0)} km/h`], ["gauge", "Pressure", `${Math.round(current.pressure)} hPa`], ["eye", "Visibility", `${Math.round(current.visibility ?? 0)} km`], ["sun", "UV index", String(current.uvindex)], ["cloud", "Condition", current.conditions]];
  container.innerHTML = metrics.map(([icon, label, value]) => `<article class="detail-card"><i class="ph ph-${icon}"></i><span>${label}</span><strong>${value}</strong></article>`).join("");
  document.querySelector<HTMLElement>("#page-city")!.textContent = stored.city;
} else if (container) renderEmptyState(container);
