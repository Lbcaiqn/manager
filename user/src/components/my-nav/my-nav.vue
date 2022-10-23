<template>
  <div id="my-nav">
    <el-tag
      v-for="(i,iIndex) in menuStore.tags"
      :key="iIndex"
      size="large"
      :closable="iIndex != 0"
      :effect="i.isActive == menuStore.isActive ? 'dark' : 'plain'"
      @click="tagClick(i)"
      @close="tagClose(i,iIndex)"
    >
      {{ i.label }}
    </el-tag>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useRouter} from 'vue-router'
import {MenuStore} from '@/store/index.ts'

export default defineComponent({
  setup(){
    const router = useRouter()
    const menuStore = MenuStore()
    function tagClick(i:any){
      router.replace(i.path)
      menuStore.isActive = i.isActive
      
    }
    function tagClose(i:any,iIndex:number){
      if(menuStore.tags.length - 1 == iIndex){
        router.replace(menuStore.tags[iIndex-1].path)
        menuStore.isActive = menuStore.tags[iIndex-1].isActive
        }
        else {
          router.replace(menuStore.tags[iIndex+1].path)
          menuStore.isActive = menuStore.tags[iIndex+1].isActive
        }
        menuStore.tags.splice(iIndex,1)
        
        
    }
    return {
      menuStore,
      tagClick,
      tagClose
    }
  }
})

</script>

<style scoped lang="less">
#my-nav {
  display: flex;
  align-items: center;
  margin-left: 10px;
  height: 40px;
  .el-tag {
    margin-right: 10px;
  }
}
</style>
