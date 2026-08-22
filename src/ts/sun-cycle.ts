import type { WeatherDay } from "./weather-types.js";

let trackingTimer: ReturnType<typeof window.setInterval> | undefined;

function formatTime(epoch: number): string {
  return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date(epoch * 1000));
}

function formatDuration(milliseconds: number): string {
  const totalMinutes = Math.max(0, Math.round(milliseconds / 60_000));
  return `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
}

function updateSunCycle(day: WeatherDay): void {
  const sunrise = day.sunriseEpoch;
  const sunset = day.sunsetEpoch;
  if (!sunrise || !sunset || sunset <= sunrise) return;

  const now = Date.now();
  const daylightDuration = (sunset - sunrise) * 1000;
  const progress = Math.min(1, Math.max(0, (now - sunrise * 1000) / daylightDuration));
  const sunriseLabel = document.querySelector<HTMLElement>("#sunrise-time");
  const sunsetLabel = document.querySelector<HTMLElement>("#sunset-time");
  const daylightLabel = document.querySelector<HTMLElement>("#sun-cycle-daylight");
  const sunPosition = document.querySelector<HTMLElement>("#sun-position");

  if (sunriseLabel) sunriseLabel.textContent = formatTime(sunrise);
  if (sunsetLabel) sunsetLabel.textContent = formatTime(sunset);
  if (daylightLabel) daylightLabel.textContent = `Daylight ${formatDuration(daylightDuration)}`;
  document.querySelectorAll<HTMLElement>("#sun-progress, #sun-progress-mobile").forEach((bar) => {
    bar.style.width = `${progress * 100}%`;
  });

  if (sunPosition) {
    sunPosition.style.left = `${10 + progress * 80}%`;
    sunPosition.style.bottom = `${Math.sin(Math.PI * progress) * 85}%`;
  }

  const status = now < sunrise * 1000
    ? `Sunrise in ${formatDuration(sunrise * 1000 - now)}`
    : now > sunset * 1000
      ? `Sunset was ${formatDuration(now - sunset * 1000)} ago`
      : progress < 0.5 ? "Sun is rising" : "Sun is setting";
  const sunCycle = document.querySelector<HTMLElement>("#sun-cycle");
  const isDaytime = now >= sunrise * 1000 && now <= sunset * 1000;
  sunCycle?.classList.toggle("is-day", isDaytime);
  sunCycle?.classList.toggle("is-night", !isDaytime);
  document.querySelectorAll<HTMLElement>(".sun-cycle-status").forEach((label) => {
    label.textContent = status;
  });
}

export function startSunCycleTracking(day: WeatherDay | undefined): void {
  window.clearInterval(trackingTimer);
  if (!day) return;
  updateSunCycle(day);
  trackingTimer = window.setInterval(() => updateSunCycle(day), 60_000);
}
