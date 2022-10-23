<template>
  <div id="RoleTable">
    <el-card class="box-card">
       <template #header>
         <div class="card-header">
           <div>
             <span v-if="!isForm">{{data.roleName}}</span>
             <el-input v-else v-model="data.roleName" placeholder="请输入角色名称" />
           </div>
           <div v-if="!isForm">
               <el-button type="primary" size="large" @click="updateRole">编辑</el-button>
               <el-button type="warning" size="large" @click="deleteRole">删除</el-button>
           </div>
         </div>
       </template>
       <el-table
       :data="data.rolePermission" 
       style="width: 100%" 
       >
           <el-table-column label=" " width="40" v-if="isForm">
               <template #default="{$index}">
                   <el-checkbox v-model="data.rolePermission[$index].isSelect" />
               </template>
           </el-table-column>
           <el-table-column prop="title" label="菜单权限" width="200" />
           
           <el-table-column label="增加数据" width="100">
             <template #default="{$index}">
                 <el-checkbox v-if="isForm" v-model="data.rolePermission[$index].c" />
                 <span v-if="data.rolePermission[$index].c">√</span>
                 <span v-else>×</span>
             </template>
           </el-table-column>
           
           <el-table-column label="修改数据" width="100">
             <template #default="{$index}">
                 <el-checkbox v-if="isForm" v-model="data.rolePermission[$index].u" />
                 <span v-if="data.rolePermission[$index].u">√</span>
                 <span v-else>×</span>
             </template>
           </el-table-column>
           
           <el-table-column label="查看数据" width="100">
             <template #default="{$index}">
                 <el-checkbox v-if="isForm" v-model="data.rolePermission[$index].r" />
                 <span v-if="data.rolePermission[$index].r">√</span>
                 <span v-else>×</span>
             </template>
           </el-table-column>
           
           <el-table-column label="删除数据">
             <template #default="{$index}">
                 <el-checkbox v-if="isForm" v-model="data.rolePermission[$index].d" />
                 <span v-if="data.rolePermission[$index].d">√</span>
                 <span v-else>×</span>
             </template>
           </el-table-column>
           
         </el-table>
    </el-card>
   
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  props: {
    data: Object,
    isForm: {
       type: Boolean,
       default: false
    }
  },
  emits:['updateRole','deleteRole'],
  setup(props,context){
    function updateRole(){
        context.emit('updateRole')
    }
    function deleteRole(){
        context.emit('deleteRole')
    }
    return {
        updateRole,
        deleteRole
    }
  }
})
</script>

<style lang="less" scoped>
.box-card {
    width: 100%;
}
.card-header {
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  font-size: 25px;
}
</style>