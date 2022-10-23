<template>
    <div id="RoleManage" v-if="roleTableData?.length != 0">
      <div class="role-manage-header">
        <el-button type="primary" size="large" @click="createRole">+ 新增角色</el-button>
      </div>
      
      
      <div class="role-box" v-for="(i,iIndex) in roleTableDataFilter" :key="iIndex">
        <role-table :data="i" @updateRole="updateRole(roleTableData[iIndex],iIndex)"></role-table>
      </div>
      
      <el-dialog
          v-model="showCreateRole"
          width="60%"
          
        >
          <span>
              <role-table :data="createRoleData" :isForm="true"></role-table>
          </span>
          <template #header>
              <div class="dialog-header">创建新角色</div>
          </template>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="showCreateRole = false">取消</el-button>
              <el-button type="primary" @click="submitCreateRole"
                >提交</el-button
              >
            </span>
          </template>
        </el-dialog>
      
      <el-dialog
          v-model="showUpdateRole"
          width="60%"
          
        >
          <span>
              <role-table :data="updateRoleData" :isForm="true"></role-table>
          </span>
          <template #header>
              <div class="dialog-header">编辑角色权限</div>
          </template>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="showUpdateRole = false">取消</el-button>
              <el-button type="primary" @click="submitUpdateRole()"
                >保存</el-button
              >
            </span>
          </template>
        </el-dialog>
    
    </div>
</template>

<script lang="ts">
import {defineComponent,ref,reactive,computed,toRaw} from 'vue'
import {mainStore} from '@/store/index.ts'
import {createRoleReq,readRoleReq,updateRoleReq} from '@/network/index.ts'
import RoleTable from '@/components/RoleTable/RoleTable.vue'
export default defineComponent({
  components: {
    RoleTable  
  },
  setup(){
    let store = mainStore()
    
    interface RoleTableDataInt {
      roleName?: string,
      rolePermission?: Array<{
          title?: string,
          fatherIcon?: string,
          fatherName?: string,
          icon?: string,
          name?: string,
          c?: boolean,
          u?: boolean,
          r?: boolean,
          d?: boolean,
          isSelect?: boolean
          children?: RoleTableDataInt['rolePermission']
      }>
    }
    
    function toTableData(data: any, adminName: string): any{
        
        let tableData: Array<RoleTableDataInt> = []
        let admin: RoleTableDataInt = JSON.parse(JSON.stringify(data.find((i:RoleTableDataInt) => i.roleName == adminName)))
        
        for(let i of data){
          let temp: RoleTableDataInt = {
            roleName: i.roleName,
            rolePermission: []
          }
          for(let per of admin.rolePermission!){
            let hasPer = i.rolePermission.find!((item: any) => item!.name! == per.name)
            
            if(hasPer){
                
                if(per?.children){
                  for(let child of per.children){
                    
                    let hasPerChild = hasPer!.children!.find((item: any) => item.name == child.name)  
                    if(hasPerChild){
                      temp!.rolePermission!.push({
                          title: per.title + '-' + child.title,
                          fatherIcon: per.icon,
                          fatherName: per.name,
                          icon: child.icon,
                          name: child.name,
                          c: hasPerChild.c,
                          u: hasPerChild.u,
                          r: hasPerChild.r,
                          d: hasPerChild.d,
                          isSelect: true,
                      })
                    }
                    else {
                        temp!.rolePermission!.push({
                            title: per.title + '-' + child.title,
                            fatherIcon: per.icon,
                            fatherName: per.name,
                            icon: child.icon,
                            name: child.name,
                            c: false,
                            u: false,
                            r: false,
                            d: false,
                            isSelect: false,
                        })
                    }
                  }
                }
                else {
                  temp!.rolePermission!.push({
                      title: per.title,
                      icon: per.icon,
                      name: per.name,
                      c: hasPer.c,
                      u: hasPer.u,
                      r: hasPer.r,
                      d: hasPer.d,
                      isSelect: true
                  })
                }
            }
            else {
              if(per?.children){
                for(let child of per.children){
                    temp!.rolePermission!.push({
                        title: per.title + '-' + child.title,
                        icon: per.icon,
                        name: per.name,
                        c: false,
                        u: false,
                        r: false,
                        d: false,
                        isSelect: false,
                    })
                }
              }
              else {
                temp!.rolePermission!.push({
                    title: per.title,
                    icon: per.icon,
                    name: per.name,
                    c: false,
                    u: false,
                    r: false,
                    d: false,
                    isSelect: false,
                })
              }
              
            }
          }
          tableData.push(temp)
        }
        
        let adminTableData: RoleTableDataInt = JSON.parse(JSON.stringify(tableData.find((i:RoleTableDataInt) => i.roleName == adminName)))
        adminTableData.roleName = '';
        adminTableData!.rolePermission!.forEach((i:any) => {
          i.isSelect = false;
          i.c = false;
          i.u = false;
          i.r = false;
          i.d = false;
        });
        
        return {tableData,adminTableData};
    }
    function toPermissionData(data: RoleTableDataInt): RoleTableDataInt{
        let res: RoleTableDataInt = {
          roleName: '',
          rolePermission: []
        };
        
        if(data.roleName == ''){
          console.log('角色名称不能为空')
        }
        else {
          res.roleName = data.roleName
          let filter = data.rolePermission!.filter((i: any) => i.isSelect)
          
          if(filter.length > 0){
             for(let i of filter){
                let title = i.title!.split('-')
                if(title!.length == 1){
                  res!.rolePermission!.push({
                      title: i.title,
                      icon: i.icon,
                      name: i.name,
                      c: i.c,
                      u: i.u,
                      r: i.r,
                      d: i.d
                  })
                }
                else {
                  let hasChild = res!.rolePermission!.find((i:any) => i.title == title[0])
                  if(hasChild){
                    hasChild!.children!.push({
                        title: title[1],
                        icon: i.icon,
                        name: i.name,
                        c: i.c,
                        u: i.u,
                        r: i.r,
                        d: i.d
                    })
                  }
                  else {
                    res!.rolePermission!.push({
                       title: title[0],
                       icon: i.fatherIcon,
                       name: i.fatherName,
                       children: [
                           {
                               title: title[1],
                               icon: i.icon,
                               name: i.name,
                               c: i.c,
                               u: i.u,
                               r: i.r,
                               d: i.d
                           }
                       ]
                    })
                  }
                  
                }
             }
             
          }
          
        }
        
        
        return res;
    }
    
    let roleTableData = ref<Array<RoleTableDataInt>>([])
    let adminTableData = ref<RoleTableDataInt>({})
    let roleTableDataFilter = computed(() => roleTableData.value.map(function(role){ return {roleName: role.roleName,rolePermission: role!.rolePermission!.filter(per => per.isSelect)};} ))
    readRoleReq().then(res => {
      if(res.status == 200){
        let tableData = toTableData(res.data.allRole,res.data.adminRole.roleName)
        roleTableData.value = tableData.tableData
        adminTableData.value = tableData.adminTableData
        
        
      }
    })
    
    let createRoleData = ref<RoleTableDataInt>({})
    let showCreateRole = ref(false)
    function createRole(){
      showCreateRole.value = true
      createRoleData.value = JSON.parse(JSON.stringify(adminTableData.value))
    }
    function submitCreateRole(){
      let data = toPermissionData(createRoleData.value)
      if(data.roleName! != ''){
          createRoleReq(data).then(res => {
            if(res.status == 200){
              roleTableData.value.push(createRoleData.value);
              showCreateRole.value = false;
            }
          })
      }
    }
    
    let nowUpdateIndex = ref(0)
    let updateRoleData = ref<RoleTableDataInt>({})
    let showUpdateRole = ref(false)
    function updateRole(role: any, index: number){
      updateRoleData.value = JSON.parse(JSON.stringify(toRaw(role)))
      showUpdateRole.value = true
      nowUpdateIndex.value = index
    
    }
    function submitUpdateRole(){
      let data = toPermissionData(updateRoleData.value);
      if(data.roleName != ''){
        updateRoleReq(data,roleTableData.value[nowUpdateIndex.value].roleName as string).then(res => {
          if(res.status == 200){
            roleTableData.value[nowUpdateIndex.value] = JSON.parse(JSON.stringify(toRaw(updateRoleData.value)))
            showUpdateRole.value = false;
          }
        });
      }
    }
    
    let nowDeleteIndex = ref(0)
    function deleteRole(){
        
    }
    
    return {
      roleTableData,
      roleTableDataFilter,
      
      createRole,
      createRoleData,
      showCreateRole,
      submitCreateRole,
      
      updateRole,
      updateRoleData,
      showUpdateRole,
      submitUpdateRole,
    
      deleteRole,
    }
  }
})
</script>

<style lang="less" scoped>
#RoleManage {
  margin: 10px;
}
.role-manage-header {
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
