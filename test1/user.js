const { DataTypes, Model } = require("sequelize");

const sequelize = require("../sequelize");

class User extends Model {
  static col = {
    id: "id",
    email: "email",
    fullname: "fullname",
    password: "password",
    roleId: "roleId",
  };
  static alias = {
    roles: "UserRoles",
  };
}

User.init(
  {
    [User.col.id]: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    [User.col.email]: DataTypes.STRING,
    [User.col.fullname]: DataTypes.STRING,
    [User.col.password]: DataTypes.STRING,
  },
  {
    sequelize: sequelize.getSeq(),
  }
);

module.exports = User;
