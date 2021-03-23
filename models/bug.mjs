export default function initBugModel(sequelize, DataTypes) {
  return sequelize.define('bug', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    problem: {
      type: DataTypes.TEXT,
    },
    errorText: {
      type: DataTypes.TEXT,
    },
    commit: {
      type: DataTypes.TEXT,
    },
    featureId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'features',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    // The underscored option makes Sequelize reference snake_case names in the DB.
    underscored: true,
  });
}
