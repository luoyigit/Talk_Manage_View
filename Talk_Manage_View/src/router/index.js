import Vue from 'vue'
import VueRouter from 'vue-router'
import SettingRoute from './setting'
import Develop from './develop'
import Project from './project'
import Man from  './man'
import Renovation from  './renovation'
import Shop from './shop'
import Shortvideo from './shortvideo'
import Live from './live'
import Business from './business'
import Money from './money'
import Service from './service'
import Layout from '@/layout'
import User from './user'
import Home2 from './home'
import home from '../assets/menu/home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '跳转页',
    component: () => import('@/views/common-module/transfer-page'),
  },

  {
    path: '/login',
    name: '登录',
    component: () => import('@/views/common-module/login'),
  },
]

  .concat(SettingRoute)
  .concat(Develop)
  // .concat(Project)
  .concat(Man)
  .concat(Renovation)
  .concat(Shop)
  .concat(Shortvideo)
  .concat(Live)
  .concat(Business)
  .concat(Money)
  .concat(Service)
  .concat(User)
  .concat(Home2)

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router
