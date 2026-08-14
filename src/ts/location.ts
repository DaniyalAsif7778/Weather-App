type returnLanLogProps = {
  latitude: number | undefined;
  longitude: number | undefined;
};
async function getLatLng(
  cityName: string = "Karachi",
): Promise<returnLanLogProps> {
  let lat: number | undefined;
  let log: number | undefined;
  try {
    // Step 1: Convert city name to latitude and longitude
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`;

    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      console.log(`City "${cityName}" not found.`);
    }

    // Extract coordinates and exact location name
    const { latitude, longitude, name, country } = geoData.results[0];
    lat = latitude;
    log = longitude;
  } catch (error) {
    console.log(error);
  }
  const latitude = lat;
  const longitude = log;
  return { latitude, longitude };
}

async function getLocationApi(latitude: number, longitude: number) {
  try {
    const responseWeatherData = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=uv_index_max,weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration,moonset,moon_phase,moonrise,wind_speed_10m_max,rain_sum,snowfall_sum&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,visibility,temperature_80m,rain,wind_speed_10m,cloud_cover&current=pressure_msl,surface_pressure,wind_speed_10m,temperature_2m,wind_direction_10m,apparent_temperature,relative_humidity_2m,is_day,rain,snowfall,cloud_cover&timezone=auto`);
 
    const jsonData = await responseWeatherData.json();
    const weather = jsonData;
    return {weather};
  } catch (error) {
    console.log(`${error}`);
  }
}
async function getUserLocation(latitude:number | undefined,longitude:number | undefined) {
  let wheatherData;
  try {
     if (!(latitude && longitude)) {
      throw console.error("lat lng is not find");
    }
    const { weather } = await getLocationApi(latitude, longitude);
wheatherData = weather
  } catch (error) {
    console.log(error);
    
  }
  return {wheatherData}
}
export { getUserLocation ,getLatLng };
