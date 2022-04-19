//* Ini Import
import * as Sequelize from "sequelize";
import { DB } from "./index";
//* Export Calss
export class Role extends Sequelize.Model {
  id?: number;
  name: string;
  //* Link name for associate
  static relationAliases = ["user_roles"];
  //* Associate
  static associate(db: DB) {
    db.Role.belongsToMany(db.User, {
      through: "user_roles",
      foreignKey: "roleId",
      otherKey: "userId"
    });
  }
}
//* Export default
export default (sequelize: Sequelize.Sequelize) => {
  Role.init(
    {
      name: { field: "name", type: Sequelize.DataTypes.STRING }
    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      tableName: "roles"
    }
  );
  return Role;
};
