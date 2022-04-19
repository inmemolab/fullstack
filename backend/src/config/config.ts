//* Ini Import
import * as dotenv from "dotenv";
//* Set dotenv
dotenv.config();
const env = process.env;
//* Export Module
module.exports = {
  development: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    dialect: "mysql"
  },
  test: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    dialect: "mysql"
  },
  production: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    dialect: "mysql"
  }
};
