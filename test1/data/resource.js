const Resource = require("../resource");
const resources = [
  {
    [Resource.col.title]: "role",
  },
  {
    [Resource.col.title]: "user",
  },
];

module.exports.seed = async () =>
  Resource.bulkCreate(resources, {
    validate: true,
    hooks: true,
    individualHooks: true,
  });

module.exports.dependencies = [];
module.exports.name = "resources";
