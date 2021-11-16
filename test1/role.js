const { DataTypes, Model } = require("sequelize");

const sequelize = require("../sequelize");

class Role extends Model {
  static col = {
    id: "id",
    name: "name",
    isBasic: "isBasic",
  };
  static alias = {
    users: "RoleHasUsers",
  };
}

Role.init(
  {
    [Role.col.id]: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    [Role.col.name]: DataTypes.STRING,
    [Role.col.isBasic]: DataTypes.BOOLEAN,
  },
  {
    sequelize: sequelize.getSeq(),
  }
);

module.exports = Role;
