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
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    sequelize: sequelize.getSeq(),
  }
);

Product.belongsTo(Asset, {
  as: "PrimaryAsset",
  foreignKey: "primaryAssetId",
});
Asset.hasOne(Product, {
  as: "isPrimaryAssetFor",
  foreignKey: "primaryAssetId",
});

module.exports = Product;
