const { DataTypes, Model } = require("sequelize");

const sequelize = require("../sequelize");

class Asset extends Model {}
Asset.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    url: DataTypes.STRING,
  },
  {
    sequelize: sequelize.getSeq(),
  }
);

module.exports = Asset;
