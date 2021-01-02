const { DataTypes, Model } = require("sequelize");

const Role = require("./role");
const sequelize = require("../sequelize");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
  },
  {
    sequelize: sequelize.getSeq(),
  }
);

User.belongsTo(Role, {
  as: "UserHasRole",
  foreignKey: "RoleId",
});
Role.hasMany(User, {
  as: "Users",
});

module.exports = User;
