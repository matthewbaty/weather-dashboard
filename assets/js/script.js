// jquery
$(function () {
    // define variables for API endpoint and API key
    var apiUrl = "https://api.openweathermap.org/data/2.5/";
    var apiKey = "87f4db31ceb8c0cd0e7db8203ba43945";

    // search input and search button
    var searchInput = $("#search-input");
    var searchButton = $("#search-button");


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
                console.log(data);
                //clear weather icon
                $('.icon').empty();
                // update the page to show info
                $('.city').text(`${data.name}`);
                $('.icon').append(`<img src="${iconUrl}" alt="Weather icon">`);
                $('.temp').text(`Temperature: ${data.main.temp}°F`);
                $('.wind').text(`Wind: ${data.wind.speed} MPH`);
                $('.humidity').text(`Humidity: ${data.main.humidity}%`);
            })
            .catch(error => console.error(error));

        // start of test

        // get the latitude and longitude of the city
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=87f4db31ceb8c0cd0e7db8203ba43945&units=imperial`)
            .then(response => response.json())
            .then(data => {
                var lat = data.coord.lat;
                var lon = data.coord.lon;

                // use the forecast API to get the forecast data
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=87f4db31ceb8c0cd0e7db8203ba43945&units=imperial`)
                    // .then(response => response.json())
                    // .then(data => {
                    //     //clear previous forecast
                    //     $('#forecast').empty();
                    //     // loop through the forecast data and create a card for each day
                    //     for (var i = 0; i < data.list.length; i += 8) {
                    //         var date = moment(data.list[i].dt_txt).format('MMM Do');
                    //         var iconCode = data.list[i].weather[0].icon;
                    //         var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
                    //         var temp = data.list[i].main.temp.toFixed(0);
                    //         var humidity = data.list[i].main.humidity;
                    //         // create card
                    //         var card = $('<div>').addClass('card col-lg-2 col-md-4 col-sm-6 col-12');
                    //         var cardBody = $('<div>').addClass('card-body');
                    //         var cardTitle = $('<h5>').addClass('card-title').text(date);
                    //         var cardIcon = $('<img>').attr('src', iconUrl).attr('alt', 'Weather icon');
                    //         var cardTemp = $('<p>').addClass('card-text').text(`Temp: ${temp}°F`);
                    //         var cardHumidity = $('<p>').addClass('card-text').text(`Humidity: ${humidity}%`);
                    //         // append card to forecast section
                    //         cardBody.append(cardTitle, cardIcon, cardTemp, cardHumidity);
                    //         card.append(cardBody);
                    //         $('#forecast').append(card);
                    //     }
                    // })
                    // .catch(error => console.error(error));
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
                            const cardTemp = $(`<p class="card-text">Temperature: ${dayData.main.temp}&deg;F</p>`);
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
    });
});