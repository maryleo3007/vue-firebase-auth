<template>
    <div>
        <h2>Editar elemento</h2>
        <div>{{tarea.id}}</div>
        <div>{{tarea.nombre}}</div>
        <form @submit.prevent="editarTarea(tarea)">
            <input type="text" v-model="$v.tarea.nombre.$model"/>
            <button class="btn btn-info ml-3" :disabled="$v.tarea.nombre.minLength">Guardar</button>
        </form>
        <small class="text-danger d-block" v-if="!$v.tarea.nombre.required">Campo requerido</small>
        <small class="text-danger d-block" v-if="!$v.tarea.nombre.minLength">Ingresar minimo 4 caracteres</small>

        {{$v.tarea.nombre}}
    </div>
    
</template>
<script>
import {mapActions, mapState} from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
    name: 'Editar',
    data(){
        return {
            id : this.$route.params.id
        }
    },
    methods:{
        ...mapActions(['getTarea','editarTarea'])
    },
    created(){
        this.getTarea(this.id)
    },
    computed:{
        ...mapState(['tarea'])
    },
    validations: {
        tarea: {
            nombre: { required, minLength: minLength(4) }
        } 
    }
}
</script>