module.exports = (sequelize, DataTypes) => sequelize.define('Subscription', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});
