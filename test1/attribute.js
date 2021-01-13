const { DataTypes, Model } = require("sequelize");

const sequelize = require("../sequelize");
const Resource = require("./resource");

class Attribute extends Model {
  static col = {
    id: "id",
    title: "title",
    resourceId: "resourceId",
  };
  static alias = {
    resource: "attributeResource",
    permissions: "permissionHasAttribute",
  };
}

Attribute.init(
  {
    [Attribute.col.id]: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    [Attribute.col.title]: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    [Attribute.col.resourceId]: {
      type: DataTypes.UUID,
      unique: true,
      references: {
        model: Resource,
        key: Resource.col.id,
      },
    },
  },
  {
    sequelize: sequelize.getSeq(),
  }
);

Attribute.belongsTo(Resource, {
  as: Attribute.alias.resource,
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: Attribute.col.resourceId,
});
Resource.hasMany(Attribute, {
  as: Resource.alias.attribute,
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: Attribute.col.resourceId,
});

module.exports = Attribute;
