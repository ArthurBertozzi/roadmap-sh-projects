import WeatherApiClient from "../client/weather-api.client";

export class WeatherService {
  async getCityForecast(city: string) {
    return await WeatherApiClient.getWeatherForecastData(city);
  }
}

export default new WeatherService();
