const sequelize = require("../sequelize");
const User = require("./user");
const UserRole = require("./user-role");
const RolePermission = require("./role-permission");
const Permission = require("./permission");
const Role = require("./role");
const Attribute = require("./attribute");
const Resource = require("./resource");
const Phone = require("./phone");

// const resourceSeeder = require("./data/resource");
// const attributeSeeder = require("./data/attribute");

sequelize
  .getSeq()
  .sync({ force: true })
  .then(async () => {
    await seedPostgre();
    let permissions = await Permission.findAll({
      attributes: [Permission.col.access, Permission.col.own],
      include: [
        {
          model: Attribute,
          attributes: [Attribute.col.title],
          as: Permission.alias.attributes,
          include: [
            {
              model: Resource,
              attributes: [Resource.col.title],
              as: Attribute.alias.resource,
            },
          ],
        },
        {
          model: Role,
          attributes: [Role.col.id],
          as: Permission.alias.roles,
        },
      ],
    });
    let perms = {};
    permissions.forEach((permission) => {
      // prettier-ignore
      perms[
        `${permission[Permission.alias.attributes][Attribute.alias.resource][Resource.col.title]
        }${permission[Permission.alias.attributes][Attribute.col.title]
        }${permission[Permission.col.access]}`
      ] = permission[Permission.alias.roles].reduce((acc, curr) => {
        let roles = {
          [curr[Role.col.id]]: permission[Permission.col.own],
          ...acc,
        };
        return roles;
      }, {});
    });
    // await Attribute.destroy({
    //   where: {
    //     [Attribute.col.title]: "title",
    //   },
    // });
    // await Role.destroy({
    //   where: {
    //     [Role.col.name]: "admin",
    //   },
    // });
    // let role = await Role.findOne({
    //   where: {
    //     [Role.col.name]: "user",
    //   },
    // });
    // This query delete record in RolePermission
    // await RolePermission.destroy({
    //   where: {
    //     [RolePermission.col.roleId]: role[Role.col.id],
    //   },
    // });
  })
  .catch(console.error);

async function seedPostgre() {
  // await resourceSeeder();
  // await attributeSeeder();
  let adminRole = await Role.create({
    [Role.col.name]: "admin",
    [Role.col.isBasic]: true,
  });
  let supportRole = await Role.create({
    [Role.col.name]: "support",
    [Role.col.isBasic]: true,
  });
  let userRole = await Role.create({
    [Role.col.name]: "user",
    [Role.col.isBasic]: true,
  });
  let roleResource = await Resource.create({
    [Resource.col.title]: "role",
  });
  let attributeNameRoleResource = await Attribute.create({
    [Attribute.col.title]: "name",
    [Attribute.col.resourceId]: roleResource[Resource.col.id],
  });
  let readRoleNamePermission = await Permission.create({
    [Permission.col.own]: false,
    [Permission.col.access]: "read",
    [Permission.col.attributeId]: attributeNameRoleResource[Attribute.col.id],
  });
  let updateRoleNamePermission = await Permission.create({
    [Permission.col.own]: false,
    [Permission.col.access]: "update",
    [Permission.col.attributeId]: attributeNameRoleResource[Attribute.col.id],
  });
  await RolePermission.create({
    [RolePermission.col.roleId]: adminRole[Role.col.id],
    [RolePermission.col.permissionId]:
      readRoleNamePermission[Permission.col.id],
  });
  await RolePermission.create({
    [RolePermission.col.roleId]: userRole[Role.col.id],
    [RolePermission.col.permissionId]:
      readRoleNamePermission[Permission.col.id],
  });
  await RolePermission.create({
    [RolePermission.col.roleId]: supportRole[Role.col.id],
    [RolePermission.col.permissionId]:
      readRoleNamePermission[Permission.col.id],
  });
  await RolePermission.create({
    [RolePermission.col.roleId]: adminRole[Role.col.id],
    [RolePermission.col.permissionId]:
      updateRoleNamePermission[Permission.col.id],
  });
  let adminUser = await User.create({
    [User.col.email]: "admin@gmail.com",
    [User.col.fullname]: "admin admini",
    [User.col.password]: "123456789",
    [User.col.roleId]: adminRole[Role.col.id],
  });
  let user = await User.create({
    [User.col.email]: "user@gmail.com",
    [User.col.fullname]: "user useri",
    [User.col.password]: "123456789",
    [User.col.roleId]: userRole[Role.col.id],
  });
  await UserRole.create({
    [UserRole.col.userId]: adminUser[User.col.id],
    [UserRole.col.roleId]: adminRole[Role.col.id],
  });
  await UserRole.create({
    [UserRole.col.userId]: user[User.col.id],
    [UserRole.col.roleId]: userRole[Role.col.id],
  });
}
