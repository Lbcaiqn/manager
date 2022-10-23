<template>
  <div id="Login">
      <div><input type="text" v-model="username" />{{username}}</div>
      <div><input type="text" v-model="password" />{{password}}</div>
      <div><button @click="logup">注册</button></div>
      <div><button @click="login">登录</button></div>
      <el-button>123</el-button>
  </div>
</template>

<script lang="ts">
import {defineComponent,ref,reactive,toRefs} from 'vue'
import {useRouter} from 'vue-router'
import {mainStore,MenuStore} from '@/store/index.ts'
import {logupReq,loginReq} from '@/network/index.ts'
import {filteRoutes} from '@/tools/RouterTool.ts'
import allRoutes from '@/router/routes.ts'

export default defineComponent({
    setup(){
      const router = useRouter()
      const store = mainStore(), menuStore = MenuStore()
      let data = reactive({
        username: '',
        password: ''
      })
      
      async function logup(){
        let res = await logupReq(data.username,data.password)
        console.log(res)
      }
      async function login(){
          let res = await loginReq(data.username,data.password)
          if(res?.data?.token){
            let userRoutes = filteRoutes(res.data.rolePermission,allRoutes)
            for(let i of userRoutes){
                router.addRoute({
                    path: i.path,
                    name: i.name,
                    component: i.component,
                    children: i.children
                })
            }
            router.getRoutes()[0].redirect = '/Home'
            menuStore.tags.push({
                label: res.data.rolePermission[0].title,
                isActive: res.data.rolePermission[0].name,
                path: res.data.rolePermission[0].name
            })
            menuStore.isActive = res.data.rolePermission[0].name
            router.push('/')
            store.token = res.data.token
            store.permission = res.data.rolePermission
          }
      }
      
      return {
        ...toRefs(data),
        logup,
        login
      }
    }
})
</script>

<style>
</style>