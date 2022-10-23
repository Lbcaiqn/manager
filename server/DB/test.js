const mongoose = require('mongoose')
const {Users} = require('./UserTable.js')
const {Roles} = require('./RoleTable.js')
mongoose.connect('mongodb://localhost:27017/001',{
  useNewUrlParser: true
})
Users.create({
      username: '20680372',
      password: '123456',
      name: '李耿欣',
      sex: '男',
      birthday: '1999-05-05',
      roleName: '超级管理员',
})
Roles.create({
      roleName: '超级管理员',
      rolePermission: [
          {
              name: 'Home',
              title: '首页',
              icon: 'house',
              c: true,
              u: true,
              r: true,
              d: true
          },
          {
              name: 'page1',
              title: '页面1',
              icon: 'house',
              c: true,
              u: true,
              r: true,
              d: true
          },
          {
              name: 'page2',
              title: '页面2',
              icon: 'house',
              c: true,
              u: true,
              r: true,
              d: true
          },
          {
              name: 'page3',
              title: '页面3',
              icon: 'house',
              c: true,
              u: true,
              r: true,
              d: true
          },
          {
              name: 'page4',
              title: '页面4',
              icon: 'house',
              c: true,
              u: true,
              r: true,
              d: true
          },
          {
              name: 'Manage',
              title: '管理',
              icon: 'house',
              children: [
                  {
                      name: 'UserManage',
                      title: '用户管理',
                      icon: 'house',
                      c: true,
                      u: true,
                      r: true,
                      d: true
                  },
                  {
                      name: 'RoleManage',
                      title: '角色管理',
                      icon: 'house',
                      c: true,
                      u: true,
                      r: true,
                      d: true
                  },
                  {
                      name: 'MenuManage',
                      title: '菜单管理',
                      icon: 'house',
                      c: true,
                      u: true,
                      r: true,
                      d: true
                  },
              ]
                  
          },
      ]
})