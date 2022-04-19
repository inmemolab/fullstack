import { Sequelize, Model } from "sequelize";

import userFactory, { User } from "./user.model";
import roleFactory, { Role } from "./role.model";
import RefreshTokenFactory, { RefreshToken } from "./refresh-token.model";
import socketFactory, { Socket } from "./socket.model";
// import { logger } from '../utils/logger';
import * as config from "../config/config";
//* Export type
export type DB = {
  sequelize: Sequelize;
  User: any;
  Role: any;
  RefreshToken: any;
  Socket: any;
  [key: string]: any;
};

const temp: { [key: string]: any } = config;
const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize(
  temp[env].database,
  temp[env].username,
  temp[env].passowrd,
  temp[env]
);

const db: DB = {
  sequelize,
  Sequelize,
  User: userFactory(sequelize),
  Role: roleFactory(sequelize),
  RefreshToken: RefreshTokenFactory(sequelize),
  Socket: socketFactory(sequelize)
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

db.ROLES = ["user", "admin", "content-manager", "seller"];

export default db;
