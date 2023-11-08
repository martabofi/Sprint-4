"use strict";
let nextButton = document.getElementById("mainButton");
let jokeContainer = document.getElementById("jokeContainer");
let rateButtons = document.querySelectorAll(".rate-buttons");
const fetchOptions = {
    method: "GET",
    headers: {
        "Accept": "application/json"
    }
};
let reportJokes = [];
let weather = document.getElementById("weather");
let jokeAPIs = ["https://icanhazdadjoke.com", "https://api.chucknorris.io/jokes/random"];
window.addEventListener("load", (event) => {
    showJoke();
    showWeather();
});
nextButton === null || nextButton === void 0 ? void 0 : nextButton.addEventListener("click", showJoke);
rateButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        if (reportJokes.length > 0) {
            let actualJoke = reportJokes[reportJokes.length - 1];
            actualJoke.nota = index + 1;
            console.log(reportJokes);
        }
    });
});
function showJoke() {
    const randomAPI = jokeAPIs[Math.floor(Math.random() * jokeAPIs.length)];
    fetch(randomAPI, fetchOptions)
        .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error("Joke couldn't be loaded");
        }
    })
        .then(function (data) {
        let joke = "";
        if (data.hasOwnProperty("joke")) {
            joke = data.joke;
        }
        else if (data.hasOwnProperty("value")) {
            joke = data.value;
        }
        if (joke) {
            const newJoke = {
                joke: joke,
                nota: 0,
                date: new Date().toISOString()
            };
            reportJokes.push(newJoke);
            console.log(reportJokes);
            jokeContainer.textContent = newJoke.joke;
        }
        else {
            throw new Error("Formato de datos no reconocido");
        }
    })
        .catch(function (error) {
        console.error("Error to load the joke: ", error);
        jokeContainer.textContent = "An error has occurred. Try again later";
    });
}
function showWeather() {
    fetch("https://www.el-tiempo.net/api/json/v2/home", fetchOptions)
        .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error("Weather couldn't be loaded");
        }
    })
        .then(function (data) {
        weather.textContent = "🌥️ " + data.ciudades[0].name + ": " + data.ciudades[0].stateSky.description;
    })
        .catch(function (error) {
        console.error("Error to load weather: ", error);
        weather.textContent = "An error has occurred. Try again later";
    });
}
//# sourceMappingURL=index.js.map