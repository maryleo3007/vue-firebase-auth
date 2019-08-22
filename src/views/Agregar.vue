<template>
    <div>
        <h2>Agregar nueva tarea</h2>
        <form @submit.prevent="agregarTarea(nombre)">
            <input type="text"  v-model="$v.nombre.$model"/>
            <button type="submit" class="btn btn-info ml-3" :disabled="!$v.nombre.minLength || carga">Agregar</button>
        </form>
        <div v-if="!$v.nombre.required">
           <b-alert show variant="danger">Campo requerido</b-alert>     
        </div>
        <div v-if="!$v.nombre.minLength">
            <b-alert show variant="danger">Ingresar mínimo de 4 caracteres</b-alert>
        </div>
        
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
    name: 'Agregar',
    data(){
        return{
            nombre:''
        }
    },
    methods:{
        ...mapActions(['agregarTarea'])
    },
    computed:{
        ...mapState(['carga'])
    },
    validations: {
        nombre: { required, minLength: minLength(4) }
    }
}
</script>