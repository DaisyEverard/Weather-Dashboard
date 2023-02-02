
const searchInput = $('#search-input'); 
const searchForm = $('#search-form')
const submitBtn = $('#search-button');
const todayDisplay = $('#today');
const forecastRow = $('#forecast-row')
const apiKey = 'f91b1fdab67a24d5aa4a8e66dc04f5c1'
// functions
// create today display
const todayWeatherFunc = (lat, lon, cityName) => {
    const weatherNowURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    todayDisplay.empty(); 

    $.ajax({
        url: weatherNowURL,
        method: 'GET'
    }).then((response) => {
    const currentDate = moment().format('DD/MM/YY'); 
    const weatherIcon = response['weather'][0]['icon'];
    const temperature = (response['main']['temp'] - 273.1).toFixed(1); 
    const humidity = response['main']['humidity']; 
    const windSpeed = (response['wind']['speed']).toFixed(2);

    iconURL = `http://openweathermap.org/img/w/${weatherIcon}.png`;

    let todayTitle = $('<h1>').text(`${cityName} (${currentDate})`)
    todayTitle.append($('<img>').attr('src', iconURL))
     todayDisplay.append(todayTitle);
     todayDisplay.append($('<p>').html(`<span>Temperature:</span> ${temperature}°C`));
     todayDisplay.append($('<p>').html(`<span>Humidity:</span> ${humidity}`));
     todayDisplay.append($('<p>').html(`<span>Wind Speed:</span> ${windSpeed}mph`));
    })
}

// create forecast boxes
const forecastFunc = (lat, lon) => {
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

// get latitude/longidtude. 

const buildQueryURLs = (todayWeatherFunc, forecastFunc) => {
    let cityName = searchInput.val(); 
   cityName = cityName.toLowerCase();
   cityName = cityName[0].toUpperCase() + cityName.slice(1);

   const geoApiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`

   $.ajax({
    url: geoApiURL,
    method: 'GET'
   }).then((response) => {
     const lat = response[0]['lat'].toFixed(2);
     const lon = response[0]['lon'].toFixed(2); 
     todayWeatherFunc(lat, lon, cityName);
     forecastFunc(lat, lon); 
   })
}

// call on submitting search
searchForm.on('submit', (event) => {
    event.preventDefault()
    buildQueryURLs(todayWeatherFunc, forecastFunc); 
})

