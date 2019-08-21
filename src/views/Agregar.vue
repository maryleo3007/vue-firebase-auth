<template>
    <div>
        <h2>Agregar nueva tarea</h2>
        <form @submit.prevent="agregarTarea(nombre)">
            <input type="text"  v-model="nombre"/>
            <button type="submit">Agregar</button>
        </form>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    name: 'Agregar',
    data(){
        return{
            nombre:''
        }
    },
    methods:{
        ...mapActions(['agregarTarea'])
    }
}
</script>