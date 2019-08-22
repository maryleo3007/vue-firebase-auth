<template>
    <div>
        <h2>Inicio de sesión</h2>
        <form @submit.prevent="ingresoUsuario({email: $v.email.$model,password: $v.password.$model})">
            <div class="form-group row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input v-model="$v.email.$model" type="text" class="form-control" id="staticEmail">
                </div>
                <small class="text-danger ml-5" v-if="!$v.email.required">Campo requerido</small>
                <small class="text-danger ml-5" v-if="!$v.email.email">Email no válido</small>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input v-model="$v.password.$model" type="password" class="form-control" id="inputPassword" placeholder="Password">
                </div>
                <small class="text-danger  ml-5"  v-if="!$v.password.required">Campo requerido</small>
                <small class="text-danger  ml-5" v-if="!$v.password.minLength">Mínimo 6 caracteres</small>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="$v.$invalid">Iniciar sesión</button>
        </form>
        <div class="alert alert-danger" role="alert">
        {{error}}
        </div>
        {{$v.email}}
        <div>-</div>
        {{$v.password}}
    </div> 
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { required, minLength,  email} from 'vuelidate/lib/validators';

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
    },
    validations: {
        password: {required, minLength: minLength(6)},
        email:{ required, email}
    }
}
</script>