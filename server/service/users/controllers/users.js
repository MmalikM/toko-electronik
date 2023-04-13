
const User = require("../model/User")

module.exports={
    findAllUsers: async (req,res,next)=>{
        try {
           const users  = await User.findAll()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({message: "ISE"})          
        }
    },
    findOneUser: async (req,res,next)=>{
        try {
            const id = req.params.id
            // console.log(id,"<<<<controller");
            const user = await User.getOneUser(id)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({message: "ISE"})          
        }
    },
    createUser: async (req,res,next) =>{
        try {
            console.log(req.body);
            const input = req.body
            const newUser = await User.addUser(input)
            res.status(200).json({message: "user created"})
        } catch (error) {
            res.status(500).json({message: "ISE"})          
        }
    },
    deleteUser: async(req,res,next)=>{
        try {
            const id = req.params.id
            await User.destroyUser(id)
            res.status(200).json({message: "user deleted"})
        } catch (error) {
            res.status(500).json({message: "ISE"})          
        }
    }

}