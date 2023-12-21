import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Regist from '../components/regist.vue'
import Index from '../components/index.vue'
import Search from '../components/search.vue'
import Item from '../components/item.vue'
import Spbag from '../components/spbag.vue'
import Add from '../components/add.vue'
import Self from '../components/self.vue'
import myOrder from '../components/myOrder.vue'
import guestOrder from '../components/guestOrder.vue'
import myItem from '../components/myItem.vue'
import myInfo from '../components/myInfo.vue'
import one from '../components/one.vue'
// import one from '../components/one.vue'
import test from '../components/test.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: Login },
  {
    path: '/home', component: Home, children: [
      {
        path: '/one',
        component: one
      }
    ],
  },
  { path: '/regist', component: Regist },
  { path: '/index', component: Index },
  { path: '/search', component: Search },
  { path: '/item', component: Item },
  { path: '/spbag', component: Spbag },
  { path: '/add', component: Add },
  { path: '/self', component: Self },
  { path: '/myOrder', component: myOrder },
  { path: '/guestOrder', component: guestOrder },
  { path: '/myItem', component: myItem },
  { path: '/myInfo', component: myInfo },
  { path: '/test', component: test }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行，有两种写法如下：
  // next() 放行   next('/login') 强制跳转

  // 如果用户访问登录页，直接放行
  if (to.path === '/login' || to.path === '/home' || to.path === '/regist') return next();
  // 从sessionStorage中获取到保存的token值
  const tokenStr = window.localStorage.getItem('key');
  // 没有token，强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})

export default router
