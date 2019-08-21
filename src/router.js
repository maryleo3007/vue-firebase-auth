import Vue from 'vue'
import Router from 'vue-router'
var firebase = require("firebase/app")

Vue.use(Router)

const router2 = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/registro',
      name: 'registro',
      component: () => import(/* webpackChunkName: "about" */ './views/Registro.vue')
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: () => import(/* webpackChunkName: "about" */ './views/Inicio.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/ingreso',
      name: 'ingreso',
      component: () => import(/* webpackChunkName: "about" */ './views/Ingreso.vue')
      
    },
    {
      path: '/agregar',
      name: 'agregar',
      component: () => import(/* webpackChunkName: "about" */ './views/Agregar.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/editar',
      name: 'editar',
      component: () => import(/* webpackChunkName: "about" */ './views/Editar.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router2.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;
    if (rutaProtegida && currentUser === null) {
      next({name:'ingreso'})
    }else{
      next()
    }

})

export default router2