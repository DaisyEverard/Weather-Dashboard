
const searchInput = $('#search-input'); 
const searchForm = $('#search-form')
const submitBtn = $('#search-button');

const apiKey = 'f91b1fdab67a24d5aa4a8e66dc04f5c1'

// START HERE
// functions
const getLatLon = () => {
   const cityName = searchInput.val(); 
   cityName.toLowerCase();
   cityName[0].toUpperCase();
   console.log(cityName)

   const geoApiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`

   $.ajax({
    url: geoApiURL,
    method: 'GET'
   }).then((response) => {
     const lat = response[0]['lat'].toFixed(2);
     const lon = response[0]['lon'].toFixed(2);
     localStorage.setItem('lat', lat);
     localStorage.setItem('lon', lon)
   })
}

// create today display
const todayWeatherFunc = () => {
    const lat = localStorage.getItem('lat');
    const lon = localStorage.getItem('lon');
    const weatherNowURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    $.ajax({
        url: weatherNowURL,
        method: 'GET'
    }).then((response) => {
// ADD WEATHER BOX HERE
console.log(response)
    })
}
// create forecast boxes
const forecastFunc = () => {
    const lat = localStorage.getItem('lat');
    const lon = localStorage.getItem('lon');
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

    $.ajax({
        url: forecastURL,
        method: 'GET'
    }).then((response) => {
        // ADD FORECAST BOXES HERE
        console.log(response)
    })
}
// create button
const createBtnFun = () => {}

// call on submitting search
searchForm.on('submit', (event) => {
    event.preventDefault()
    getLatLon();
  todayWeatherFunc();
  forecastFunc();
})

