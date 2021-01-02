const { DataTypes, Model } = require("sequelize");

const sequelize = require("../sequelize");
const Product = require("./product");
const Asset = require("./asset");

class ProductAsset extends Model {}
ProductAsset.init(
  {
    productId: {
      type: DataTypes.UUID,
      primaryKey: true,
      // defaultValue: DataTypes.UUIDV4,
    },
    assetId: {
      type: DataTypes.UUID,
      primaryKey: true,
      // defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    sequelize: sequelize.getSeq(),
  }
);

Asset.belongsToMany(Product, {
  as: Asset.alias.products,
  through: ProductAsset,
  foreignKey: "assetId",
  otherKey: "productId",
});
Product.belongsToMany(Asset, {
  as: Product.alias.assets,
  through: ProductAsset,
  otherKey: "assetId",
  foreignKey: "productId",
});

module.exports = ProductAsset;
