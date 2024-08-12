import Redis from "ioredis";
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from "../environment";

const PORT: number = Number(REDIS_PORT);

const redis = new Redis({
  host: REDIS_HOST, // Redis server hostname (default is 'localhost')
  port: PORT, // Redis server port (default is 6379)
  password: REDIS_PASSWORD, // Optional password (default is no password)
});

export default redis;

