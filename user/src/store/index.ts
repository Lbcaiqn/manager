import {createPinia,defineStore} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

interface PermissionInt {
  [key: string]: any;
}
let permission: Array<PermissionInt> = []
const mainStore = defineStore('main',{
  state(){
    return {
      token: '',
      permission,
      isActive: '0',
      collapse: false
    }
  },
  persist: {
      key: 'mainStore',
      storage: window.localStorage
  }
})

let tags: {label: string, isActive: string, path: string}[] = []
const MenuStore = defineStore('MenuStore',{
  state(){
    return {
      isActive: '',
      collapse: false,
      tags
    }
  },
})

export {
  pinia,
  mainStore,
  MenuStore,
}