const mongoose = require('mongoose')

const Users = mongoose.model('users',new mongoose.Schema({
  username: {
    type: String,
    unique: true  //限制账号唯一，若重复会报错
  },
  password: {
    type: String,
    set(val){
      return require('bcryptjs').hashSync(val,10)  //加密
    }
  },
  name: {type: String},
  sex: {type: String},
  birthday: {type: String},
  roleName: {type: String},
}))

module.exports = {
  Users
}