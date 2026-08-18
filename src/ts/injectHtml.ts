export function injectHtmlInIndex(weather) {
    const hourlyCardParent = document.querySelector(".hourly-grid");
    const mainbg = document.querySelector(".main-area");

    // 1. Update background image cleanly
    if (mainbg) {
        mainbg.style.backgroundImage = "url(./src/assets/night-pic.jpg)";
        mainbg.style.backgroundSize = "cover";
        mainbg.style.backgroundPosition = "center";
    }
        const bgElement = document.querySelector('.content-wrapper');
console.log(bgElement);

     bgElement.addEventListener('scroll', (event) => {
        // 1. Get current scroll position in pixels
         
        const scrollTop =  event.target.scrollTop;
console.log(scrollTop);

        // 2. Set the distance (in pixels) over which the fade should happen
        const fadeDistance = 500; 
        console.log(fadeDistance);
        
        // 3. Calculate opacity based on scroll (starts at 0, grows as you scroll)
        let opacity = scrollTop / fadeDistance + 0.100;
        console.log(opacity);
        
        // 4. CAP IT AT MEDIUM: Ensure it never goes past 0.5 (50% visibility)
        // if (opacity > 1) {
        //     opacity = 0.7;
        // }

        // 5. Apply the calculated opacity to the background element
        bgElement.style.backgroundColor = `rgb(18, 18, 26,${opacity})`
     });
 

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
            <span class="hour-time">${hour.datetime || '12 PM'}</span>
            <div class="hour-icon-wrap"></div>
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
