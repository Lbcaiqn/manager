const mongoose = require('mongoose')

const Roles = mongoose.model('roles',new mongoose.Schema({
  roleName: {
    type: String,
    unique: true  //限制账号唯一，若重复会报错
  },
  rolePermission: {
    type: Array
  }
}))

module.exports = {
  Roles
}