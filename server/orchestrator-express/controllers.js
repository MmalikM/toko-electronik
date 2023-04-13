const axios = require("axios");
const redis = require("./config/redis");
const productUrl = "http://localhost:4002/";
const userUrl = "http://localhost:4001/";

class Controller {
  static async getProduct(req, res) {
    try {
      const productsCache = await redis.get("app:products");
      if(productsCache) {
        res.json(JSON.parse(productsCache))
      }else{
          const { data } = await axios.get(productUrl + "admin/products");
          await redis.set("app:products", JSON.stringify(data))
          res.json(data);
      }
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
  static async getProductById(req, res) {
    try {
      // console.log(req.params);
      const id = req.params.id;
      const { data } = await axios.get(productUrl + "customers/products/" + id);
      const responseUser = await axios.get(userUrl + data.UserMongoId);
      data.user = responseUser.data;
      // console.log(responseUser,"<<<<< response");
      res.json(data);
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  //fuction create
  static async createProduct(req, res) {
    try {
      let { name, description, price, mainImg, categoryId, images } = req.body;
      const { id_user } = req.headers;
      await axios.post(productUrl + "admin/products", {
        name,
        description,
        price,
        mainImg,
        categoryId,
        UserMongoId: id_user,
        images,
      });
      await redis.del("app:products")
      res.json({ message: "product created" });
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  //fuction del
  static async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      const { data } = await axios.delete(productUrl + "admin/products/" + id);
      await redis.del("app:products")
      res.json({ message: `product with id ${id} deleted` });
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
  //fuction update
  static async editProduct(req, res) {
    try {
      let { name, description, price, mainImg, categoryId, images } = req.body;
      const { id_user } = req.headers;
      const id = req.params.id;
      await axios.put(productUrl + "admin/products/" + id, {
        name,
        description,
        price,
        mainImg,
        categoryId,
        authorId: +id_user,
        images,
      });
      await redis.del("app:products")
      res.json({ message: "product edited" });
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async getUser(req, res) {
    try {
        const usersCache = await redis.get("app:users")
        if(usersCache){
            res.json(JSON.parse(usersCache))
        }else{
            const { data } = await axios.get(userUrl);
            await redis.set("app:users",JSON.stringify(data))
            res.json(data);
        }
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }

  static async createUser(req, res) {
    try {
      const { email, password, username, address, phoneNumber } = req.body;
      const { data } = await axios.post(userUrl + "create", {
        email,
        password,
        username,
        address,
        phoneNumber,
      });
      await redis.del("app:users")
      res.json({ message: "user created" });
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const { data } = await axios.delete(userUrl + id);
      await redis.del("app:users")
      res.json({ message: `user with id ${id} deleted` });
    } catch (error) {
      res.status(error.response.status).json(error.response.data);
    }
  }
}

module.exports = Controller;
