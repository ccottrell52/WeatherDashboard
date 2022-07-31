
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