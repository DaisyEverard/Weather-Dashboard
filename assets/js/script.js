
const searchInput = $('#search-input'); 
const searchForm = $('#search-form')
const submitBtn = $('#search-button');
const todayDisplay = $('#today');
const forecastRow = $('#forecast')

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
        // set weather data points to constants
    const currentDate = moment().format('DD/MM/YY'); 
    const weatherIcon = response['weather'][0]['icon'];
    const temperature = (response['main']['temp'] - 273.1).toFixed(1); 
    const humidity = response['main']['humidity']; 
    const windSpeed = (response['wind']['speed']).toFixed(2);

    // build url for weather icon from code in response
    iconURL = `http://openweathermap.org/img/w/${weatherIcon}.png`;

    // add new data to page
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
    forecastRow.empty(); 

    $.ajax({
        url: forecastURL,
        method: 'GET'
    }).then((response) => {
        console.log(response['list'])
        for (i = 7; i<response['list'].length; i += 8) {
            // set necessary data points to constants
            const dataSet = response['list'][i]
            let date = moment(dataSet['dt_txt'], 'YYYY-MM-DD HH:mm:ss').format('dddd Do');
            const icon = dataSet['weather'][0]['icon']; 
            const temperature = dataSet['main']['temp'];
            const windSpeed = dataSet['wind']['speed']; 
            const humidity = dataSet['main']['humidity'];

                // build url for weather icon from code in response
            iconURL = `http://openweathermap.org/img/w/${icon}.png`;
       
            // set up 5 day boxes
            let newCol; 
            if (i !== 7) {
                newCol = $(`<div class="col col-xs-12 col-md-5 col-lg-2"></div>`); 
            } else {
                newCol = $(`<div class="col col-xs-12 col-md-10 col-lg-3 tomorrow"></div>`);
                date = 'Tomorrow';
            }

            // add new data to page
            let title = $('<h4>').text(date);
            let img = $('<img>').attr('src', iconURL)
            title.append(img); 

            newCol.append(title);
            newCol.append($('<p>').html(`<span>Temperature:</span> ${temperature}°C`));
            newCol.append($('<p>').html(`<span>Wind Speed:</span> ${windSpeed}mph`));
            newCol.append($('<p>').html(`<span>Humidity:</span> ${humidity}`));
            forecastRow.append(newCol); 
        }
    })
}
// create button
const createBtnFun = () => {}

// get latitude/longidtudes, call today and forecast funcs
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

