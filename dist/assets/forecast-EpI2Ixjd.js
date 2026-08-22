import"./style-BF8bMiFV.js";function e(e){return`<article class="hour-card forecast-hour-card">
    <div class="flex items-start justify-between gap-3"><div><p class="hour-time">${e.datetime}</p><p class="hour-condition">${e.conditions??`Current conditions`}</p></div><div class="hour-icon-wrap m-0"><i class="ph ph-${e.icon}"></i></div></div>
    <p class="hour-temp mt-4 text-3xl">${Math.round(e.temp)}°</p>
    <div class="forecast-metrics">
      <p><i class="ph ph-thermometer"></i><span>Feels like</span><strong>${Math.round(e.feelslike??e.temp)}°</strong></p>
      <p><i class="ph ph-wind"></i><span>Wind</span><strong>${Math.round(e.windspeed)} km/h${e.winddir==null?``:` · ${Math.round(e.winddir)}°`}</strong></p>
      <p><i class="ph ph-drop"></i><span>Rain chance</span><strong>${Math.round(e.precipprob)}%</strong></p>
      <p><i class="ph ph-drop-half"></i><span>Humidity</span><strong>${Math.round(e.humidity??0)}%</strong></p>
      <p><i class="ph ph-gauge"></i><span>Pressure</span><strong>${Math.round(e.pressure??0)} hPa</strong></p>
      <p><i class="ph ph-sun"></i><span>UV index</span><strong>${e.uvindex??0}</strong></p>
    </div>
  </article>`}var t=localStorage.getItem(`weather`),n=localStorage.getItem(`weather-city`),r=document.querySelector(`#forecast-hours`),i=document.querySelector(`#forecast-empty`),a=document.querySelector(`#forecast-city`);t&&n&&r?(r.innerHTML=(JSON.parse(t).days[0]?.hours??[]).slice(0,24).map(e).join(``),a&&(a.textContent=n)):i&&(i.hidden=!1);