'use strict';

const { hashPassword } = require('../helpers/security');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let dataUsers = require("../data/product.json").users;
    dataUsers.forEach(el=>{
      delete el.id
      el.password = hashPassword(el.password);
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    // console.log(dataUsers);
    let dataCategory = require("../data/product.json").categories;
    dataCategory.forEach(el=>{
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    let dataProducs = require("../data/product.json").products;
    dataProducs.forEach(el=>{
      delete el.id
      el.slug = el.name.replace(" ", "-");
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    let dataImage = require("../data/product.json").images;
    dataImage.forEach(el=>{
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })


    await queryInterface.bulkInsert("Users",dataUsers)
    await queryInterface.bulkInsert("Categories",dataCategory)
    await queryInterface.bulkInsert("Products",dataProducs)
    await queryInterface.bulkInsert("Images",dataImage)
    

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", null, {});
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete("Users", null, {});
 
  }
};
