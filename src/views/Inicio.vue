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
        <form class="m-5" v-on:keyup="buscarTarea(texto)">
            <div class="form-group">
                <input v-model="texto" type="text" class="form-control" id="formGroupExampleInput" placeholder="Buscar...">
            </div>
        </form>
        <ul class="list-group m-5" v-if="!carga">
            <li class="list-group-item" v-for="tarea of arrayFiltrado" :key="tarea.id">
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
import { mapState,  mapActions, mapGetters } from 'vuex';
export default {
    name: 'Inicio',
    data() {
      return {
        variants: ['info'],
        texto:''
      }
    },
    methods:{
        ...mapActions(['getTareas','eliminarTarea', 'buscarTarea'])
    },
    created(){
        this.getTareas()
    },
    computed: {
        ...mapState(['usuario','tareas','carga']),
        ...mapGetters(['arrayFiltrado'])
    }
}
</script>