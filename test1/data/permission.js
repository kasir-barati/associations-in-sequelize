const Permission = require("../permission");

const permissions = {
  "user-title": [
    {
      own: false,
      access: true,
    },
  ],
};
module.exports.insert = () =>
  Permission.bulkCreate(permissions, {
    validate: true,
    hooks: true,
    individualHooks: true,
  });
module.exports.dependencies = ["attributes", "resource"];
module.exports.name = "permissions";
