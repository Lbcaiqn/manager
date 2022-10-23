<template>
  <div id="UserManage" v-if="userData">
     <div class="user-manage-header">
        <el-button type="primary" size="large" @click="createUser">+ 新增用户</el-button>
     </div>
     <el-table :data="userData" style="width: 100%">
        <el-table-column prop="username" label="工号" width="150" />
        <el-table-column prop="name" label="姓名" width="150" />
        <el-table-column prop="sex" label="性别" width="150" />
        <el-table-column prop="birthday" label="出生日期" width="150" />
        <el-table-column prop="age" label="年龄" width="150" />
        <el-table-column prop="roleName" label="权限" width="150" />
        <el-table-column label=" ">
          <template #default="{$index}">
            <el-button type="primary" @click="updateUser($index)">编辑</el-button>
            <el-button type="warning" @click="updateUser($index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      
      <el-dialog
          v-model="showCreateUser"
          width="30%"
          
        >
          <span>
              <my-form :formLabel="formList.formLabel" :formData="formList.formData" />
          </span>
          <template #header>
              <div class="dialog-header">创建新用户</div>
          </template>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="showCreateUser = false">取消</el-button>
              <el-button type="primary" @click="submitCreateUser"
                >提交</el-button
              >
            </span>
          </template>
        </el-dialog>
        
        <el-dialog
            v-model="showUpdateUser"
            width="30%"
            
          >
            <span>
                <my-form :formLabel="formList.formLabel" :formData="formList.formData" />
            </span>
            <template #header>
                <div class="dialog-header">编辑用户信息</div>
            </template>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="showUpdateUser = false">取消</el-button>
                <el-button type="primary" @click="submitUpdateUser"
                  >保存</el-button
                >
              </span>
            </template>
          </el-dialog>
        
  </div>
</template>

<script lang="ts">
import {defineComponent,ref,reactive,toRaw} from 'vue'
import {readUserReq,createUserReq,updateUserReq} from '@/network/index.ts'
import myForm from '@/components/my-form/my-form.vue'
export default defineComponent({
  components: {
    myForm  
  },
  setup(){
    interface UserInt {
      username: string,
      password: string,
      name: string,
      sex: string,
      birthday: string,
      age: string,
      roleName: string
    };
    let formList = ref<any>({
      formLabel:[
        {type: 'input', label: '工号', model: 'username'},
        {type: 'input', label: '初始密码', model: 'password'},
        {type: 'select', label: '角色', model: 'roleName',options: []},
        {type: 'input', label: '姓名', model: 'name'},
        {type: 'radio', label: '性别', model: 'sex',options: ['男','女']},
        {type: 'date-picker', label: '出生日期', model: 'birthday'},
      ],
      formData: {
        username: '',
        password: '123456',
        roleName: '',
        name: '',
        sex: '',
        birthday: ''
      }
    });
    let formListInit:any = {}
    
    
    let userData = ref<any>([]);
    readUserReq().then(res => {
      if(res.status == 200){
        formList.value.formLabel.find((i:any) => i.model == 'roleName')!.options! = res.data.roleNameList;
        formListInit = JSON.parse(JSON.stringify(toRaw(formList.value)))
        for(let i of res.data.allUser){
          /(\d\d\d\d-\d\d-\d\d)/.test(i.birthday);
          
          userData.value.push({
            username: i.username,
            password: i.password,
            name: i.name,
            sex: i.sex,
            birthday: RegExp.$1,
            age: '23',
            roleName: i.roleName
          });
        }
      }
    });
    
    let showCreateUser = ref(false)
    function createUser(){
      formList.value = JSON.parse(JSON.stringify(formListInit))
      showCreateUser.value = true
      
    }
    function submitCreateUser(){
      createUserReq(formList.value.formData).then(res => {
        if(res.status == 200){
          userData.value.push(formList.value.formData)
          showCreateUser.value = false
        }
      })
    }
    
    let showUpdateUser = ref(false)
    let nowUpdateIndex = 0
    function updateUser(index: number){
      nowUpdateIndex = index
      formList.value.formData = JSON.parse(JSON.stringify(toRaw(userData.value[index])))
      formList.value.formLabel.find((i:any) => i.model == 'username').type = 'hide'
      formList.value.formLabel.find((i:any) => i.model == 'password').type = 'hide'
      showUpdateUser.value = true
    }
    function submitUpdateUser(){
      updateUserReq(formList.value.formData,formList.value.formData.username).then(res => {
        if(res.status == 200){
          userData.value[nowUpdateIndex] = JSON.parse(JSON.stringify(toRaw(formList.value.formData)))
          showUpdateUser.value = false
        }
      });
    }
    
    
    function deleteUser(index: number){
        
    }
    
    return {
      userData,
      formList,
      
      showCreateUser,
      createUser,
      submitCreateUser,
      
      updateUser,
      showUpdateUser,
      submitUpdateUser,
      
      deleteUser,
      
    }
  }
})
</script>

<style lang="less" scoped>
#UserManage {
    margin: 10px;
}
.user-manage-header {
  margin: 30px 0;
}
.dialog-header {
    width: 200px;
    text-align: center;
    margin: 0 auto;
}
.dialog-footer {
    display: flex;
    justify-content: center;
}
</style>