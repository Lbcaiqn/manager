const express = require('express')
const bodyParser = require('body-parser')
const {Users} = require('./DB/UserTable.js')
const {Roles} = require('./DB/RoleTable.js')
const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/001',{
  useNewUrlParser: true
})

const app = express()
app.use(express.static('./public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "content-type,Authorization")
    if (req.method == 'OPTIONS') res.send(200);
    else next();
})

const SECRCT = 'asf34g35s1g56erssa'

app.post('/login',async (request,response) => {
  let user = await Users.findOne({
    "username": request.body.username
  })
  if(!user) return response.send('用户名不存在')
  let passwordValid = require('bcryptjs').compareSync(request.body.password,user.password)
  if(!passwordValid)  return response.send('密码错误')
  //查找权限
  let role = await Roles.findOne({
    "roleName": user.roleName
  })
  if(!role) return response.send('服务器错误')
  let rolePermission = role.rolePermission
  //jwt用users表的id和私钥签名
  let token = require('jsonwebtoken').sign({
    id: String(user._id)
  },SECRCT)
  response.send({
    user,
    token,
    rolePermission
  })
})

async function auth(req,res,next){
  let token = req.headers.authorization
  //解析jwt中的user的id
  let {id} = jsonwebtoken.verify(token,SECRCT)
  
  let user = await Users.findById(id)
  res.user = user
  next()
}

app.post('/token/createRole',auth,async (req,res) => {
  if(res.user){
      let role = await Roles.findOne({
        "roleName": res.user.roleName
      })
      if(role){
        let per = role.rolePermission.find(i => i.name == 'Manage') ? role.rolePermission.find(i => i.name == 'Manage').children.find(i => i.name == 'RoleManage').c : false
        if(per){
          let newRole = null
          try {
            newRole = await Roles.create(req.body.role)
          }
          catch(err) {
            res.send('角色已存在');
            return;
          }
          if(newRole) res.send('创建成功！')
          else res.send('创建失败')
        }
        else res.status('204').send('没有权限')
      }
      else res.status('204').send('没有权限')
  }
  else res.status('204').send('没有权限')
})
app.get('/token/readRole',auth,async (req,res) => {
 
  if(res.user){
      let role = await Roles.findOne({
        "roleName": res.user.roleName
      })
      if(role){
        let per = role.rolePermission.find(i => i.name == 'Manage') ? role.rolePermission.find(i => i.name == 'Manage').children.find(i => i.name == 'RoleManage').r : false
        if(per){
          let allRole = await Roles.find()
          let adminRole = await Roles.findOne({
              roleName: '超级管理员'
          })
          res.send({
              allRole,
              adminRole
          })
        }
        else res.status('204').send('没有权限')
      }
      else res.status('204').send('没有权限')
  }
  else res.status('204').send('没有权限')
})

app.put('/token/updateRole',auth,async (req,res) => {
  if(res.user){
      if(req.body.role.roleName == '') return res.status('204').send('角色名称不能为空');
      let role = await Roles.findOne({
        "roleName": res.user.roleName
      });
      
      if(!role)  return req.status('204').send('没有权限');
      let per = role.rolePermission.find(i => i.name == 'Manage') ? role.rolePermission.find(i => i.name == 'Manage').children.find(i => i.name == 'RoleManage').u : false
      if(!per)  return res.status('204').send('没有权限');
      await Roles.update({
        roleName: req.body.oldRoleName
      },req.body.role)
      await Users.update({
        roleName: req.body.oldRoleName
      },{
        $set: {roleName: req.body.role.roleName}
      })
      res.send('修改成功！')
  }
  else return res.status('204').send('没有权限');
})

app.get('/token/readUser',auth,async (req,res) => {
  if(!res.user)  return res.status(204).send('没有权限');
  let role = await Roles.findOne({
    roleName: res.user.roleName
  });
  
  if(!role)  return res.status(204).send('没有权限');
  let per = role.rolePermission.find(i => i.name == 'Manage') ? role.rolePermission.find(i => i.name == 'Manage').children.find(i => i.name == 'UserManage').r : false
  
  if(!per)  return res.status(204).send('没有权限');
  let allUser = await Users.find();
  let roleNameList = [];
  (await Roles.find()).forEach(i => {
    roleNameList.push(i.roleName)
  })
  res.send({
    allUser,
    roleNameList
  });
})

app.post('/token/createUser',auth,async (req,res) => {
  if(!res.user) return res.status(204).send('没有权限');
  let role = await Roles.findOne({
    roleName: res.user.roleName
  });
  
  if(!role)  return res.status(204).send('没有权限');
  let per = role.rolePermission.find(i => i.name == 'Manage') ? role.rolePermission.find(i => i.name == 'Manage').children.find(i => i.name == 'UserManage').c : false
  
  if(!per)  return res.status(204).send('没有权限');
  try {
    await Users.create(req.body.userData);
    res.send('创建用户成功！')
  }
  catch(err) {
    res.status(205).send('用户已存在')
  }
})

app.put('/token/updateUser',auth,async (req,res) => {
  if(res.user){
      let role = await Roles.findOne({
        "roleName": res.user.roleName
      });
      
      if(!role)  return req.status('204').send('没有权限');
      let per = role.rolePermission.find(i => i.name == 'Manage') ? role.rolePermission.find(i => i.name == 'Manage').children.find(i => i.name == 'UserManage').u : false
      
      if(!per)  return res.status('204').send('没有权限');
      await Users.update({
        username: req.body.username
      },{
        $set: {
          roleName: req.body.userData.roleName,
          name: req.body.userData.name,
          sex: req.body.userData.sex,
          birthday: req.body.userData.birthday,
        }
      })
     
      res.send('修改成功！')
  }
  else return res.status('204').send('没有权限');
})


app.listen('8000', () => {
    console.log('服务器已启动')
})