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
    searchhistoryentryEl.classList = "row searchhistoryentry bg-secondary m-3 p-2"
    searchhistoryentryEl.addEventListener("click",clicksearchhistory)
    searchhistorylistEl.appendChild(searchhistoryentryEl)
};

//listen for clicks in the search history list
function clicksearchhistory(e) {
    var li = e.currentTarget;
    cityInputEl.value = li.textContent
    getweather(cityInputEl.value)
};

//increment date
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


//fetch information from weather api
function getweather(city) {
    let api_url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=6090a0c3c0ba8ad5f1c59b776c43013c'
//use first api to find city lat and long
 fetch (api_url).then(function(response) {
     if (response.ok) {
     response.json().then(function(data) {
        console.log(data)
            //grab lat and long 
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            let fetchedcity = data.name;

            //fetch api for 5 day forecast
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=alerts,minutely,hourly&appid=6090a0c3c0ba8ad5f1c59b776c43013c').then(function(response) {
                response.json().then(function(data) {
                   console.log(data)

            //create searched city element
            var currentweatherEl = document.getElementById("currentweather");
            currentweatherEl.classList = "border border-secondary p-5"
             //remove current dom elements
             currentweatherEl.innerHTML = "";

                //declare weather variables
                let temp = data.current.temp;
                let wind = data.current.wind_speed;
                let humidity = data.current.humidity;
                let uvi = data.current.uvi;

                //grab temperature
                    let cityEl = document.createElement("h2")
                    //add fetched information to card
                    cityEl.textContent = fetchedcity
                    currentweatherEl.appendChild(cityEl);
                    console.log(cityEl);

                //grab temperature
                    let tempEl = document.createElement("div")
                    //add fetched information to card
                    tempEl.textContent = "Temp" + ": " + temp
                    currentweatherEl.appendChild(tempEl);
                    console.log(tempEl);

                //grab wind
                    let windEl = document.createElement("div")
                    //add fetched information to card
                    windEl.textContent = "Wind" + ": " + wind
                    currentweatherEl.appendChild(windEl);
                    console.log(windEl);

                //grab humidity
                    let humidityEl = document.createElement("div")
                    //add fetched information to card
                    humidityEl.textContent = "Humidity" + ": " + humidity
                    currentweatherEl.appendChild(humidityEl);
                    console.log(humidityEl);

                //grab uvi
                    let uviEl = document.createElement("div")
                    //add fetched information to card
                    uviEl.textContent = "UVI" + ": " + uvi
                    currentweatherEl.appendChild(uviEl);
                    console.log(uviEl);

                   //loop through the next 5 days and append elements
                   var forecastweatherEl = document.getElementById("forecastweather")
                   forecastweatherEl.innerHTML = "";
                   numberdays = 5
                   for (let i = 0; i < numberdays; i++) {
                    //append elements
                        let forecasttemp = data.daily[i].temp.day;
                        let forecastwind = data.daily[i].wind_speed;
                        let forecasthumidity = data.daily[i].humidity;
                        let forecastdate = (today.addDays(i+1)).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
                    //append parent container
                        let forecastEl = document.createElement("div");
                        forecastEl.classList = "m-3 bg-secondary col container p-3";
                        //append current date
                        let forecastdateEl = document.createElement("h5");
                        forecastdateEl.textContent = forecastdate;
                        forecastEl.appendChild(forecastdateEl);
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
    }
    else {
        alert("Enter a Valid City!")
    }
      });
};



getweather("Manhattan");