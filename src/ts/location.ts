 
async function getLocationApi(location:string) {
  try {
    const responseWeatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=""`);
 
    const jsonData = await responseWeatherData.json();
    const weather = jsonData;
    return {weather};
  } catch (error) {
    console.log(`${error}`);
  }
}
async function getUserLocation(location:string) {
  let wheatherData;
  try {
     if (!(location)) {
      throw console.error(" location is required");
    }
    const { weather } = await getLocationApi( location);
wheatherData = weather
  } catch (error) {
    console.log(error);
    
  }
  return {wheatherData}
}
export { getUserLocation  };
