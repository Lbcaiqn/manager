<template>
 <div id="my-aside">
    <el-menu
          :default-active="menuStore.isActive"
          class="el-menu-vertical-demo" 
          background-color="#000" 
          text-color="#fff" 
          :collapse="menuStore.collapse"
        >
          <h5 class="aside-title">{{!menuStore.collapse ? '后台管理系统' : ''}}</h5>
          
          <el-menu-item 
            :index="i.name" 
            v-for="(i,iIndex) in noChildren" 
            :key="i.name" 
            @click="menuItemClick('name',i.name,i.title,i.name,false)"  
          >
            <el-icon><component :is="i.icon"></component></el-icon>
            <span>{{i.title}}</span>
            
          </el-menu-item>
          
          <el-sub-menu 
            :index="i.name" 
            v-for="(i,iIndex) in hasChildren" 
            :key="i.anme" 
            @click="menuItemClick('name',$event.target.innerText == i.title ? i.name : i.children.find(item => item.title == $event.target.innerText).name, $event.target.innerText == i.title ? i.title : i.title + '-' +  i.children.find(item => item.title == $event.target.innerText).title ,$event.target.innerText == i.title ? i.name : i.children.find(item => item.title == $event.target.innerText).name,$event.target.innerText == i.title)"
            >
            <template #title>
              <el-icon><component :is="i.icon" /></el-icon>
              <span>{{i.title}}</span>
            </template>
            <el-menu-item 
              :index="j.name" 
              v-for="(j,jIndex) in i.children" 
              :key="j.name"
              
            >
              <el-icon><component :is="j.icon" /></el-icon>
              <span>{{j.title}}</span>
            </el-menu-item>
          </el-sub-menu>

        </el-menu>
  </div>
</template>

<script lang="ts">
import {defineComponent,ref,reactive, computed} from 'vue'
import {useRouter} from 'vue-router'
import {mainStore,MenuStore} from '@/store/index.ts'

export default defineComponent({
    setup(){
        const router = useRouter();
        const store = mainStore();
        const menuStore = MenuStore()
        
        let noChildren = computed(() => store.permission.filter(i => !i.children))
        let hasChildren = computed(() => store.permission.filter(i => i.children))
        
        
        function menuItemClick(method: 'path' | 'name',path: string,label: string, isActive:string,hasChild: boolean){
            if(!hasChild){
              if(method == 'path')  router.push(path)
              else  router.push({name: path})
              menuStore.isActive = isActive
              if(!menuStore.tags.find((i:any) => i.label == label)){
                menuStore.tags.push({
                  label,
                  isActive,
                  path
                })
              }
            }
            
        }
        return {
            store,
            menuStore,
            hasChildren,
            noChildren,
            menuItemClick
        }
    }
})

</script>

<style lang="less">
#my-aside {
  height: 100vh;
  color: #fff;
}
.aside-title {
  height: 60px;
  padding-left: 20px;
  line-height: 60px;
  font-size: 20px;
  border: 1px solid #fff;

}
.el-menu {
  height: 100vh;
}
</style>