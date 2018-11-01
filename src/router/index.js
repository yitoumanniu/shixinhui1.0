import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const components = {
  login: () => import('../views/login'),
  layout: () => import('../views/layout/layout'),
  index: () => import('../views/index/index'),
  user: () => import('../views/user/index'),
  text: () => import('../views/text'),
  userEdit:()=> import('../views/userEdit'),
  addUser:()=> import('../views/addUser'),
  addSwiper:()=> import('../views/swiper')
}

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: "/login"
    },
    {
      path: "/login",
      component: components.login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/layout',
      name: 'layout',
      component: components.layout,

      redirect: '/layout/index',
      children: [
        {
          path: "index",
          name: 'index',
          meta: {
            title: '首页'
          },
          component: components.index,
        },
        {
          path: 'user',
          name: 'user',
          meta: {
            title: '狮心会用户管理'
          },
          component: components.user
        },
        {
          path: "text",
          name: "text",
          meta: {
            title: "上传图片测试"
          },
          component: components.text
        },
        {
          path:"userEdit",
          name:"userEdit",
          meta: {
            title:'修改个人信息'
          },
          component: components.userEdit
        },
        {
          path:"addUser",
          name:"addUser",
          meta:{
            title : '添加管理员'
          },
          component: components.addUser
        },
        {
          path:'addSwiper',
          name: 'addSwiper',
          meta : {
            title : '添加轮播图'
          },
          component: components.addSwiper
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router

