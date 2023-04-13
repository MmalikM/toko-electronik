"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/security");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "username cannot be null",
          notEmpty: "username cannot be Empty",
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "email used" },
        validate: {
          isEmail: {
            msg: "not email format",
          },
          notNull: {
            msg: "email cannot be null",
          },
          notEmpty: {
            msg: "email cannot be Empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "password cannot be null",
          notEmpty: "password cannot be Empty",
          minPassword(password) {
            if (password.length < 5)
              throw new Error("minimum password 5 digit");
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "role cannot be null",
          notEmpty: "role cannot be Empty",
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "phoneNumber cannot be null",
          notEmpty: "phoneNumber cannot be Empty",
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "address cannot be null",
          notEmpty: "address cannot be Empty",
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user,option)=>{
    user.password = hashPassword(user.password)
  })
  return User;
};
