//* Ini Import
import * as Sequelize from "sequelize";
import { DB } from "./index";
//* Export Calss
export class Socket extends Sequelize.Model {
  userOnline: boolean;
  userUUID: string;
  userSocketId: string;
  userAuthId: number;
  userAuthUsername: string;
  userIp: string;
  userPath: string;
  //* Link name for associate
  // static relationAliases = [""];
  //* Associate
  // eslint-disable-next-line no-empty-function
  static associate(db: DB) {}
}
//* Export default
export default (sequelize: Sequelize.Sequelize) => {
  Socket.init(
    {
      userOnline: { field: "userOnline", type: Sequelize.DataTypes.BOOLEAN },
      userUUID: { field: "userUUID", type: Sequelize.DataTypes.STRING },
      userSocketId: {
        field: "userSocketId",
        type: Sequelize.DataTypes.STRING,
        primaryKey: true
      },
      userAuthId: { field: "userAuthId", type: Sequelize.DataTypes.INTEGER },
      userAuthUsername: { field: "userAuthUsername", type: Sequelize.DataTypes.STRING },
      userIp: { field: "userIp", type: Sequelize.DataTypes.STRING },
      userPath: { field: "userPath", type: Sequelize.DataTypes.STRING }
    },
    {
      sequelize,
      timestamps: false,
      underscored: false,
      tableName: "sockets"
    }
  );
  return Socket;
};
