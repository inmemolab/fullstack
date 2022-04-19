//* Ini Import
import config from "../config/auth.config";
import { v4 as uuidv4 } from "uuid";
import * as Sequelize from "sequelize";
import { DB } from "./index";
//* Export Calss
export class RefreshToken extends Sequelize.Model {
  id?: number;
  token: string;
  expiryDate: Date;
  //* Link name for associate
  // static relationAliases = ["user_refresh_token"];
  static createToken: (user: any) => Promise<any>;
  static verifyExpiration: (token: any) => boolean;
  //* Associate
  static associate(db: DB) {
    db.RefreshToken.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "id"
    });
  }
}
//* Export default
export default (sequelize: Sequelize.Sequelize) => {
  RefreshToken.init(
    {
      token: { field: "token", type: Sequelize.DataTypes.STRING },
      expiryDate: { field: "expiryDate", type: Sequelize.DataTypes.DATE }
    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      tableName: "refresh_tokens"
    }
  );

  RefreshToken.createToken = async function (user: any) {
    const expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    const _token = uuidv4();

    const refreshToken = await this.create({
      token: _token,
      userId: user.id,
      expiryDate: expiredAt.getTime()
    });

    return refreshToken.token;
  };

  RefreshToken.verifyExpiration = (token: any) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };
  return RefreshToken;
};
