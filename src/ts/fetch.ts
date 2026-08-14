import { getUserLocation, getLatLng } from "./location.js";

async function fetchData(cityName:string | undefined ) {
     if (cityName == undefined) {
        throw console.error("cityName must be a string")
     }
    
  const { latitude, longitude } = await getLatLng(cityName);   
  const { wheatherData } = await getUserLocation(latitude ,longitude);
 return {wheatherData}; 
}

export { fetchData };
