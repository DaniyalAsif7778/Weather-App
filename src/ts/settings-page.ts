import "../css/style.css";

const clearRecentCitiesButton = document.querySelector<HTMLButtonElement>("#clear-recent-cities");

clearRecentCitiesButton?.addEventListener("click", () => {
  localStorage.removeItem("recent-cities");
  clearRecentCitiesButton.textContent = "History cleared";
  clearRecentCitiesButton.disabled = true;
});
