const { DataTypes, Model } = require("sequelize");

// const Asset = require("./asset");
const sequelize = require("../sequelize");
const Asset = require("./asset");

class Product extends Model {
  static alias = {
    assets: "AssetHasProductId",
    primaryAsset: "AssetIsPrimaryAssetFor",
  };
}
Product.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    primaryAssetId: {
      type: DataTypes.UUID,
    },
  },
  {
    sequelize: sequelize.getSeq(),
  }
);

Product.belongsTo(Asset, {
  as: Product.alias.primaryAsset,
  foreignKey: "primaryAssetId",
});
Asset.hasOne(Product, {
  as: Asset.alias.productPrimaryAsset,
  foreignKey: "primaryAssetId",
});

module.exports = Product;
