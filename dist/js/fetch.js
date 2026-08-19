import { getUserLocation } from "./location.js";
async function fetchData(cityName) {
    if (cityName == undefined) {
        throw console.error("cityName must be a string");
    }
    const { wheatherData } = await getUserLocation(cityName);
    return { wheatherData };
}
export { fetchData };
//# sourceMappingURL=fetch.js.map