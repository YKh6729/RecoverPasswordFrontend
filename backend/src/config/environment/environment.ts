import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 5000;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USERNAME = process.env.DB_USERNAME || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";
export const REDIS_HOST = process.env.REDIS_HOST || undefined;
export const REDIS_PORT = process.env.REDIS_PORT || undefined;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || undefined;
