const API_KEY = "8aab64edbc369eef08f2fadd403d551b"; // paste here

export async function getWeather(city = "Chennai") {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        console.log("Response status:", res.status);
        const data = await res.json();
        console.log("Weather data:", data);
        return {
            city: data.name,
            temp: data.main.temp,
            condition: data.weather[0].main
        };

    } catch (error) {
        console.error("Weather error:", error);
        return null;
    }
}

