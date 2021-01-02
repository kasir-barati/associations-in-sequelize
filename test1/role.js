const { DataTypes, Model } = require("sequelize");

const sequelize = require("../sequelize");

class Role extends Model {}
Role.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
  },
  {
    sequelize: sequelize.getSeq(),
  }
);

module.exports = Role;
