export async function getWeather(city = "Chennai") {
    const conditions = ["Sunny ☀️", "Cloudy ☁️", "Rainy 🌧️", "Stormy ⛈️"];

    const randomIndex = Math.floor(Math.random() * conditions.length);

    return {
        city,
        temp: Math.floor(Math.random() * 15) + 20,
        condition: conditions[randomIndex]
    };
}