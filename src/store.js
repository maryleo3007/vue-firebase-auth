import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
var firebase = require('firebase/app')
import db from "./main";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario:'',
    contrasenia:'',
    error:'',
    tareas : [],
    tarea: {nombre:'',id:''}
  },
  mutations: {
    setUsuario(state,payload){
      state.usuario = payload
    },
    setError(state,payload){
      state.error = payload
    },
    //llenan el estado
    setTareas(state, tareas){
      state.tareas = tareas
    },
    setTarea(state,tarea){
      state.tarea =  tarea
    },
    eliminarTarea(state,id){
      state.tareas = state.tareas.filter((doc)=>{ return doc.id !== id})
    }
  },
  actions: {
    crearUsuario({commit}, payload){
      firebase.auth().createUserWithEmailAndPassword(payload.usuario, payload.contrasenia)
      .then(res=>{
        console.log(res)
        let cuenta = {email:res.user.email,uid:res.user.uid}
        commit('setUsuario',cuenta)
        db.collection(res.user.email).add({
          nombre: 'tarea inicial'
        }).then((res)=>{
          console.log(res)
          router.push({name:'inicio'})
        })
      })
      .catch((error) => {
        console.log(error);
        commit('setError',{error: error.message})
      });
    },
    ingresoUsuario({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then((res)=>{
          console.log(res)
          let cuenta = {email:res.user.email,uid:res.user.uid}
          commit('setUsuario',cuenta)
          router.push({name:'inicio'})
      })
      .catch((error) => {
        console.log(error)
        commit('setError',{error: error.message})
      });
    },
    detectarUsuario({commit},payload){
      if (payload !== null) {
        commit('setUsuario', {email: payload.email, uid:payload.uid})
      }else{
        commit('setUsuario', null)
      }
      
    },
    cerrarSesion({commit}){
      firebase.auth().signOut();
      commit('setUsuario',null)
      router.push({name:'ingreso'})
    },
    getTareas({commit}){
      var user = firebase.auth().currentUser;
      let tareas = []
      db.collection(user.email).get()
      .then( (snapshot) => {
          snapshot.forEach( e => {
            let data = e.data();
            data.id = e.id;
            tareas.push(data)
          })
      })
      commit('setTareas',tareas) // setea la mutacion
    },
    getTarea({commit},id){
      var user = firebase.auth().currentUser;
      db.collection(user.email).doc(id).get()
      .then( doc =>{
        let tarea = doc.data();
        tarea.id = doc.id;
        commit('setTarea',tarea)
      })
    },
    editarTarea({commit},tarea){
      var user = firebase.auth().currentUser;
      db.collection(user.email).doc(tarea.id)
      .update({
        nombre: tarea.nombre
      })
      .then(() => {
        router.push({name:'inicio'})
      })
    },
    agregarTarea({commit},nombre){
      var user = firebase.auth().currentUser;
      db.collection(user.email).add({
        nombre: nombre
      }).then(doc => {
        console.log(doc)
        router.push({name:'inicio'})
      })
    },
    eliminarTarea({commit,dispatch},id){
      var user = firebase.auth().currentUser;
      db.collection(user.email).doc(id).delete()
      .then( () =>{
        console.log('eliminado')
        commit('eliminarTarea',id)
      })
    }
  },
  getters:{
    existeUsuario(state){
      if (state.usuario === null || state.usuario === '' || state.usuario === undefined) {
        return false
      } else {
        return true
      }
    }
  }
})
