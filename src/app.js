import bodyParser from "body-parser";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import swaggerSpec from "./api-docs.js";
import swaggerUI from "swagger-ui-express";
import { listenForClientEvents } from "./services/rabbitServiceListener.js";
import cors from "cors";

const app = express();

// Configuración de CORS más detallada
app.use(cors({
    origin: "*",  // Puedes cambiar esto a la URL del ESB si deseas restringir el acceso
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(bodyParser.json());

listenForClientEvents();

app.use("/api/users", userRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default app;
