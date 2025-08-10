import dotenv from "dotenv";

dotenv.config();

const dev = {
  // Environment
  env: process.env.NODE_ENV || "development",

  // Server config
  nodeServerPort: process.env.NODE_SERVER_PORT || 2900,
  nodeServerHost: process.env.NODE_SERVER_HOST || "localhost",
  nodeServerPublicKey: process.env.NODE_SERVER_PUBLIC_KEY?.replace(
    /\\n/g,
    "\n"
  ),

  // API GATEWAY URL
  apiGatewayUrl: process.env.API_GATEWAY_URL || "http://localhost:2000",
  webClientUrl: process.env.WEB_CLIENT_URL || "http://localhost:7000",
  webBackofficeUrl: process.env.WEB_BACKOFFICE_URL || "http://localhost:5000",

  // Redis db
  redisDbPort: process.env.REDIS_DB_PORT || 6379,
  redisDbHost: process.env.REDIS_DB_HOST || "127.0.0.1",
  redisDbUser: process.env.REDIS_DB_USER || "valentin",
  redisDbPassword: process.env.REDIS_DB_PASSWORD || "password",
  redisDbName: process.env.REDIS_DB_NAME || "redis",

  // Mongo db
  mongoDbHost: process.env.MONGODB_DB_HOST || "127.0.0.1",
  mongoDbPort: process.env.MONGODB_DB_PORT || "27017",
  mongoDbUser: process.env.MONGODB_DB_USER || "e_luxe",
  mongoDbPassword: process.env.MONGODB_DB_PASSWORD || "e_luxe2024!",
  mongoDbName: process.env.MONGODB_DB_NAME || "el_settings_db",

  // Rabbitmq db
  rabbitmqDbHost: process.env.RABBITMQ_DB_HOST || "127.0.0.1",
  rabbitmqDbPort: process.env.RABBITMQ_DB_PORT || "15672",
  rabbitmqDbUser: process.env.RABBITMQ_DB_USER || "valentin",
  rabbitmqDbPassword: process.env.RABBITMQ_DB_PASSWORD || "password",
  rabbitmqDbName: process.env.RABBITMQ_DB_NAME || "el_settings_db",

  // Mail config
  mailHost: process.env.MAIL_HOST || "smtp.gmail.com",
  mailPort: process.env.MAIL_PORT || 587,
  mailSecure: false,
  mailAuth: {
    user: process.env.MAIL_USERNAME || "wazala.inc@gmail.com",
    pass: process.env.MAIL_PASSWORD || "gcztltxnizobhvzh",
  },

  // Swagger documentation
  swaggerBaseUrl: process.env.SWAGGER_BASE_URL || "/v1/settings/docs",
};

export default dev;
