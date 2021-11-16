//@ts-check
const User = require("../model/user");

const users = [
  {
    id: "T6ZGSU4ZU",
    email: process.env.SUPER_ADMIN_EMAIL,
    password: process.env.SUPER_ADMIN_PASSWORD,
    fullName: "majid ilkhani",
  },
];
module.exports.insert = () =>
  User.bulkCreate(users, {
    validate: true,
    hooks: true,
    individualHooks: true,
  });
module.exports.dependencies = [];
module.exports.name = "users";
