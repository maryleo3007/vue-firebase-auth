import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuelidate)
Vue.use(BootstrapVue)

var firebase = require("firebase/app")
require('firebase/firestore')
require("firebase/auth")

var firebaseConfig = {
  apiKey: "AIzaSyBGbjaFK4QqarG_fEyF3juC2kqzfaWkN1Q",
  authDomain: "vue-tareas-cb6f2.firebaseapp.com",
  databaseURL: "https://vue-tareas-cb6f2.firebaseio.com",
  projectId: "vue-tareas-cb6f2",
  storageBucket: "vue-tareas-cb6f2.appspot.com",
  messagingSenderId: "212869039405",
  appId: "1:212869039405:web:fddb590609bfc235"
};

const app = firebase.initializeApp(firebaseConfig);
app.firestore();

export default app.firestore()

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user)=>{
  
  if (user) {
    store.dispatch('detectarUsuario', {email:user.email,uid: user.uid})
  } else {
    store.dispatch('detectarUsuario', null)
  }

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})




