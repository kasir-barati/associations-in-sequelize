const { DataTypes, Model } = require("sequelize");

const sequelize = require("../sequelize");

class Order extends Model {
  static col = {
    id: "id",
    name: "name",
  };
  static alias = {
    payment: "OrderPayment",
  };
}

Order.init(
  {
    [Order.col.id]: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    [Order.col.name]: DataTypes.STRING,
  },
  {
    sequelize: sequelize.getSeq(),
  }
);

module.exports = Order;
