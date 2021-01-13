const { DataTypes, Model } = require("sequelize");

const Permission = require("./permission");
const sequelize = require("../sequelize");
const Role = require("./role");

class RolePermission extends Model {
  static col = {
    permissionId: "permissionId",
    roleId: "roleId",
  };
}

RolePermission.init(
  {
    [RolePermission.col.roleId]: {
      primaryKey: true,
      type: DataTypes.UUID,
      references: {
        model: Role,
        key: Role.col.id,
      },
    },
    [RolePermission.col.permissionId]: {
      primaryKey: true,
      type: DataTypes.UUID,
      references: {
        model: Permission,
        key: Permission.col.id,
      },
    },
  },
  {
    sequelize: sequelize.getSeq(),
  }
);

Permission.belongsToMany(Role, {
  as: Permission.alias.roles,
  through: RolePermission,
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: RolePermission.col.permissionId,
  otherKey: RolePermission.col.roleId,
});
Role.belongsToMany(Permission, {
  as: Role.alias.permissions,
  through: RolePermission,
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: RolePermission.col.roleId,
  otherKey: RolePermission.col.permissionId,
});

module.exports = RolePermission;
