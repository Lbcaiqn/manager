import { RouteRecordRaw } from 'vue-router'
const Home = () => import('@/views/Home/Home.vue')
const page1 = () => import('@/views/page1/page1.vue')
const page2 = () => import('@/views/page2/page2.vue')
const page3 = () => import('@/views/page3/page3.vue')
const page4 = () => import('@/views/page4/page4.vue')
const Manage = () => import('@/views/Manage/Manage.vue')
const UserManage = () => import('@/views/Manage/children/UserManage.vue')
const RoleManage = () => import('@/views/Manage/children/RoleManage.vue')
const MenuManage = () => import('@/views/Manage/children/MenuManage.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/page1',
    name: 'page1',
    component: page1
  },
  {
    path: '/page2',
    name: 'page2',
    component: page2
  },
  {
    path: '/page3',
    name: 'page3',
    component: page3
  },
  {
    path: '/page4',
    name: 'page4',
    component: page4
  },
  {
    path: '/Manage',
    name: 'Manage',
    component: Manage,
    children: [
        {
          path: 'UserManage',
          name: 'UserManage',
          component: UserManage
        },
        {
          path: 'RoleManage',
          name: 'RoleManage',
          component: RoleManage
        },
        {
          path: 'MenuManage',
          name: 'MenuManage',
          component: MenuManage
        },
    ]
  },
]

export default routes
