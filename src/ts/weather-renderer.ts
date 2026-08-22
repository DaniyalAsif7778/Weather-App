import { updateAmbientSound } from "./audio-controller.js";
import { getWeatherPresentation } from "./weather-state.js";
import { startSunCycleTracking } from "./sun-cycle.js";
import type { WeatherData, WeatherDay, WeatherHour } from "./weather-types.js";

const FADE_DISTANCE_PX = 500;

function hourMarkup(hour: WeatherHour): string {
  return `<div class="hour-card weather-hour-card">
    <span class="hour-time">${hour.datetime || "12:00"}</span>
    <div class="hour-icon-wrap"><i class="ph ph-${hour.icon}"></i></div>
    <span class="hour-temp">${Math.round(hour.temp)}°</span>
    <span class="hour-condition">${hour.conditions ?? "Current conditions"}</span>
    <div class="hour-details">
      <span class="hour-detail"><i class="ph ph-wind"></i>${Math.round(hour.windspeed)} km/h</span>
      <span class="hour-detail"><i class="ph ph-drop"></i>${Math.round(hour.precipprob)}%</span>
      <span class="hour-detail"><i class="ph ph-drop-half"></i>${Math.round(hour.humidity ?? 0)}%</span>
    </div>
  </div>`;
}

function dayLabel(date: string, index: number): string {
  if (index === 0) return "Today";
  return new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(new Date(`${date}T12:00:00`));
}

function dayMarkup(day: WeatherDay, index: number, minimum: number, range: number): string {
  const start = ((day.tempmin - minimum) / range) * 100;
  const width = ((day.tempmax - day.tempmin) / range) * 100;
  return `<div class="forecast-row">
    <span class="forecast-day">${dayLabel(day.datetime, index)}</span>
    <div class="forecast-icon-wrap"><i class="ph ph-${day.icon} text-[#00D4FF]"></i></div>
    <div><span class="forecast-condition">${day.conditions}</span><span class="forecast-rain"><i class="ph ph-drop"></i>${Math.round(day.precipprob)}%</span></div>
    <div class="forecast-bar-wrap"><div class="forecast-bar"><div class="forecast-bar-fill" style="left:${Math.max(0, start)}%; width:${Math.max(8, width)}%"></div></div></div>
    <div class="forecast-temps"><span class="forecast-high">${Math.round(day.tempmax)}°</span><span class="forecast-low">${Math.round(day.tempmin)}°</span></div>
  </div>`;
}

export function renderWeather(weather: WeatherData, city: string): void {
  const mainArea = document.querySelector<HTMLElement>(".main-area");
  const contentWrapper = document.querySelector<HTMLElement>(".content-wrapper");
  const heroContent = document.querySelector<HTMLElement>(".hero-content");
  const hourlyGrid = document.querySelector<HTMLElement>(".hourly-grid");
  const dailyForecast = document.querySelector<HTMLElement>(".forecast-card");
  const presentation = getWeatherPresentation(weather.currentConditions);

  if (mainArea) mainArea.dataset.weather = presentation.key;
  if (contentWrapper) {
    contentWrapper.onscroll = () => {
      const opacity = Math.min(contentWrapper.scrollTop / FADE_DISTANCE_PX + 0.1, 0.7);
      contentWrapper.style.backgroundColor = `rgb(10 10 15 / ${opacity})`;
    };
  }

  if (heroContent) {
    const current = weather.currentConditions;
    heroContent.innerHTML = `<div class="hero-left"><div class="hero-weather-icon"><i class="ph ph-${presentation.icon} text-[#00D4FF]"></i></div><div class="hero-temp"><span class="temp-value">${Math.round(current.temp)}</span><span class="temp-unit">°C</span></div><div class="hero-desc">${presentation.label}</div><div class="hero-feels">Feels like <span>${Math.round(current.feelslike)}°</span></div></div><div class="hero-right"><div class="hero-meta"><span class="meta-label">Wind</span><span class="meta-value">${Math.round(current.windgust ?? 0)} km/h</span></div><div class="hero-meta"><span class="meta-label">Humidity</span><span class="meta-value">${Math.round(current.humidity)}%</span></div><div class="hero-meta"><span class="meta-label">Pressure</span><span class="meta-value">${Math.round(current.pressure)} hPa</span></div><div class="hero-meta"><span class="meta-label">Visibility</span><span class="meta-value">${Math.round(current.visibility ?? 0)} km</span></div><div class="hero-meta"><span class="meta-label">UV Index</span><span class="meta-value">${current.uvindex}</span></div></div>`;
  }

  const hours = weather.days[0]?.hours;
  if (hourlyGrid && hours) hourlyGrid.innerHTML = hours.slice(0, 5).map(hourMarkup).join("");
  if (dailyForecast && weather.days.length) {
    const days = weather.days.slice(0, 7);
    const temperatures = days.flatMap((day) => [day.tempmin, day.tempmax]);
    const minimum = Math.min(...temperatures);
    const range = Math.max(1, Math.max(...temperatures) - minimum);
    dailyForecast.innerHTML = days.map((day, index) => dayMarkup(day, index, minimum, range)).join("");
  }
  startSunCycleTracking(weather.days[0]);
  document.querySelectorAll<HTMLElement>("#navbar-city-name, #mobile-city-name").forEach((cityLabel) => {
    cityLabel.textContent = city;
  });
  updateAmbientSound(presentation.isRainy);
}
