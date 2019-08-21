<template>
    <div>
        <h2>Ingresar usuario</h2>
        <form class="m-5" @submit.prevent="crearUsuario({usuario:usuario,contrasenia:contrasenia})">
            <div class="form-group">
                <label for="exampleInputEmail1">Correo</label>
                <input v-model="usuario" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Contraseña</label>
                <input  v-model="contrasenia" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword2">Confirmar contraseña</label>
                <input v-model="confirmContrasenia" type="password" class="form-control" id="exampleInputPassword2" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary" :disabled="!desactivar">Ingresar</button>
        </form>
        <div class="alert alert-danger" role="alert">
        {{error}}
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
    name:'Registro',
    data(){
        return{
            usuario: '',
            contrasenia: '',
            confirmContrasenia: ''
        }
    },
    methods:{
        ...mapActions(['crearUsuario'])
    },
    computed:{
        ...mapState(['error']),
        desactivar(){
            return this.contrasenia === this.confirmContrasenia && this.contrasenia !== ''
        }
    }

}
</script>