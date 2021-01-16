//@ts-check
const RolePermission = require("../model/role-permission");

module.exports.insert = () =>
  RolePermission.bulkCreate(rolesPermissions, {
    validate: true,
    hooks: true,
    individualHooks: true,
  });
module.exports.dependencies = [
  "roles",
  "attributes",
  "resource",
  "permissions",
];
module.exports.name = "roles-permissions";
