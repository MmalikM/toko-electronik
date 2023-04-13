"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category,{
        foreignKey: 'categoryId'
      })
      Product.hasMany(models.Image, {
        foreignKey: "productId",
      });
    }
  }
  Product.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "name cannot be null",
          notEmpty: "name cannot be Empty",
        },
      },
      slug: DataTypes.STRING,
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "description cannot be null",
          notEmpty: "description cannot be Empty",
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "price cannot be null",
          notEmpty: "price cannot be Empty",
          minPrice(price) {
            if (price < 10000) throw new Error("minimum price is 10000");
          },
        },
      },
      mainImg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "image url cannot be null",
          notEmpty: "image url cannot be Empty",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: "categoryId cannot be null",
          notEmpty: "categoryId cannot be Empty",
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
      },
      UserMongoId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  Product.beforeCreate((product, option) => {
    product.slug = product.name.replace(" ", "-");
  });
  return Product;
};
