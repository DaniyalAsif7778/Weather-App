import "../css/style.css";
import { fetchWeather } from "./weather-api.js";
import { renderWeather } from "./weather-renderer.js";
import { setupSidebarToggle } from "./sidebar-controller.js";
import { renderRecentSearches, saveRecentCity } from "./recent-searches.js";

const SEARCH_DEBOUNCE_MS = 500;

async function startApp(): Promise<void> {
  setupSidebarToggle();
  const cityInput = document.querySelector<HTMLInputElement>("#cityname_input");
  const cityOverlay = document.querySelector<HTMLElement>(".city-overlay");

  if (!cityInput || !cityOverlay) return;

  let debounceTimer: ReturnType<typeof setTimeout> | undefined;
  const loadWeather = async (city: string): Promise<void> => {
    try {
      const weather = await fetchWeather(city);
      cityOverlay.hidden = true;
      localStorage.setItem("weather", JSON.stringify(weather));
      localStorage.setItem("weather-city", city);
      saveRecentCity(city);
      renderWeather(weather, city);
      renderRecentSearches((recentCity) => void loadWeather(recentCity));
    } catch (error) {
      console.error("Unable to load weather data.", error);
    }
  };

  const scheduleWeatherLoad = (input: HTMLInputElement): void => {
    window.clearTimeout(debounceTimer);
    const city = input.value.trim();
    if (!city) return;

    debounceTimer = window.setTimeout(() => void loadWeather(city), SEARCH_DEBOUNCE_MS);
  };

  cityInput.addEventListener("input", () => scheduleWeatherLoad(cityInput));
  document.querySelectorAll<HTMLInputElement>(".sidebar-search input, .mobile-search input").forEach((input) => {
    input.addEventListener("input", () => scheduleWeatherLoad(input));
  });

  const savedWeather = localStorage.getItem("weather");
  const savedCity = localStorage.getItem("weather-city");
  if (savedWeather && savedCity) renderWeather(JSON.parse(savedWeather), savedCity);
  renderRecentSearches((recentCity) => void loadWeather(recentCity));
  const requestedCity = new URLSearchParams(window.location.search).get("city");
  if (requestedCity) void loadWeather(requestedCity);
}

void startApp();

export { startApp };
