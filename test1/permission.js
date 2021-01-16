const { DataTypes, Model } = require("sequelize");

const sequelize = require("../sequelize");
const Attribute = require("./attribute");
const access = require("./access.json");

class Permission extends Model {
  static col = {
    id: "id",
    access: "access",
    attributeId: "attributeId",
  };
  static alias = {
    attributes: "permissionAttribute",
    roles: "permissionRoles",
  };
}

Permission.init(
  {
    [Permission.col.id]: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    [Permission.col.access]: {
      type: DataTypes.ENUM(Object.values(access)),
      allowNull: false,
    },
    [Permission.col.attributeId]: {
      type: DataTypes.UUID,
      references: {
        model: Attribute,
        key: Attribute.col.id,
      },
    },
  },
  {
    sequelize: sequelize.getSeq(),
  }
);

Permission.belongsTo(Attribute, {
  as: Permission.alias.attributes,
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: Permission.col.attributeId,
});
Attribute.hasMany(Permission, {
  as: Attribute.alias.permissions,
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: Permission.col.attributeId,
});

module.exports = Permission;
