//@ts-check
const UserRole = require("../model/user-role");
const userRole = [
  {
    userId: "T6ZGSU4ZU",
    roleId: "T6ZFSU4ZA", // Super Admin
  },
];
module.exports.insert = () =>
  UserRole.bulkCreate(userRole, {
    validate: true,
    hooks: true,
    individualHooks: true,
  });
module.exports.dependencies = ["user", "role"];
module.exports.name = "user-role";
