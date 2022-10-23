<template>
  <div id="Home">
    <div v-if="false" v-for="(i,iIndex) in arr" :key="iIndex">
     {{i}}
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent,ref,reactive,toRaw,toRef,readonly,markRaw} from 'vue'
export default defineComponent({
  setup(){
    let arr = [1,2]
    return {
        arr
    }
  }
})
</script>

<style lang="less">
</style>