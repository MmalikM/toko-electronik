const bcrypt = require("bcryptjs");

const hashPassword = (password) => bcrypt.hashSync(password, 8)
const comparePassword = (realPassword,hashPassword) => bcrypt.compareSync(realPassword, hashPassword)

module.exports = {hashPassword,comparePassword};
