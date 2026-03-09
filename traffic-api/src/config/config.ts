import dotenv from "dotenv";
dotenv.config();

type Env = "development" | "production";

const parseAllowedOrigins = (): string[] | boolean => {
  const origins = process.env.ALLOWED_ORIGINS;
  if (origins === "*") return true;
  return origins ? origins.split(",").map((origin) => origin.trim()) : [];
};

const config = {
  development: {
    port: Number(process.env.PORT) || 5000,
    corsOptions: {
      origin: parseAllowedOrigins(),
      credentials: true,
      optionsSuccessStatus: 204,
    },
    logLevel: "debug",
  },
  production: {
    port: Number(process.env.PORT) || 5000,
    corsOptions: {
      origin: parseAllowedOrigins(),
      credentials: true,
      optionsSuccessStatus: 204,
    },
    logLevel: "info",
  },
};

const env = (process.env.NODE_ENV as Env) || "development";
export default config[env];
