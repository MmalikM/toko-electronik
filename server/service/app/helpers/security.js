const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const code = process.env.RHS;

const hashPassword = (password) => bcrypt.hashSync(password, 8);
const comparePassword = (realPassword,hashPassword) => bcrypt.compareSync(realPassword, hashPassword)


const createToken = (payload) =>  jwt.sign(payload,code);
const readPayload = (token) => jwt.verify(token,code)


module.exports = {createToken,readPayload,hashPassword,comparePassword};