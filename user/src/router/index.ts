import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const Login = () => import('@/views/Login/Login.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'mainDefault',
    redirect: '/Login'
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  if(to.path == '/Login'){
      next()
  }
  else {
      let token = JSON.parse(localStorage.getItem('mainStore') as string) ? JSON.parse(localStorage.getItem('mainStore') as string)?.token : ''
      if(!token){
        next('Login')
      }
      else next()
  }
})

export default router
