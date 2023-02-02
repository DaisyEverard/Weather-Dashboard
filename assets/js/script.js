

const lat = 'placeholder'
const lon = 'placeholder'
const apiKey = 'f91b1fdab67a24d5aa4a8e66dc04f5c1'
// for forecast
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
// turn city name into co-ords. limit optional. use 1? 
const geoApiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`