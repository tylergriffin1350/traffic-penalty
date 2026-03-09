import config from "./config/config";
import express from "express";
import cors from "cors";
import router from "./router";
import cookieParser from "cookie-parser";
import {authMiddleware} from "./middleware/authMiddleware";
import {errorHandler, notFoundHandler} from "./middleware/errorHandler";
import authRoutes from "./router/authRoutes";
import logger from "./logger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
// app.use(cors());
app.use(
    cors({
      ...config.corsOptions,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'x-api-key',
        'x-user-key',
        'x-organization-id',
        'x-user-id',
        'x-pin',
      ],
      preflightContinue: false,
    })
  );
app.use("/api/v1", authRoutes());
app.use("/api/v1", router());
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
    logger.info(
        `API running on port ${config.port} in ${process.env.NODE_ENV || "development"
        } mode.`
    )
});