const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const [userTypeDefs,userResolvers] = require("./schema/UserSchema")
const [productTypeDefs,productResolvers] = require ("./schema/ProductSchema")


const server = new ApolloServer({
  typeDefs : [userTypeDefs,productTypeDefs],
  resolvers:[userResolvers,productResolvers],
  introspection: true,
});

 startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
