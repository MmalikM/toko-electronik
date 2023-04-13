// const productUrl = "http://localhost:4002/";
// const userUrl = "http://localhost:4001/";
const productUrl = "http://app-service:4002/";
const userUrl = "http://user-service:4001/";

const axios = require("axios");

const typeDefs = `#graphql
    type Product{
        id:ID
        slug:String
        name: String
        description: String
        price:Int
        mainImg:String
        category: Category
        UserMongoId:String
        user:User
        images:[Image]
    }

    type Category{
        id:ID
        name:String
    }
    type Image{
      id:ID
      productId:Int
      imgUrl:String
    }

    type Success{
      message:String
    }

    type User{
        _id:ID
        username:String
        email:String
        password:String
        role:String
        address:String
        phoneNumber:String
    }
    input newImage{
        imgUrl:String
    }

    input newProduct{
        name:String
        description:String
        price:Int
        mainImg:String
        categoryId:Int
        images:[newImage]
    }

    type Mutation{
        deleteProduct(id:ID!):Success,
        addProduct(product:newProduct):Success
    }

    type Query{
        findProducts: [Product]
        findProduct(id:ID!): Product
    }
`;
// mirip controller
const resolvers = {
  Query: {
    findProducts: async () => {
      try {
        let { data } = await axios.get(productUrl + "admin/products");
        data = data.map((el) => {
          el.category = el.Category;
          return el;
        });
        return data;
      } catch (error) {
        throw error;
      }
    },
    findProduct: async(_,args)=>{
        try {
            const id = args.id
            let { data } = await axios.get(productUrl + "customers/products/"+id);
            let responseUser = await axios.get(userUrl + data.UserMongoId);
            data.user = responseUser.data;
            data.category = data.Category;
            data.images = data.Images;
            return data;
        } catch (error) {
            throw error
        }
    },
  },
  Mutation:{
    deleteProduct: async(_,args)=>{
        try {
            const id = args.id
            const {data}= await axios.delete(productUrl + "admin/products/"+id)
            console.log(data);
            return data
        } catch (error) {
            throw error
        }
    },
    addProduct: async(_,args)=>{
        try {
            const {name, description, price, mainImg, categoryId, images } = args.product
            console.log(name);
            const {data} = await axios.post(productUrl + "admin/products", {
                name,
                description,
                price,
                mainImg,
                categoryId,
                UserMongoId: "641e716ef8621f780b665749",
                images,
              });
              return data
        } catch (error) {
            throw error
        }
    }
  }
};

module.exports = [typeDefs,resolvers]