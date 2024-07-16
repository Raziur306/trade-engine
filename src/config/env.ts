import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  "TELEGRAM_BOT_TOKEN",
  "BYBIT_API_KEY",
  "BYBIT_API_SECRET",
  "PORT",
  "ADMIN_TELEGRAM_BOT_TOKEN",
  "ADMIN_GROUP_ID",
  "CHANNEL_ID",
  "TRADECALL_API_ENDPOINT",
  "ADMIN_TELEGRAM_CHAT_ID",
  'USER_ID',
];

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`
  );
}

export default {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN as string,
  BYBIT_API_KEY: process.env.BYBIT_API_KEY as string,
  BYBIT_API_SECRET: process.env.BYBIT_API_SECRET as string,
  PORT: parseInt(process.env.PORT as string, 10),
  ADMIN_TELEGRAM_BOT_TOKEN: process.env.ADMIN_TELEGRAM_BOT_TOKEN as string,
  ADMIN_GROUP_ID: process.env.ADMIN_GROUP_ID || "TRADE CALLS APP",
  CHANNEL_ID: process.env.CHANNEL_ID as string,
  TRADECALL_API_ENDPOINT:
    process.env.TRADECALL_API_ENDPOINT || "/api/v1/tradecall",
  ADMIN_TELEGRAM_CHAT_ID: process.env.ADMIN_TELEGRAM_CHAT_ID as string,
  Testnet: process.env.Testnet || false,
  USER_ID: process.env.USER_ID as string,
};
