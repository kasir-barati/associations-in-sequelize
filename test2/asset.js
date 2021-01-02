const { DataTypes, Model } = require("sequelize");

const sequelize = require("../sequelize");

class Asset extends Model {
  static alias = {
    productPrimaryAsset: "ProductHasPrimaryAssetId",
    products: "ProductHasAssetIds",
  };
}
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
