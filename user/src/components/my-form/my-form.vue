<template>
    <el-form :model="formData" label-width="120px" class="el-form">
        <el-form-item v-show="i.type != 'hide'" v-for="(i,iIndex) in formLabel" :key="iIndex" :label="i.label + '：'">
          <el-input v-if="i.type == 'input'" v-model="formData[i.model]" :placeholder="'请输入'+i.label" />
          <el-select v-if="i.type == 'select'" v-model="formData[i.model]" :placeholder="'请选择'+i.label">
            <el-option
            v-for="(opt,optIndedx) in i?.options" 
            :key="opt" :value="opt"
            ></el-option>
          </el-select>
          <el-radio-group v-if="i.type == 'radio'" v-model="formData[i.model]">
                <el-radio 
                v-for="(opt,optIndex) in i.options" 
                :key="optIndex" 
                :label="opt" 
                size="large"
                >{{opt}}</el-radio>
              </el-radio-group>
              <el-date-picker
              v-if="i.type == 'date-picker'" 
              v-model="formData[i.model]"
              type="date"
              :placeholder="'请选择' + i.label"
              style="width: 100%" 
              />
        </el-form-item>
        
    </el-form>
   
</template>

<script lang="ts">
import {defineComponent,ref,reactive} from 'vue'
export default defineComponent({
  props: {
    formLabel: Array,
    formData: Object
  },
  setup(){
    
  }
})
</script>

<style lang="less" scoped>
.el-form {
    margin: 0 auto;
}
</style>