// jquery
$(function () {
    // define variables for API endpoint and API key
    var apiUrl = "https://api.openweathermap.org/data/2.5/";
    var apiKey = "87f4db31ceb8c0cd0e7db8203ba43945";

    // search input and search button
    var searchInput = $("#search-input");
    var searchButton = $("#search-button");

    $('form').submit(function(event) {
        // validation
        event.preventDefault(); 
        
        // get the user input 
        var city = $('input').val().trim();
        
        // use the weather API to get the weather data
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=87f4db31ceb8c0cd0e7db8203ba43945&units=imperial`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // update the page to show info
            $('.temp').text(`Temperature: ${data.main.temp}°F`);
            $('.wind').text(`Wind: ${data.wind.speed} MPH`);
            $('.humidity').text(`Humidity: ${data.main.humidity}%`);
        })
        .catch(error => console.error(error));
    });
});


fetch("https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={87f4db31ceb8c0cd0e7db8203ba43945}")