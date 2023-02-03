
const searchInput = $('#search-input'); 
const searchForm = $('#search-form');
const submitBtn = $('#search-button');
const historyDisplay = $('#history')
const todayDisplay = $('#today');
const forecastRow = $('#forecast');

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
        for (i = 7; i<response['list'].length; i += 8) {
            // set necessary data points to constants
            const dataSet = response['list'][i]
            let date = moment(dataSet['dt_txt'], 'YYYY-MM-DD HH:mm:ss').format('dddd Do');
            const icon = dataSet['weather'][0]['icon']; 
            const temperature = (dataSet['main']['temp'] - 273.1).toFixed(2);
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
            let title = $('<h5>').text(date);
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

// get latitude/longidtudes, call today and forecast funcs
const buildQueryURLs = (todayWeatherFunc, forecastFunc, cityName) => {
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

// create new button
const newStorageFunc = (searchTerm) => { 
    // add new city to local storage
    let searchHistory = JSON.parse(localStorage.getItem('searched-cities'));
    if (searchHistory) {
        // standardise capitals
        searchTerm = searchTerm.toLowerCase();
        searchTerm = searchTerm[0].toUpperCase() + searchTerm.slice(1);
        // prevent duplicate buttons.
        let duplicateIndex = 'nan';
        searchHistory.forEach((item, i) => {
            if (item === searchTerm) {
                // find where duplicate is
                duplicateIndex = i;
            }
        }) 
        // move remove button so new one can go to top
        if (duplicateIndex !== 'nan') {
           searchHistory.splice(duplicateIndex, 1); 
        }
             // max of 10 buttons
        if(searchHistory.length >= 10) {
            // remove oldest button, make room for new one 
                searchHistory.shift(); 
            }
            searchHistory.push(searchTerm); 
            localStorage.setItem('searched-cities', JSON.stringify(searchHistory));   
        } else {
            let newHistory = [];
            newHistory.push(searchTerm);
            localStorage.setItem('searched-cities', JSON.stringify(newHistory));
        }
        }

// display buttons from stored data
const storedBtnFunc = () => {
    let searchHistory = JSON.parse(localStorage.getItem('searched-cities'));
    historyDisplay.empty(); 
    if (searchHistory) {
        searchHistory.forEach((item) => {
            let newBtn = $('<button>').text(item);
            newBtn.attr('data-city', item);
            newBtn.attr('class', 'btn btn-secondary'); 
            historyDisplay.prepend(newBtn); 
        })
    }
}
// display history buttons on page load
storedBtnFunc(); 

// call on submitting search
searchForm.on('submit', (event) => {
    event.preventDefault(); 
    let cityName = searchInput.val(); 
    if (cityName) {
    buildQueryURLs(todayWeatherFunc, forecastFunc, cityName); 
    newStorageFunc(cityName); 
    storedBtnFunc();
    searchInput.val(''); 
    }
})

// city button on click
historyDisplay.on('click', (event) => {
    let btn = $(event.target)
    let city = btn.attr('data-city')
    buildQueryURLs(todayWeatherFunc, forecastFunc, city);
    newStorageFunc(city);
    storedBtnFunc();
})

// clear button on click
const clearBtn = $('#clear-btn')
clearBtn.on('click', () => {
    historyDisplay.empty();
    localStorage.removeItem('searched-cities');
})