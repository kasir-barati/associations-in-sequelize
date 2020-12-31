const sequelize = require("../sequelize");
const User = require("./user");
const Role = require("./role");

sequelize
  .getSeq()
  .sync({ force: false })
  .then(() => {
    for (let i = 0; i < 5; i++) {
      Role.create({
        name: `role${i}`,
      })
        .then((role) => console.log(`${role.name} created`))
        .catch(console.error);
    }
    for (let i = 0; i < 10; i++) {
      User.create({
        name: `user${i}`,
      })
        .then((user) => {
          let role = Role.findOne({ where: { name: "role0" } });
          user.getUserHasRole().then(console.log).catch(console.error);
          user.setUserHasRole(role.id).then(console.log).catch(console.error);
        })
        .catch(console.error);
    }
  })
  .catch(console.error);

User.findOne({ where: { name: "user1" } })
  .then((user) => {
    // user.getRoles().then(console.log).catch(console.error);
  })
  .catch(console.error);
