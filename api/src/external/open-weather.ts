import * as https from "https";

const openWeatherOptions = {
    host: "api.openweathermap.org",
    path: `/data/2.5/weather?q=Manila,ph&appid=${process.env.OPEN_WEATHER_KEY}`,
    method: 'GET',
};

export interface WeatherData {
    city: string;
    country: string;
    description: string;
    temp: Number;
}

export async function getWeatherData(): Promise<WeatherData> {
    return new Promise((resolve, reject) => {
        https.get(openWeatherOptions, (res) => {
            if (res.statusCode !== 200) {
                reject(`Error: Failed to fetch data, status code: ${res.statusCode}`);
                return;
            }

            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    const weather: WeatherData = {
                        city: parsedData.name,
                        country: parsedData.sys.country,
                        description: parsedData.weather[0].description,
                        temp: parsedData.main.temp,
                    };
                    resolve(weather);
                } catch (error) {
                    reject('Error parsing data');
                }
            });
        }).on('error', (err) => {
            console.error(`getWeatherData => Request error: ${err}`);
            reject(`Request error: ${err}`);
        });
    });
}
