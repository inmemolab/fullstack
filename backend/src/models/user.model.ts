//* Ini Import
import * as Sequelize from "sequelize";
import { DB } from "./index";
//* Export Calss
export class User extends Sequelize.Model {
  id?: number;
  username: string;
  email!: string;
  password!: string;
  //* Link name for associate
  static relationAliases = ["user_roles"];
  //* Associate
  static associate(db: DB) {
    db.User.hasOne(db.RefreshToken, {
      foreignKey: "userId",
      targetKey: "id"
    });
    db.User.belongsToMany(db.Role, {
      through: "user_roles",
      foreignKey: "userId",
      otherKey: "roleId"
    });
  }
}
//* Export default
export default (sequelize: Sequelize.Sequelize) => {
  User.init(
    {
      username: { field: "username", type: Sequelize.DataTypes.STRING },
      email: {
        field: "email",
        type: Sequelize.DataTypes.STRING,
        unique: { name: "email", msg: "email already exist" }
      },
      password: { field: "password", type: Sequelize.DataTypes.STRING }
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "users"
    }
  );
  return User;
};
