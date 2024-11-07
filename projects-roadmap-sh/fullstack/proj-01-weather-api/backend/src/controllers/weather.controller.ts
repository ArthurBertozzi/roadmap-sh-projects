import { Request, Response } from "express";
import WeatherService from "../services/weather.service";

export const getWeatherForecast = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const city = req.query.city as string;
    if (!city) {
      res.status(400).json({ error: 'O parâmetro "city" é obrigatório.' });
      return;
    }

    const data = await WeatherService.getCityForecast(city);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter previsão do tempo." });
  }
};
