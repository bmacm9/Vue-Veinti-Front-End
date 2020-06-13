<template>
    <div class="row">
        <div class="col-12">
            <div class="row">
                <Navbar ref="navbar" @recarga="recargar"></Navbar>
            </div>
            <div class="row mt-5">
                <div v-for="resultado in arrayResultados" :key="resultado.id" class="col-12 col-md-3">
                    <div @click="perfil(resultado.id)" class="row justify-content-center user">
                        <div class="col-12 text-center">
                            <img class="imagenPerfil" :src="resultado.profile_pic"/>
                        </div>
                        <div class="col-12 text-center enlacePerfil">
                            {{resultado.name}} {{resultado.surname}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Navbar from '@/components/Parts/Navbar.vue'
import axios from 'axios'

export default {

    components: {
        Navbar,
    },

    data() {
        return {
            arrayBusqueda: [],
            arrayResultados: [],
        }
    },

    created() {
        this.cargar()
    },

    methods: {

        beforeCreate() {
            if(sessionStorage.getItem('user') == undefined) {
                document.body.style = "background-color: #5284b5 !important"
                this.$router.push({name: "Principal"})
            }
        },

        recargar() {
            this.arrayBusqueda = []
            this.arrayResultados = []
            this.cargar()
        },

        cargar() {
            this.arrayBusqueda = this.$route.params.search.split('+')
            let posibleNombre = []
            let peticiones = []
            for(let i = 0; i < this.arrayBusqueda.length; i++) {
                posibleNombre.push(this.arrayBusqueda[i])
                let peticion = {"nombre": posibleNombre.join(' '), "apellido": (this.arrayBusqueda.filter(x => !posibleNombre.includes(x)).join(' '))}
                if(peticion.nombre != "" && peticion.apellido != "")
                    peticiones.push(axios.get('http://localhost:8000/api/v1.0/users/?name=' + peticion.nombre + '&surname=' + peticion.apellido))
                else if(peticion.nombre != "") {
                    peticiones.push(axios.get('http://localhost:8000/api/v1.0/users/?name=' + peticion.nombre))
                } else if(peticion.apellido != ""){
                    peticiones.push(axios.get('http://localhost:8000/api/v1.0/users/?surname=' + peticion.apellido))
                }
            }
            axios.all(peticiones).then((response) => {
                for(let respuesta of response) {
                    if (respuesta.data.length > 0) {
                        for(let resultado of respuesta.data){
                            this.arrayResultados.push(resultado)
                        }
                    }
                }
            })
        },

        perfil(id) {
            this.$router.push({name:"MiPerfil", params:{id: id}})
        }
    }

}
</script>

<style scoped>
    .imagenPerfil {
        width: 200px;
        height: 200px;
    }

    .enlacePerfil {
        color: #5c8fba !important;
    }

    .user {
        cursor: pointer;
    }

    .user:hover img {
        box-shadow: 3px 3px 3px black;
    }

    .user:hover .enlacePerfil {
        text-decoration: underline;
    }


</style>