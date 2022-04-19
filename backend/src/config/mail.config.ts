//* Ini Import
import * as dotenv from "dotenv";
//* Set dotenv
dotenv.config();
const env = process.env;
//* Export Module
export default {
  mailHost: env.MAIL_HOST,
  mailPort: env.MAIL_PORT,
  mailSecure: env.MAIL_SECURE,
  mailUser: env.MAIL_USER,
  mailPassword: env.MAIL_PASSWORD
};
