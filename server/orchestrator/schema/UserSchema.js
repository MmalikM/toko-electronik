
// const userUrl = "http://localhost:4001/";
const userUrl = "http://user-service:4001/";

const axios = require("axios");

const typeDefs = `#graphql
 
    type User{
        _id:ID
        username:String
        email:String
        password:String
        role:String
        address:String
        phoneNumber:String
    }
    type Success{
      message:String
    }

    type Mutation{
      addUser(
        email:String,
        password:String,
        username:String,
        address:String,
        phoneNumber:String,
      ): Success
      deleteUser(id:ID!):Success
    }

    type Query{
        findUsers:[User]
        findUser(id:ID!):User
    }
`;
// mirip controller
const resolvers = {
  Query: {
    findUsers: async () =>{
      try {
        const {data} = await axios.get(userUrl)
        return data;
      } catch (error) {
        throw error
      }
    },
    findUser: async(_,args)=>{
      try {
          const id = args.id
          let { data } = await axios.get(userUrl+id);
          return data;
      } catch (error) {
          throw error
      }
  },
  },
  Mutation:{
    addUser: async(_,args)=>{
      const {email, password, username, address, phoneNumber} = args
      try {
        const {data} =  await axios.post(userUrl + "create", {
          email,
          password,
          username,
          address,
          phoneNumber,
        });
      
        return data
      } catch (error) {
        throw error
      }
    },
    deleteUser: async(_,args)=>{
        try {
            const id = args.id
            const {data}= await axios.delete(userUrl + id)
            return data
        } catch (error) {
            throw error
        }
    }
  }
};

module.exports = [typeDefs,resolvers]