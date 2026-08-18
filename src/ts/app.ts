import {fetchData} from "./fetch.js"
import {injectHtmlInIndex} from "./injectHtml.js"
async function app() {
  let weather;
  const cityName: string = "";
  const input = document.getElementById("cityname_input") as HTMLElement;
const inputForm = document.querySelector(".city-overlay") 
console.log(inputForm);

  let inputValue: string | null;
  let typingTimer: number;
  const doneTypingInterval = 1000;
  input.addEventListener("input", (event: Event) => {
    clearTimeout(typingTimer);

    // Restart the countdown
    typingTimer =  setTimeout( async() => {
      const query = event.target.value.trim();
      if (query) {
      const {wheatherData} = await    fetchData(query)
      if (!wheatherData) {
        throw console.error("something went wrong")
      }
        weather = wheatherData;

      inputForm.hidden = true
        localStorage.setItem("weather",JSON.stringify(weather))
         injectHtmlInIndex(weather)

        
      }
    }, doneTypingInterval);
  });
   

}

app();

export { app };
