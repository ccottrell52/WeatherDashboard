
var apiKey = '044bb9c5369619c2020f969f5078b5a5';
var cityInput = document.querySelector('#cityInput');
var searchBtn = document.querySelector('#searchBtn');
var searchHistoryEl = document.querySelector("#searchHistory");




searchBtn.addEventListener('click', function(event) {
    event.preventDefault();
  
    if (cityInput.value === "") {
      alert("City cannot be blank.");
    } else {
      document.querySelector("#cardRow").innerHTML = '';
      document.querySelector('#todayContainer').innerHTML = '';
      getWeather(cityInput.value);
      save();
      getButtons();
    }
  });
  
  keepButtons();
  
  
  function save() {
    var new_city = document.querySelector('#cityInput').value;
    
    if(localStorage.getItem('Cities:') == null) {
      localStorage.setItem('Cities:', '[]');
    }
    var old_city = JSON.parse(localStorage.getItem('Cities:'));
    old_city.push(new_city);
    
    localStorage.setItem('Cities:', JSON.stringify(old_city));
  
   
    var dividerEl = document.querySelector("#divider");
    dividerEl.className = "searchDivider";
  }

 
function getButtons() {
  
    if(localStorage.getItem('Cities:') != null) {
      var old_city = JSON.parse(localStorage.getItem('Cities:'));
      searchHistoryEl.innerHTML = "";
  
      for (var i = 0; i < old_city.length; i++) {
        var searchItemBtn = document.createElement('button');
        searchItemBtn.classList.add("searchItemBtn");
        var searchedCity = JSON.parse(localStorage.getItem('Cities:'))[i];
        searchItemBtn.innerHTML += searchedCity;
        searchHistoryEl.append(searchItemBtn); 
        renderWeather();
      }
    } 
  
    
    function renderWeather() {
      searchItemBtn.addEventListener("click", function(event) { 
        event.preventDefault();
        if (searchItemBtn) {
          document.querySelector("#cardRow").innerHTML = '';
          document.querySelector('#todayContainer').innerHTML = ''
          getWeather(event.target.innerHTML);
        }
      });
    }
  }
  
  
  function keepButtons () {
    if (localStorage === "") {
  
    } else {
      getButtons();
    }
  }

  function getWeather(city) {
    
    var cityLatLonURL ='https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;
    fetch(cityLatLonURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        
       
        var todayContainerEl = document.querySelector('#todayContainer')
        todayContainerEl.className = "custom-today";

       
        var cityName = document.createElement('h3');
        var cityData = data[0].name;
        cityName.innerHTML = cityData;
        todayContainerEl.append(cityName);

       
        var weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
        fetch(weatherURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {

          
          var todayDate = document.createElement('h3');
          var currentDate = moment.unix(data.current.dt).format(" (MM/DD/YYYY) ");
          todayDate = currentDate;
          cityName.append(todayDate);
        
       
          var imgEl = document.createElement('img');
          var iconCode = data.current.weather[0].icon;
          var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
          imgEl.setAttribute('src', iconUrl);
          cityName.append(imgEl);
       
         
          var tempToday = document.createElement('p');
          var currentTemp = data.current.temp;
          tempToday.innerHTML = "Temperature: " + currentTemp + "\u00B0" + " F";
          todayContainerEl.append(tempToday);
    
        
          var windToday = document.createElement('p');
          var currentWind = data.current.wind_speed;
          windToday.innerHTML = "Wind: " + currentWind + " MPH";
          todayContainerEl.append(windToday);

         
          var humidityToday = document.createElement('p');
          var currentHumidity = data.current.humidity;
          humidityToday.innerHTML = "Humidity: " + currentHumidity + "%";
          todayContainerEl.append(humidityToday);

       
          var uvIndexLabel = document.createElement('p');
          todayContainerEl.append(uvIndexLabel);
          uvIndexLabel.innerHTML = "UV Index:   " 

          var uvIndexValue = document.createElement('p');
          uvIndexLabel.append(uvIndexValue);

          var currentUVI = data.current.uvi;
          uvIndexValue.innerHTML = currentUVI;
          
          if (currentUVI <= 2) {
            $(uvIndexValue).addClass("favorable");
          } else if (currentUVI >= 3 && currentUVI <= 5) {
            $(uvIndexValue).addClass("moderate");
          } else {
            $(uvIndexValue).addClass("severe");
          }

         
          var fiveDayTitleEl = document.querySelector("#fiveDayTitle");
          fiveDayTitleEl.innerHTML = "5-Day Forecast:";

          for (var i = 0; i < 5; i++) {

         
          var cardRowEl = document.querySelector("#cardRow");
          var cardEl = document.createElement('div');
          cardEl.classList.add("custom-card");
          cardEl.classList.add("col");
          cardRowEl.append(cardEl);
         
          var dateEl = document.createElement('div');
          var dateData = moment.unix(data.daily[i].dt).format("MM/DD/YYYY")
          dateEl.innerHTML = dateData;
          dateEl.classList.add("custom-header");
          cardEl.append(dateEl);
          
          var imgEl5 = document.createElement('img');
          var iconCode5 = data.daily[i].weather[0].icon;
          var iconUrl5 = "https://openweathermap.org/img/w/" + iconCode5 + ".png";
          imgEl5.setAttribute('src', iconUrl5);
          cardEl.append(imgEl5);
         
          var temp = document.createElement('p');
          var tempData = data.daily[i].temp.day
          temp.innerHTML = "Temp: " + tempData + "\u00B0" + " F";
          cardEl.append(temp);
         
          var wind = document.createElement('p');
          var windData = data.daily[i].wind_speed
          wind.innerHTML = "Wind: " + windData + " MPH";
          cardEl.append(wind);
          
          var humidity = document.createElement('p');
          var humidityData = data.daily[i].humidity
          humidity.innerHTML = "Humidity: " + humidityData + "%";
          cardEl.append(humidity);
          }

        });
      }); 
}