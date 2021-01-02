const sequelize = require("../sequelize");
const Product = require("./product");
const Asset = require("./asset");
const ProductAsset = require("./product-asset");

sequelize
  .getSeq()
  .sync({ force: true })
  .then(async () => {
    // let asset, product;
    // for (let i = 0; i < 5; i++) {
    //   asset = await Asset.create({
    //     url: `http://www.example.com/images/img${i}`,
    //   });
    //   console.log(`${asset.url} created`);
    // }
    // for (let i = 0; i < 10; i++) {
    //   product = await Product.create({
    //     name: `product${i}`,
    //   });
    //   product.set();
    // }
    // Product.findOne({ where: { name: "user1" } })
    //   .then((user) => {
    //     user.update({ RolesId });
    //     user.getRoles().then(console.log).catch(console.error);
    //   })
    //   .catch(console.error);
  })
  .catch(console.error);
