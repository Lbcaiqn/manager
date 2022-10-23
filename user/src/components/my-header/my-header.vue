<template>
  <div id="my-header">
    <div class="title">
      <div>
        <el-button @click="menuStore.collapse = !menuStore.collapse">
            三
        </el-button>
      </div>
      <div class="tags">
        <div v-for="(i,iIndex) in menuStore.tags" :key="iIndex">
          <span v-if="iIndex!=0">&nbsp;/&nbsp;</span>
          <span :style="{color: i.isActive == menuStore.isActive ? '#fff' : 'gray'}">{{i.label}}</span>
        </div>
      </div>
    </div>
    <div class="options">
      <el-dropdown trigger="click">
        <div class="dropdown-title">
          <img src="@/assets/img/20680372.png" />
          <el-icon color="#fff" :size="30">
            <arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {MenuStore} from '@/store/index.ts'
import {useRouter} from 'vue-router'
export default defineComponent({
  setup(){
    const router = useRouter();
    const menuStore = MenuStore();
    
    function logout(){
      localStorage.setItem('mainStore','');
      router.replace('/Login');
      for(let i of router.getRoutes()){
        if(!['mainDefault','Login'].includes(i.name as string)){
          router.removeRoute(i.name as string);
        }
      }
      
    }
    
    return {
      menuStore,
      logout
    }
  }
})
</script>

<style lang="less" scoped>
#my-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  >div {
      height: 80%;
      display: flex;
      align-items: center;
  }
  >div:first-child {
    margin-left: 10px;
  }
  >div:last-child {
    margin-right: 10px;
  }
  .title {
    >div:last-child {
      margin-left: 20px;
    }
    .tags {
        display: flex;
    }
  }
}
.dropdown-title {
  img {
    width: 40px;
    border-radius: 20px;
    margin-right: 10px;
  }
}
</style>