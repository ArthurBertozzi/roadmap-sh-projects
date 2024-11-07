import axios from "axios";
import { config } from "../config";

class WeatherApiClient {
  private client: any;
  private apiKey: string;

  constructor() {
    this.client = axios.create({
      baseURL: "https://api.weatherapi.com/v1",
    });
    this.apiKey = config.weatherApiKey || "";
  }

  async getWeatherForecastData(location: string, days: number = 4) {
    const response = await this.client.get(`/forecast.json`, {
      params: {
        key: this.apiKey,
        q: location,
        days,
        aqi: "no",
        alerts: "no",
      },
    });
    return response.data;
  }
}

export default new WeatherApiClient();

// const weatherApiClient = new WeatherApiClient();
// const location = "Sao Paulo";
// weatherApiClient.getWeatherForecastData(location).then((data) => {
//   console.log(data);
// });
