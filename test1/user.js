const { DataTypes, Model } = require("sequelize");

const Role = require("./role");
const sequelize = require("../sequelize");

  static col = {
    id: "id",
    name: "name",
    roleId: "roleId",
  };
User.init(
  {
    [User.col.id]: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    [User.col.name]: DataTypes.STRING,
    [User.col.roleId]: {
      type: DataTypes.UUID,
      references: { model: Role, key: Role.col.id },
    },
  },
  {
    sequelize: sequelize.getSeq(),
  }
);

User.belongsTo(Role, {
  foreignKey: User.col.roleId,
});
Role.hasMany(User, {
  as: "Users",
});

module.exports = User;
