const { DataTypes, Model } = require("sequelize");

const sequelize = require("../sequelize");

class Resource extends Model {
  static col = {
    id: "id",
    title: "title",
  };
  static alias = {
    attribute: "resourceAttributes",
  };
}

Resource.init(
  {
    [Resource.col.id]: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    [Resource.col.title]: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelize.getSeq(),
  }
);

module.exports = Resource;
