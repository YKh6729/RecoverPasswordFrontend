import redis from "../config/redis";

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
  throw new Error("Redis connection failed");
});

redis.on("connect", () => {
  console.log("Connected to Redis");
});

export default redis;
