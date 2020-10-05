import dotenv from "dotenv";
dotenv.config();

interface Tipos {
  dev: boolean;
  port: string | number | undefined;
  cors: string | undefined;
  dbUser: string | undefined;
  dbPassword: string | undefined;
  dbHost: string | undefined;
  dbName: string | undefined;
  dbPort: string | undefined;
  jwtSecret: String | undefined;
}

const config: Tipos = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT || 7000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  jwtSecret: process.env.AUTH_JWT_SECRET,
};

module.exports = { config };