<template>
    <div>
        <h2>Ingresar usuario</h2>
        <form class="m-5" @submit.prevent="crearUsuario({usuario:$v.usuario.$model,contrasenia:$v.contrasenia.$model})">
            <div class="form-group">
                <label for="exampleInputEmail1">Correo</label>
                <input v-model="$v.usuario.$model" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <small class="text-danger d-block" v-if="!$v.usuario.required">Campo requerido</small>
            <small class="text-danger d-block" v-if="!$v.usuario.email">Formato incorrecto</small>
            <div class="form-group">
                <label for="exampleInputPassword1">Contraseña</label>
                <input  v-model="$v.contrasenia.$model" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <small class="text-danger d-block" v-if="!$v.contrasenia.required">Campo requerido</small>
            <small class="text-danger d-block" v-if="!$v.contrasenia.minLength">Mínimo 6 caracteres</small>
            <div class="form-group">
                <label for="exampleInputPassword2">Confirmar contraseña</label>
                <input v-model="$v.confirmContrasenia.$model" type="password" class="form-control" id="exampleInputPassword2" placeholder="Password">
            </div>
            <small class="text-danger d-block" v-if="!$v.confirmContrasenia.sameAs">Contraseñas no coinciden</small>
            
            <button type="submit" class="btn btn-primary" :disabled="!desactivar">Ingresar</button>
        </form>
        <div class="alert alert-danger" role="alert">
        {{error}}
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { required, minLength,  email, sameAs} from 'vuelidate/lib/validators';

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
    },
    validations: {
        usuario:{required, email},
        contrasenia:{required, minLength:minLength(6)},
        confirmContrasenia:{sameAs: sameAs('contrasenia')}    
    }

}
</script>