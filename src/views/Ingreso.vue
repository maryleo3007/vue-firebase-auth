<template>
    <div>
        <h2>Inicio de sesión</h2>
        <form @submit.prevent="ingresoUsuario({email,password})">
            <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                <input v-model="email" type="text" class="form-control" id="staticEmail">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                <input v-model="password" type="password" class="form-control" id="inputPassword" placeholder="Password">
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Iniciar sesión</button>
        </form>
        <div class="alert alert-danger" role="alert">
        {{error}}
        </div>
    </div> 
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
    name:'Ingreso',
    data(){
        return{
            email:'',
            password:''
        }
    },
    methods: {
        ...mapActions(['ingresoUsuario'])
    },
    computed:{
        ...mapState(['error'])
    }
}
</script>