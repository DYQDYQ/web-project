import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/process',
      name: 'process',
      component: () => import('./views/process/process.vue'),
      redirect:'/process/process-main',
      children:[
        {
          path: 'process-main',
          name: 'process-main',
          component: () => import('./views/process/process-main.vue')
        },
        {
          path: 'process-lurujindu',
          name: 'process-lurujindu',
          component: () => import('./views/process/lurujindu.vue')
        },
        {
          path: 'process-element',
          name: 'process-element',
          component: () => import('./views/process/elementmanage.vue')
        },
      ]

    },
    {
      path: '/file',
      name: 'file',
      component: () => import('./views/file.vue')
    },
    {
      path: '/meeting',
      name: 'meeting',
      component: () => import('./views/meeting/meeting-main.vue'),
      redirect:'/meeting/meetinginf',
      children:[
          {
            path: 'meeting-list',
            name: 'meeting-list',
            component: () => import('./views/meeting/meeting-list.vue')
          },
          {
              path: 'meetinginf',
              name: 'meetinginf',
              component: () => import('./views/meeting/meetinf.vue')
          }
      ]
    },
    {
      path: '/projectview',
      name: 'projectview',
      component: () => import('./views/projectview.vue')
    },
    {
      path: '/projectnotice',
      name: 'projectnotice',
      component: () => import('./views/projectnotice.vue')
    },
    {
      path: '/quality',
      name: 'quality',
      component: () => import('./views/quality.vue')
    },
    {
      path: '/safe',
      name: 'safe',
      component: () => import('./views/safe.vue')
    },
  ]
})
