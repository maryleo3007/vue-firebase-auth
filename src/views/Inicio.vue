<template>
    <div>
        <h2>Data desde firebase</h2>
        <router-link :to="{name:'agregar'}">
            <button class="btn btn-success">Agregar nueva tarea</button>
        </router-link>
        <div class="text-center mt-5" v-if="carga">
            <b-spinner
                v-for="variant in variants"
                :variant="variant"
                :key="variant"
            ></b-spinner>
        </div>
        <ul class="list-group m-5" v-if="!carga">
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
    data() {
      return {
        variants: ['info']
      }
    },
    methods:{
        ...mapActions(['getTareas','eliminarTarea'])
    },
    created(){
        this.getTareas()
    },
    computed: {
        ...mapState(['usuario','tareas','carga'])
    }
}
</script>