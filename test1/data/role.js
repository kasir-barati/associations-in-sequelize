//@ts-check
const Role = require("../model/role");

const roles = [
  {
    name: "default-super-admin",
    isBasic: true,
  },
  {
    name: "default-admin",
    isBasic: true,
  },
  {
    name: "default-store-house-manager",
    isBasic: true,
  },
  {
    name: "default-support",
    isBasic: true,
  },
  {
    name: "default-verified",
    isBasic: true,
  },
  {
    name: "default-guest",
    isBasic: true,
  },
];
module.exports.insert = () =>
  Role.bulkCreate(roles, {
    validate: true,
    hooks: true,
    individualHooks: true,
  });
module.exports.dependencies = ["permissions", "attributes", "resource"];
module.exports.name = "roles";
