import { sound } from "./sound";
export function injectHtmlInIndex(weather) {
  const hourlyCardParent = document.querySelector(".hourly-grid");
  let mainbg = document.querySelector(".main-area");
let heroContent = document.querySelector(".hero-content")

  console.log(weather);

  // 1. Update background image cleanly
  if (mainbg) {
    let condition = "rain";
    if (condition == "rain") {
      mainbg.style.backgroundImage = "url(./src/assets/rain.jfif)";
      sound(condition);
    }

    mainbg.style.backgroundSize = "cover";
    mainbg.style.backgroundPosition = "center";
  }
  const bgElement = document.querySelector(".content-wrapper");
  console.log(bgElement);

  bgElement.addEventListener("scroll", (event) => {
    // 1. Get current scroll position in pixels

    const scrollTop = event.target.scrollTop;
    console.log(scrollTop);

    // 2. Set the distance (in pixels) over which the fade should happen
    const fadeDistance = 500;
    console.log(fadeDistance);

    // 3. Calculate opacity based on scroll (starts at 0, grows as you scroll)
    let opacity = scrollTop / fadeDistance + 0.1;
    console.log(opacity);

    // 4. CAP IT AT MEDIUM: Ensure it never goes past 0.5 (50% visibility)
    // if (opacity > 1) {
    //     opacity = 0.7;
    // }

    // 5. Apply the calculated opacity to the background element
    bgElement.style.backgroundColor = `rgb(10, 10, 15,${opacity})`;
  });
  const currentCondition =  weather?.currentConditions;
  
  heroContent.innerHTML = `   <div class="hero-left">
                  <div class="hero-weather-icon" id="hero-weather-icon">
                    <i class="ph ph-cloud-sun text-[#00D4FF]"></i>
                  </div>
                  <div class="hero-temp">
                    <span class="temp-value">${currentCondition?.temp}</span>
                    <span class="temp-unit">°F</span>
                  </div>
                  <div class="hero-desc">${currentCondition?.conditions}</div>
                  <div class="hero-feels">Feels like <span>${currentCondition?.feelslike}°</span></div>
                  <div class="hero-highlow">
                    <span class="highlow-item">
                      <i class="ph ph-arrow-up text-[#FFB800]"></i>
                      <span>22°</span>
                    </span>
                    <span class="highlow-item">
                      <i class="ph ph-arrow-down text-[#00D4FF]"></i>
                      <span>14°</span>
                    </span>
                  </div>
                </div>

                 <div class="hero-right">
                  <div class="hero-meta">
                    <span class="meta-label">Wind</span>
                    <span class="meta-value">${currentCondition?.windgust} km/h NW</span>
                  </div>
                  <div class="hero-meta">
                    <span class="meta-label">Humidity</span>
                    <span class="meta-value">${currentCondition?.humidity}%</span>
                  </div>
                  <div class="hero-meta">
                    <span class="meta-label">Pressure</span>
                    <span class="meta-value"> ${currentCondition?.pressure} hPa</span>
                  </div>
                  <div class="hero-meta">
                    <span class="meta-label">Visibility</span>
                    <span class="meta-value">${currentCondition?.visibility == null ? 0 : currentCondition?.visibility } km</span>
                  </div>
                  <div class="hero-meta">
                    <span class="meta-label">UV Index</span>
                    <span class="meta-value"
>${currentCondition?.uvindex} <span class="meta-sub">Moderate</span></span
                    >
                  </div>
                </div>`

  // 2. Early exit if the parent element doesn't exist on the page
  if (!hourlyCardParent) return;

  // 3. Extract the hours array safely using optional chaining
  const hours = weather?.days?.[0]?.hours;
  if (!hours) return;

  // 4. FIX: Initialize as an empty string (fixes the "undefined" bug)
  let hourlyData = "";

  // 5. Loop through hours and build the HTML string
  hours.forEach((hour) => {
    // Extract time formatting logic here if needed (e.g., hour.datetime)
    hourlyData += `
          <div class="hour-card">
            <span class="hour-time">${hour.datetime || "12 PM"}</span>
            <div class="hour-icon-wrap">
            <i class="ph ph-${hour.icon}"></i></div>
            <span class="hour-temp">${hour.temp}°</span>
            <div class="hour-details">
              <span class="hour-detail"><i class="ph ph-wind"></i>${hour.windspeed} km/h</span>
              <span class="hour-detail"><i class="ph ph-drop"></i> ${hour.precipprob}%</span>
              <span class="hour-detail"><i class="ph ph-moon"></i> ${hour.feelslike || hour.temp}°</span>
            </div>
          </div>`;
  });

  // 6. PERFORMANCE FIX: Inject into the DOM exactly ONCE after the loop finishes
  hourlyCardParent.innerHTML = hourlyData;
}
