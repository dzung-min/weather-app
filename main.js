/**
 * Display weather info for a searched location
 * @author Dzung Nguyen <dzung_min@yahoo.com>
 */

window.onload = () => {
  navigator.geolocation.getCurrentPosition(async (location) => {
    const lat = location.coords.latitude;
    const lon = location.coords.longitude;
    const weatherData = await getWeather(`${lat},${lon}`);
    displayData(weatherData);
  });
};

document
  .getElementById("search-form")
  .addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const city = form.elements.city.value;
    form.reset();
    const weatherData = await getWeather(city);
    displayData(weatherData);
  });

/*********************
 * UTILITY FUNCTIONS
 *********************/

/**
 *
 * Get weather data for a specific location
 * @param {string} place - city name or location's lat, lon
 * @param {'m'|'s'|'f'} units - "m" for Celsius (default), "s" for Kelvin, "f" for Fahrenheit
 * @returns a Promis which will resole with an object contain weather data for a location
 */
async function getWeather(place, units = "m") {
  const url = `http://api.weatherstack.com/current?access_key=b6697f76dd83a79fd3d503adbdfe71b6&query=${encodeURI(
    place
  )}&units=${units}`;

  try {
    const respone = await fetch(url);
    const data = await respone.json();
    return data;
  } catch (e) {
    console.log("No internet connection");
  }
}

/**
 * Add weather data to the DOM
 * @param {object} weather_data
 */
function displayData(data) {
  const { temperature, feelslike, humidity, uv_index } = data.current;
  const weatherDescription = data.current.weather_descriptions[0];
  const city = data.location.name;
  const country = data.location.country;
  document.getElementById("location").innerHTML = `${city} | ${country}`;
  document.getElementById("temperature").innerHTML = `${temperature}&#176;c`;
  document.getElementById("description").innerHTML = `${weatherDescription}`;
  document.getElementById(
    "feelslike"
  ).innerHTML = `Feels like ${feelslike} &#176;C`;
  document.getElementById("humidity").innerHTML = `Humidity ${humidity} &#37;`;
  document.getElementById("uv-index").innerHTML = `UV index ${uv_index}`;
}
