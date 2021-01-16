const Resource = require("../resource");
const Attribute = require("../attribute");

const attributes = {
  role: [
    {
      [Attribute.col.title]: "name",
    },
    {
      [Attribute.col.title]: "isBasic",
    },
  ],
  user: [
    {
      [Attribute.col.title]: "email",
    },
    {
      [Attribute.col.title]: "fullname",
    },
    {
      [Attribute.col.title]: "password",
    },
    {
      [Attribute.col.title]: "roleId,",
    },
  ],
};

module.exports.seed = async () => {
  let resources = await Resource.findAll();
  resources.forEach((resource) => {
    Attribute.bulkCreate(
      attributes[resource[Resource.col.title]].map(
        (attribute) =>
          (attribute[Attribute.col.resourceId] = resource[Resource.col.id])
      )
    );
  });
};
module.exports.dependencies = ["resources"];
module.exports.name = "attributes";
