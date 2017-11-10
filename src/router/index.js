import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/Emergencias'
import Login from '@/components/login'

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
      path: '/emergencias',
      name: 'Emergencias',
      component: Admin,
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


