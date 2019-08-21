<template>
    <div>
        <h2>Data desde firebase</h2>
        <router-link :to="{name:'agregar'}">
            <button class="btn btn-success">Agregar nueva tarea</button>
        </router-link>
        <ul class="list-group m-5">
            <li class="list-group-item" v-for="tarea of tareas" :key="tarea.id">
                {{tarea}}
                <router-link :to="{name:'editar',params:{id:tarea.id}}">
                    <button  class="btn btn-info">Editar</button>
                </router-link>
                <button @click="eliminarTarea(tarea.id)" class="btn btn-danger">Eliminar</button>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState,  mapActions } from 'vuex';
export default {
    name: 'Inicio',
    methods:{
        ...mapActions(['getTareas','eliminarTarea'])
    },
    created(){
        this.getTareas()
    },
    computed: {
        ...mapState(['usuario','tareas'])
    }
}
</script>