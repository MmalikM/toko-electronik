const { ObjectId } = require("mongodb")
const { getDB } = require("../config/mongoConenction")
const { hashPassword } = require("../helper/bcrypt");


class User{
    static collection() {
        const db = getDB()
        const userCollection = db.collection("users")
        return userCollection
    }
    static async findAll (){
        const users = await this.collection().find({},{projection: {password:0}}).toArray()
        return users
    }
    static async getOneUser (id){
        const user = await this.collection().findOne({_id: new ObjectId(id)},{projection: {password:0}})
        // const user = await this.collection().findOne({},{id:id,projection: {password:0}})
        return user
    }
    static async addUser (input){
        const {email,password,username,address,phoneNumber} = input
        const newPassword = hashPassword(password)
        const newUser = await this.collection().insertOne({email,password:newPassword,username,address,phoneNumber,role:'admin'})
        return newUser
    }
    static async destroyUser(id){
        await this.collection().deleteOne({_id: new ObjectId(id)})
        return "deleted"
    }
}

module.exports = User
