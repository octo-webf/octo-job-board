module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    email: DataTypes.STRING,
  }, {
    classMethods: {
      associate(/* models */) {
        // associations can be defined here
      },
    },
  });
  return Subscription;
};
