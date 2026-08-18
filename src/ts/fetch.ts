import { getUserLocation } from "./location.js";

async function fetchData(cityName:string | undefined ) {
     if (cityName == undefined) {
        throw console.error("cityName must be a string")
     }
    
      
  const { wheatherData } = await getUserLocation(cityName);
 return {wheatherData}; 
}

export { fetchData };
