const sequelize = require("../sequelize");

const Order = require("./order");
const Payment = require("./payment");

sequelize
  .getSeq()
  .sync({ force: true })
  .then(async () => {
    // queries
  })
  .catch(console.error);
