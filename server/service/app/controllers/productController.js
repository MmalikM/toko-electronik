const { User, Product, Category, Image, sequelize } = require("../models");

class productController {
  static async detailProduct(req,res,next) {
    const id = req.params.id;
    try {
      let product = await Product.findByPk(id,{
        include:[Image,Category]
      })
      if(!product) throw {name: "Not Found"}
      res.status(200).json(product);
    } catch (error) {
      next(error)
    }
  }

  static async getProduct(req, res, next) {
    try {
      let products = await Product.findAll({
        include: [Category,Image],
      });
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
  static async createProduct(req, res, next) {
    console.log(req.body, "<<<<<<<<<<<ini body posgre");
    let { name, description, price, mainImg, categoryId,authorId, UserMongoId, images } = req.body;
    // let idUser = req.user.id;
  console.log(UserMongoId,"masuk bosq");

    const t = await sequelize.transaction();
    try {
      const product = await Product.create(
        {
          name,
          description,
          price,
          mainImg,
          categoryId,
          authorId,
          UserMongoId
        },
        { transaction: t }
      );
      
      if (!images) {
        throw new error("image not found");
      }
      const productId = product.id;
     console.log(images);
      images.map((el) => {
        el.productId = productId;
      });
    console.log(images);
      await Image.bulkCreate(images, { transaction: t });
      await t.commit();
      res.status(200).json({ message: "product has been create" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async editProduct(req, res, next) {
    let id = req.params.id;
    let { name, description, price, mainImg, categoryId,UserMongoId, images } = req.body;
    // let idUser = req.user.id;
    const t = await sequelize.transaction();
    try {
      let product = await Product.findByPk(id, { transaction: t });
      if (!product) {
        throw { name: "Not Found" };
      }

      const slug = name.replace(" ", "-")
      await Product.update(
        {
          name,
          slug,
          description,
          price,
          mainImg,
          categoryId,
          authorId:1,
          UserMongoId
        },
        {
          where: {
            id,
          },
          transaction: t,
        }
      );

      if (!images) {
        throw new error("image not found");
      }
      const productId = product.id;

      images.map((el) => {
        el.productId = productId;
      });

      await Image.bulkCreate(images, { 
        transaction: t ,
        fields:["id", "productId","imgUrl"] ,
        updateOnDuplicate:['imgUrl']
      });

      await t.commit();
      res.status(200).json({ message: `product has been update` });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async destroyProduct(req, res, next) {
    const { id } = req.params;
    try {
      let product = await Product.findByPk(id);
      if (!product) {
        throw { name: "Not Found" };
      }
      await product.destroy({ where: { id: id } });
      res.status(200).json({ message: `${product.name} success to delete` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = productController;
