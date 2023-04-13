const { comparePassword, createToken } = require("../helpers/security");
const { User, Product, Category ,Image} = require("../models");

class userController{
    static async login(req, res, next) {
        try {
          
          const { email, password } = req.body;
          if (!email || !password) throw { name: "email_password_required" };
    
          const user = await User.findOne({
            where: { email },
          });
          if (!user) throw { name: "email/password_incorrect" };
          const validPass = comparePassword(password, user.password);
          if (!validPass) throw { name: "email/password_incorrect" };
    
          const payload = {
            id: user.id,
          };
    
          const access_token = createToken(payload);
    
          res.status(200).json({ access_token });
        } catch (error) {
        
          next(error);
        }
      }
      static async register(req, res, next) {
        try {
          const { username, phoneNumber, address, email, password } = req.body;
          const createUser = await User.create({
            username,
            email,
            password,
            phoneNumber,
            address,
            role: "admin",
          });
          res.status(201).json({
            message: `user with email ${createUser.email} has been created`,
          });
        } catch (error) {
          next(error);
        }
      }
}

module.exports = userController;
