import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/Admin'
import User from '@/components/User'
import Login from '@/components/login'
import Dashboard from '@/components/Dashboard'
import Dialog from '@/components/Dialog'
import Account from '@/components/Account'
import Files from '@/components/Files'
import Reports from '@/components/Reports'
import auth from '../auth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: (to, from, next) => {

          if(auth.checkAuth())
            next()
          else
            next({ path: '/login' })
      }
    },
    {
      path: '/files',
      name: 'Files',
      component: Files,
      beforeEnter: (to, from, next) => {

          if(auth.checkAuth())
            next()
          else
            next({ path: '/login' })
      }
    },
  {
      path: '/account',
      name: 'Account',
      component: Account,
      beforeEnter: (to, from, next) => {

          if(auth.checkAuth())
            next()
          else
            next({ path: '/login' })
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {

          if(auth.checkAuth())
            next()
          else
            next({ path: '/login' })
      }
    },
    {
      path: '/dialog',
      name: 'Dialog',
      component: Dialog,
      beforeEnter: (to, from, next) => {

          if(auth.checkAuth())
            next()
          else
            next({ path: '/login' })
      }
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports,
      beforeEnter: (to, from, next) => {

          if(auth.checkAuth())
            next()
          else
            next({ path: '/login' })
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
    ,
    {
      path: '/',
      name: 'Login',
      component: Login
    }

  ]
})


