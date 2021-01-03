const sequelize = require("../sequelize");
const User = require("./user");
const Role = require("./role");

sequelize
  .getSeq()
  .sync({ force: true })
  .then(async () => {
    // let role, user;
    // for (let i = 0; i < 5; i++) {
    //   role = await Role.create({
    //     name: `role${i}`,
    //   });
    // }
    // for (let i = 0; i < 10; i++) {
    //   let user = await User.create({
    //     name: `user${i}`,
    //   });
    //   await user.setUserRole(role.id);
    // }
    // user = await User.findOne({ where: { name: "user1" } });
    // console.log(await user.getRoles());
  })
  .catch(console.error);
