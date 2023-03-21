// jquery
$(function () {

    // prevent local storage from clearing
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // define variables for API URL and API key
    var apiUrl = "https://api.openweathermap.org/data/2.5/";
    var apiKey = "87f4db31ceb8c0cd0e7db8203ba43945";

    var searchResultsContainer = $("#search-results");

    // function to add a new button to the search history list
    function addSearchHistoryButton(city) {
        var buttonId = "search-" + city.replace(/[^a-zA-Z0-9]/g, "-");
        if ($("#" + buttonId).length === 0) {
            var searchResultItem = $('<li class="btn btn-primary col-12 search-history-btn" style="margin-bottom: 10px;">')
                .attr("id", buttonId)
                .text(city)
                .click(function () {
                    $('input').val(city);
                    $('form').submit();
                });
            searchResultsContainer.append(searchResultItem);
        }
    }
    
    // add buttons for each city in the search history
    for (var i = 0; i < searchHistory.length; i++) {
        addSearchHistoryButton(searchHistory[i]);
    }


    $('form').submit(function (event) {
        // validation
        event.preventDefault();

        // get the user input 
        var city = $('input').val().trim();

        // use the weather API to get the weather data
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=87f4db31ceb8c0cd0e7db8203ba43945&units=imperial`)
            .then(response => response.json())
            .then(data => {
                // weather icon vars
                var iconCode = data.weather[0].icon;
                var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

                //clear weather icon
                $('.icon').empty();
                // update the page to show info
                $('.city').text(`${data.name}`);
                $('.date').text(`${moment(data.dt * 1000).format("(MM/DD/YYYY)")}`);
                $('.icon').append(`<img src="${iconUrl}" alt="Weather icon">`);
                $('.temp').text(`Temperature: ${data.main.temp}°F`);
                $('.wind').text(`Wind: ${data.wind.speed} MPH`);
                $('.humidity').text(`Humidity: ${data.main.humidity}%`);
            })
            .catch(error => console.error(error));

        // get the latitude and longitude of the city
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=87f4db31ceb8c0cd0e7db8203ba43945&units=imperial`)
            .then(response => response.json())
            .then(data => {
                var lat = data.coord.lat;
                var lon = data.coord.lon;

                // use the forecast API to get the forecast data
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=87f4db31ceb8c0cd0e7db8203ba43945&units=imperial`)
                    .then(response => response.json())
                    .then(data => {
                        // clear the forecast div
                        $('#forecast').empty();

                        // loop through the data to generate 5 cards
                        for (let i = 0; i < 5; i++) {
                            // get the data for the specific day
                            const dayData = data.list[i * 8];

                            // create a new card div
                            const card = $('<div class="card col-md"></div>');

                            // create the card body with the day, icon, temperature, and humidity
                            const cardBody = $(`<div class="card-body"></div>`);
                            const cardTitle = $(`<h5 class="card-title">${moment(dayData.dt_txt).format("MM/DD/YYYY")}</h5>`);
                            const cardIcon = $(`<img src="https://openweathermap.org/img/w/${dayData.weather[0].icon}.png" alt="Weather icon">`);
                            const cardTemp = $(`<p class="card-text">Temp: ${dayData.main.temp}&deg;F</p>`);
                            const cardWind = $(`<p class="card-test">Wind: ${dayData.wind.speed} MPH</p>`);
                            const cardHumidity = $(`<p class="card-text">Humidity: ${dayData.main.humidity}%</p>`);

                            // add the card elements to the card body
                            cardBody.append(cardTitle, cardIcon, cardTemp, cardWind, cardHumidity);
                            card.append(cardBody);

                            // add the card to the forecast div
                            $('#forecast').append(card);
                        }
                    })
                    .catch(error => console.error(error));
            });
        // get the searched city from the input field
        var city = $('.form-control').val();

        // save the city to local storage
        var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        
        // calls button function to create button
        addSearchHistoryButton(city);

    });
});