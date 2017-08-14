module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  }, {
    classMethods: {
      associate(/* models */) {
        // associations can be defined here
      },
    },
  });
  return Subscription;
};
