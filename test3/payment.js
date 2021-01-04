const { DataTypes, Model } = require("sequelize");

const sequelize = require("../sequelize");
const Order = require("./order");

class Payment extends Model {
  static col = {
    id: "id",
    refId: "refId",
    orderId: "orderId",
  };
  static alias = {
    order: "paymentOrder",
  };
}
Payment.init(
  {
    [Payment.col.id]: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    [Payment.col.refId]: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    [Payment.col.orderId]: {
      type: DataTypes.UUID,
      unique: true,
      references: { model: Order, key: Order.col.id },
    },
  },
  {
    sequelize: sequelize.getSeq(),
  }
);

Payment.belongsTo(Order, {
  as: Payment.alias.order,
  foreignKey: Payment.col.orderId,
});
Order.hasOne(Payment, {
  as: Order.alias.payment,
  foreignKey: Payment.col.orderId,
});

module.exports = Order;
