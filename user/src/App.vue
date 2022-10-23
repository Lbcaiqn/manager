<template>
  <div v-if="$route.path == '/Login'">
    <router-view></router-view>
  </div>
  <div class="common-layout" v-else-if="$route.path != '/'">
      <el-container>
        <el-aside :width="menuStore.collapse ? '60px' : '200px'">
          <my-menu></my-menu>
          
        </el-aside>
        <el-container>
          <el-header>
            <my-header />
          </el-header>
          <el-main>
            <my-nav></my-nav>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useRouter} from 'vue-router'
import {filteRoutes} from '@/tools/RouterTool.ts'
import allRoutes from '@/router/routes.ts'
import {MenuStore} from '@/store/index.ts'
import myHeader from '@/components/my-header/my-header.vue'
import myMenu from '@/components/my-menu/my-menu.vue'
import myNav from '@/components/my-nav/my-nav.vue'
export default defineComponent({
  components: {
    myHeader,
    myMenu,
    myNav
  },
  setup(){
      const router = useRouter()
      const menuStore = MenuStore()
      let userInfo = localStorage.getItem('mainStore') ? JSON.parse(localStorage.getItem('mainStore') as string) : {}
      
      if(userInfo?.token){
        let userRoutes = filteRoutes(userInfo.permission,allRoutes)
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
            label: userInfo.permission[0].title,
            isActive: userInfo.permission[0].name,
            path: userInfo.permission[0].name
        })
        menuStore.isActive = userInfo.permission[0].name
        router.push('/')
      }
      
      return {
          menuStore,
      }
    
  }
})
</script>

<style lang="less">
* {
  margin: 0;
  parring: 0;
}
.common-layout {
    margin: 0 auto;
    width: 1500px;
}
.el-container {
    border: 2px solid #000;
}
.el-header {
    border: 2px solid #000;
    background-color: #000;
    color: #fff;
}
</style>
