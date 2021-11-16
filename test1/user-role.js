const { DataTypes, Model } = require("sequelize");

const sequelize = require("../sequelize");
const User = require("./user");
const Role = require("./role");

class UserRole extends Model {
  static col = {
    roleId: "roleId",
    userId: "userId",
  };
}
UserRole.init(
  {
    [UserRole.col.roleId]: {
      primaryKey: true,
      type: DataTypes.UUID,
      references: {
        model: Role,
        key: Role.col.id,
      },
    },
    [UserRole.col.userId]: {
      primaryKey: true,
      type: DataTypes.UUID,
      references: {
        model: User,
        key: User.col.id,
      },
    },
  },
  {
    sequelize: sequelize.getSeq(),
  }
);

User.belongsToMany(Role, {
  through: UserRole,
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: User.alias.roles,
  foreignKey: UserRole.col.userId,
  otherKey: UserRole.col.roleId,
});
Role.belongsToMany(User, {
  through: UserRole,
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: Role.alias.users,
  foreignKey: UserRole.col.roleId,
  otherKey: UserRole.col.userId,
});

module.exports = UserRole;
