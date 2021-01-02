const { DataTypes, Model } = require("sequelize");

// const Asset = require("./asset");
const sequelize = require("../sequelize");
const Asset = require("./asset");

class Product extends Model {}
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

module.exports.alias = {
  assets: "AssetHasProductId",
};

Product.belongsTo(Asset, {
  as: Asset.alias.productPrimaryAsset,
  foreignKey: "primaryAssetId",
});
Asset.hasOne(Product, {
  as: Asset.alias.primaryAsset,
  foreignKey: "primaryAssetId",
});

module.exports = Product;
