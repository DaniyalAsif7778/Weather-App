const RECENT_CITIES_KEY = "recent-cities";
const MAX_RECENT_CITIES = 6;

export function getRecentCities(): string[] {
  try {
    const cities = JSON.parse(localStorage.getItem(RECENT_CITIES_KEY) ?? "[]") as unknown;
    return Array.isArray(cities) ? cities.filter((city): city is string => typeof city === "string") : [];
  } catch {
    return [];
  }
}

export function saveRecentCity(city: string): void {
  const normalizedCity = city.trim();
  if (!normalizedCity) return;
  const cities = getRecentCities().filter((savedCity) => savedCity.toLowerCase() !== normalizedCity.toLowerCase());
  localStorage.setItem(RECENT_CITIES_KEY, JSON.stringify([normalizedCity, ...cities].slice(0, MAX_RECENT_CITIES)));
}

export function renderRecentSearches(onSelect: (city: string) => void): void {
  const container = document.querySelector<HTMLElement>("#recent-search-list");
  if (!container) return;
  const cities = getRecentCities();
  container.replaceChildren();
  if (!cities.length) {
    container.textContent = "Your searched cities will appear here.";
    container.classList.add("recent-search-empty");
    return;
  }
  container.classList.remove("recent-search-empty");
  cities.forEach((city) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "recent-search-chip";
    button.innerHTML = `<i class="ph ph-clock-counter-clockwise"></i><span></span>`;
    button.querySelector("span")!.textContent = city;
    button.addEventListener("click", () => onSelect(city));
    container.append(button);
  });
}
