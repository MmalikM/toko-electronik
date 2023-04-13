'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Product,{
        foreignKey: 'productId'
      })
    }
  }
  Image.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: "product ID cannot be null",
        notEmpty: "product ID cannot be Empty",
      },
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: "image URL cannot be null",
        notEmpty: "image URL cannot be Empty",
      },
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};