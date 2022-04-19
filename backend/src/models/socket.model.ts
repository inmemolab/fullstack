//* Ini Import
import * as Sequelize from "sequelize";
import { DB } from "./index";
//* Export Calss
export class Socket extends Sequelize.Model {
  id?: number;
  path: string;
  socketId: string;
  userId: number;
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
      path: { field: "path", type: Sequelize.DataTypes.STRING },
      socketId: { field: "socketId", type: Sequelize.DataTypes.STRING },
      userId: { field: "userId", type: Sequelize.DataTypes.INTEGER }
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
