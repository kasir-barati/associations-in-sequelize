const sequelize = require("../sequelize");
const User = require("./user");
const UserRole = require("./user-role");
const RolePermission = require("./role-permission");
const Permission = require("./permission");
const Role = require("./role");
const Attribute = require("./attribute");
const Resource = require("./resource");

sequelize
  .getSeq()
  .sync({ force: true })
  .then(async () => {
    await seedPostgre();
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
  let adminRole = await Role.create({
    [Role.col.name]: "admin",
    [Role.col.isBasic]: true,
  });
  let userRole = await Role.create({
    [Role.col.name]: "user",
    [Role.col.isBasic]: true,
  });
  let productResource = await Resource.create({
    [Resource.col.title]: "product",
  });
  let attributeProductResource = await Attribute.create({
    [Attribute.col.title]: "title",
    [Attribute.col.resourceId]: productResource[Resource.col.id],
  });
  let readProductTitlePermission = await Permission.create({
    [Permission.col.own]: false,
    [Permission.col.access]: "read",
    [Permission.col.attributeId]: attributeProductResource[Attribute.col.id],
  });
  let updateProductTitlePermission = await Permission.create({
    [Permission.col.own]: false,
    [Permission.col.access]: "update",
    [Permission.col.attributeId]: attributeProductResource[Attribute.col.id],
  });
  await RolePermission.create({
    [RolePermission.col.roleId]: adminRole[Role.col.id],
    [RolePermission.col.permissionId]:
      readProductTitlePermission[Permission.col.id],
  });
  await RolePermission.create({
    [RolePermission.col.roleId]: userRole[Role.col.id],
    [RolePermission.col.permissionId]:
      readProductTitlePermission[Permission.col.id],
  });
  await RolePermission.create({
    [RolePermission.col.roleId]: adminRole[Role.col.id],
    [RolePermission.col.permissionId]:
      updateProductTitlePermission[Permission.col.id],
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
