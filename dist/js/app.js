import { fetchData } from "./fetch.js";
import { injectHtmlInIndex } from "./injectHtml.js";
async function app() {
    let weather;
    const cityName = "";
    const input = document.getElementById("cityname_input");
    const inputForm = document.querySelector(".city-overlay");
    console.log(inputForm);
    let inputValue;
    let typingTimer;
    const doneTypingInterval = 1000;
    input.addEventListener("input", (event) => {
        clearTimeout(typingTimer);
        // Restart the countdown
        typingTimer = setTimeout(async () => {
            const query = event.target.value.trim();
            if (query) {
                const { wheatherData } = await fetchData(query);
                if (!wheatherData) {
                    throw console.error("something went wrong");
                }
                weather = wheatherData;
                inputForm.hidden = true;
                localStorage.setItem("weather", JSON.stringify(weather));
                injectHtmlInIndex(weather);
            }
        }, doneTypingInterval);
    });
}
app();
export { app };
//# sourceMappingURL=app.js.map