let nextButton = document.getElementById("mainButton");
let jokeContainer = document.getElementById("jokeContainer");
let rateButtons = document.querySelectorAll(".rate-buttons");
type JokeObject = {
    joke: string,
    nota: number,
    date: string
}
let reportJokes: JokeObject[] = [];

window.addEventListener("load", (event) => {
    showJoke();
});

nextButton?.addEventListener("click", showJoke);

rateButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        if (reportJokes.length > 0) {
            let actualJoke = reportJokes[reportJokes.length - 1];
            actualJoke.nota = index + 1;
            console.log(reportJokes);
        }
    });
})

function showJoke() {
    fetch("https://icanhazdadjoke.com", {
        headers: {
            "Accept": "application/json"
        }
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Joke couldn't be loaded");
            }
        })
        .then(function (data) {
            const joke: string = data.joke;
            const newJoke: JokeObject = {
                joke: joke,
                nota: 0,
                date: new Date().toISOString()
            };
            reportJokes.push(newJoke);
            console.log(reportJokes);
            jokeContainer!.textContent = newJoke.joke;
        })
        .catch(function (error) {
            console.error("Error to load the joke: ", error);
            jokeContainer!.textContent = "An error has occurred. Try again later";
        });
}





