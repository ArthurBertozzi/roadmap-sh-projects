import express from "express";
import weatherRoutes from "./routes/weather.routes";

const app = express();

app.use(express.json());
app.use("/api/v1", weatherRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

export default app;
