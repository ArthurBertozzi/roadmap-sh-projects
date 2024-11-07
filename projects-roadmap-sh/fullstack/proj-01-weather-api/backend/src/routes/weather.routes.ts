import express from "express";
import { getWeatherForecast } from "../controllers/weather.controller";

const router = express.Router();

router.get("/weather", getWeatherForecast);

export default router;
