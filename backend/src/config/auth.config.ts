//* Ini Import
import * as dotenv from "dotenv";
//* Set dotenv
dotenv.config();
const env = process.env;
//* Export Module
export default {
  secret: env.APP_SECRET,
  jwtExpiration: 60, // 1 minute
  jwtRefreshExpiration: 120 // 2 minutes
};
