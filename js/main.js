var today = document.querySelector(".forecast-container")
var city = document.querySelector("#search")
var current
var defaultCity = 'Cairo'

async function getWeather(cityName) {
    try {
        var url
        if (cityName){
            url = await fetch(`https://api.weatherapi.com/v1/current.json?key=0ae4938aa7b042c6808173709241706&q=${cityName}`)
        } else {
            url = await fetch(`https://api.weatherapi.com/v1/current.json?key=0ae4938aa7b042c6808173709241706&q=${defaultCity}`)
        }
        current = await url.json()
        display()
    } catch (error) {
        console.log(error)
    }
}

function getDayNameFromDate(dateString) {
    var date = new Date(dateString)
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var dayIndex = date.getDay()
    return daysOfWeek[dayIndex]
}

async function getName(){
    await getWeather(city.value.trim())
    var dateString = current.location.localtime
    var parts = dateString.split(" ")
    var datePart = parts[0]
    return getDayNameFromDate(datePart)
}

async function display() {
    var dayName = await getName()
    var box = `
    <div class="col-md-4">
        <div class="today forecast card bg-dark" id="today">
            <div class="forecast-header p-2 d-flex justify-content-between" id="today">
                <div class="day">${dayName}</div>
                <div class="date">${current.location.localtime.split(' ')[0]}</div>
            </div>
            <div class="forecast-content" id="current">
                <div class="location px-3 py-4">${current.location.name}</div>
                <div class="degree">
                    <div class="num p-5 h1 fw-bolder">
                        ${current.current.temp_c}
                        <sup>o</sup>
                        C
                    </div>
                    <div class="forecast-icon">
                        <img src="https:${current.current.condition.icon}" alt="" class="px-2">
                    </div>
                    <div class="custom px-3">${current.current.condition.text}</div>
                    <span>
                        <img src="https://routeweather.netlify.app/images/icon-umberella.png" alt="" class="ps-3 py-3">
                        ${current.current.humidity}%
                    </span>
                    <span>
                        <img src="https://routeweather.netlify.app/images/icon-wind.png" alt="" class="ps-3 py-3">
                        ${current.current.wind_kph}km/h
                    </span>
                    <span>
                        <img src="https://routeweather.netlify.app/images/icon-compass.png" alt="" class="ps-3 py-3">
                        ${current.current.wind_dir}
                    </span>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="forecast card bg-dark">
            <div class="forecast-header py-2" id="today">
                <div class="day text-center">${dayName}</div>
            </div>
            <div class="forecast-content" id="current">
                <div class="forecast-icon text-center p-5">
                    <img src="https:${current.current.condition.icon}" alt="">
                </div>
                <div class="degree text-center fw-bolder h4">
                    ${current.current.heatindex_c}
                    <sup>o</sup>
                    C
                </div>
                <div class="text-center">
                    <small>
                        ${current.current.dewpoint_c}
                        <sup>o</sup>
                    </small>
                </div>
                <div class="custom text-center p-5">${current.current.condition.text}</div>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="forecast card bg-dark">
            <div class="forecast-header py-2" id="today">
                <div class="day text-center">${dayName}</div>
            </div>
            <div class="forecast-content" id="current">
                <div class="forecast-icon text-center p-5">
                    <img src="https:${current.current.condition.icon}" alt="">
                </div>
                <div class="degree text-center fw-bolder h4">
                ${current.current.heatindex_c}
                    <sup>o</sup>
                    C
                </div>
                <div class="text-center">
                    <small>
                    ${current.current.dewpoint_c}
                        <sup>o</sup>
                    </small>
                </div>
                <div class="custom text-center p-5">${current.current.condition.text}</div>
            </div>
        </div>
    </div>
    `
    today.innerHTML = box

}

document.querySelector("#submit").addEventListener('click', function(){
    var cityName = city.value.trim()
    if (cityName === ''){
        getWeather(defaultCity)
    }
    else{
        getWeather(cityName)
    }
})

getWeather(defaultCity)