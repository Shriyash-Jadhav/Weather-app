let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempval = document.getElementById("temp-value");
let climate = document.getElementById("climate");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = " ";
})

const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dab3af44de7d24ae7ff86549334e45bd`,

            { mode: 'cors' }
        );
        const weatherData = await response.json();
        const { name } = weatherData;
        const { temp } = weatherData.main;
        const { id, main } = weatherData.weather[0];

        loc.textContent = name;
        climate.textContent = main;
        tempval.textContent = Math.round(temp - 273);

        if (id < 300 && id > 200) {
            tempicon.src = "./icons/thunderstorm.svg"
        }
        else if (id < 400 && id > 300) {
            tempicon.src = "./icons/cloud-solid.svg"
        }
        else if (id < 600 && id > 500) {
            tempicon.src = "./icons/rain.svg"
        }
        else if (id < 700 && id > 600) {
            tempicon.src = "./icons/snow.svg"
        }
        else if (id < 800 && id > 700) {
            tempicon.src = "./icons/clouds.svg"
        }
        else if (id == 800) {
            tempicon.src = "./icons/clouds-and-sun.svg"
        }
        console.log(weatherData);

    }
    catch (err) {
        alert("City Not Found");
    }
}

window.addEventListener("load", () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";

            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4bd1b3f44bb1bdfcd0768fb8825e1f77`
            fetch(api).then((response) => {
                return response.json();
            })
                .then(data => {
                    const { name } = data;
                    const { temp } = data.main;
                    const { id, main } = data.weather[0];

                    loc.textContent = name;
                    climate.textContent = main;
                    tempval.textContent = Math.round(temp - 273);

                    if (id < 300 && id > 200) {
                        tempicon.src = "./icons/thunderstorm.svg"
                    }
                    else if (id < 400 && id > 300) {
                        tempicon.src = "./icons/cloud-solid.svg"
                    }
                    else if (id < 600 && id > 500) {
                        tempicon.src = "./icons/rain.svg"
                    }
                    else if (id < 700 && id > 600) {
                        tempicon.src = "./icons/snow.svg"
                    }
                    else if (id < 800 && id > 700) {
                        tempicon.src = "./icons/clouds.svg"
                    }
                    else if (id == 800) {
                        tempicon.src = "./icons/clouds-and-sun.svg"
                    }
                    console.log(data);
                })
        })
    }
})