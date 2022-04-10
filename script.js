//Grab todays date 
var today = new Date();

//create listeners and elements for search 
var searchBtn = document.getElementById("searchBtn")
var cityInputEl = document.getElementById("city");

var formSubmitHandler = function(event) {
    event.preventDefault();
    getweather(cityInputEl.value);
    addsearchhistory();
  };

searchBtn.addEventListener("click", formSubmitHandler);

var searchhistorylistEl = document.getElementById("searchhistorylist")
//append child for search history
function addsearchhistory() {
    let searchhistoryentryEl = document.createElement("li")
    searchhistoryentryEl.textContent = cityInputEl.value
    //add classes here 
    searchhistoryentryEl.classList = "row"
    searchhistorylistEl.appendChild(searchhistoryentryEl)
};

//listen for clicks in the search history list
searchhistorylistEl.addEventListener("click",clicksearchhistory);
function clicksearchhistory() {
    console.log()
    getweather(cityInputEl.value)
};

//fetch information from weather api
function getweather(city) {
    let api_url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=6090a0c3c0ba8ad5f1c59b776c43013c'

 fetch (api_url).then(function(response) {
     response.json().then(function(data) {
        console.log(data)

            //create searched city element
            var currentweatherEl = document.getElementById("currentweather");
             //remove current dom elements
             currentweatherEl.innerHTML = "";

                //declare weather variables
                let temp = data.main.temp;
                let wind = data.wind.speed;
                let humidity = data.main.humidity;

                //grab temperature
                    let cityEl = document.createElement("h2")
                    //add fetched information to card
                    cityEl.textContent = city
                    currentweatherEl.appendChild(cityEl);
                    console.log(cityEl);

                //grab temperature
                    let tempEl = document.createElement("div")
                    //add fetched information to card
                    tempEl.textContent = "Temp" + ":" + temp
                    currentweatherEl.appendChild(tempEl);
                    console.log(tempEl);

                //grab temperature
                    let windEl = document.createElement("div")
                    //add fetched information to card
                    windEl.textContent = "Wind" + ":" + wind
                    currentweatherEl.appendChild(windEl);
                    console.log(windEl);

                //grab temperature
                    let humidityEl = document.createElement("div")
                    //add fetched information to card
                    humidityEl.textContent = "Humidity" + ":" + humidity
                    currentweatherEl.appendChild(humidityEl);
                    console.log(humidityEl);

            //grab lat and long 
            let lat = data.coord.lat;
            let lon = data.coord.lon;

            //fetch api for 5 day forecast
            fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=6090a0c3c0ba8ad5f1c59b776c43013c').then(function(response) {
                response.json().then(function(data) {
                   console.log(data)
                   //loop through the next 5 days and append elements
                   var forecastweatherEl = document.getElementById("forecastweather")
                   forecastweatherEl.innerHTML = "";
                   numberdays = 5
                   for (let i = 0; i < numberdays; i++) {
                    //append elements
                        let forecasttemp = data.list[i].main.temp;
                        let forecastwind = data.list[i].wind.speed;
                        let forecasthumidity = data.list[i].main.humidity;
                    //append parent container
                        let forecastEl = document.createElement("div");
                        forecastEl.classList = "col container";
                        //append temp
                        let forecasttempEl = document.createElement("div");
                        forecasttempEl.textContent = "Temp: " + forecasttemp
                        forecastEl.appendChild(forecasttempEl)
                        //append wind
                        let forecastwindEl = document.createElement("div");
                        forecastwindEl.textContent = "Wind: " + forecastwind
                        forecastEl.appendChild(forecastwindEl)
                        //append humidity 
                        let forecasthumidityEl = document.createElement("div");
                        forecasthumidityEl.textContent = "Humidity: " + forecasthumidity
                        forecastEl.appendChild(forecasthumidityEl)
                    //append full forecast element
                    forecastweatherEl.appendChild(forecastEl);
                  }
                });
            });
     });
    });
};



getweather("Manhattan");