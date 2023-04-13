const { User, Product, Category, Image, sequelize } = require("../models");

class categoryController {
  static async getCategory(req, res, next) {
    try {
      let categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }
 
  static async createCategory(req, res, next) {
    let {name} = req.body;
    try {
      const category = await Category.create({
        name,
      });
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async jumlahCategory(req,res,next) {
    const id = req.params.id;
    try {
      let product = await Product.findAll({
        include:[Category],
        where:{
          categoryId: id,
        }
      })
      if(!product.length) throw {name: "Not Found"}
      res.status(200).json(product);
    } catch (error) {
      next(error)
    }
  }

  static async destroyCategory(req, res, next) {
    const { id } = req.params;
    try {
      let category = await Category.findByPk(id);
      if (!category) {
        throw { name: "Not Found" };
      }
      await category.destroy({ where: { id: id } });
      res.status(200).json({ message: `${category.name} success to delete` });
    } catch (error) {
      
      next(error);
    }
  }
  static async updateCategory(req,res,next){
    let id = req.params.id
    let { name } = req.body;
    // let idUser = req.user.id;
    try {
      let category = await Category.findByPk(id);
      if (!category) {
        throw { name: "Not Found" };
      }
      await Category.update({
        name,
      },{
        where:{
          id,
        }
      });
      
      res.status(200).json({message:`category has been update`});
    } catch (error) {
      next(error);
    }
  }
}
module.exports = categoryController;
