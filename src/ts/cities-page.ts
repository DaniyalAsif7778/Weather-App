import "../css/style.css";
import { getRecentCities } from "./recent-searches.js";

const container = document.querySelector<HTMLElement>("#cities-list");
if (container) {
  const cities = getRecentCities();
  if (!cities.length) { container.classList.add("recent-search-empty"); container.textContent = "No saved cities yet. Search from the dashboard to add one."; }
  else cities.forEach((city) => { const link = document.createElement("a"); link.className = "recent-search-chip"; link.href = `/?city=${encodeURIComponent(city)}`; link.innerHTML = `<i class="ph ph-map-pin"></i><span></span>`; link.querySelector("span")!.textContent = city; container.append(link); });
}
