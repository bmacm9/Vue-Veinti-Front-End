<template>
    <div class="row">
        <div class="col-12">
            <div class="row">
                <div class="col-12">
                    <Navbar ref="navbar"></Navbar>
                </div>
            </div>
            <div class="row justify-content-between align-items-center border-bottom mt-3">
                <div class="col-auto">
                    <h2 class="tituloMensajes ml-5">Mensajes</h2>
                </div>
                <div class="col-auto mr-5">
                    <router-link to="/mensajes/nuevo" class="enlace">Nuevo mensaje privado</router-link>
                </div>
            </div>

            <div v-if="totalMensajes.length == 0" class="row justify-content-center mt-3">
                <div class="col-12 text-center">
                    <img class="img-fluid" src="../../static/arana.jpg">
                </div>
                <div class="col-12 text-center">
                    <h3>Todavía no has recibido ningún mensaje privado, ¿a qué esperas para <router-link to="/mensajes/nuevo" class="enlace">contactar con todos tus amigos</router-link>?</h3>
                </div>
            </div>
            <div v-if="totalMensajes.length != 0" class="container">
                <div  class="row justify-content-center">
                    <div v-for="mensaje in totalMensajes" :key="mensaje.id" class="col-12 bg-container mt-3 py-3">
                        <div class="row">
                            <div class="col-auto">
                                <img class="imagenPerfil" :src="mensaje.user.profile_pic">
                            </div>
                            <div class="col-auto">
                                <div class="row">
                                    <div class="col-12">
                                        <a @click="perfil(mensaje.user.id)" class="enlace">{{mensaje.user.name}} {{mensaje.user.surname}}</a>
                                    </div>
                                    <div class="col-12">
                                        {{mensaje.dateTime}}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        {{mensaje.message}}
                                    </div>
                                </div>
                            </div>
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

    beforeCreate() {
        if(sessionStorage.getItem('user') == undefined) {
            document.body.style = "background-color: #5284b5 !important"
            this.$router.push({name: "Principal"})
        }
    },

    data() {
        return {
            totalMensajes: [],
            user: Object,

        }
    },

    created() {
        this.user = sessionStorage.getItem('user')
        this.user = JSON.parse(this.user)
        this.email = this.user.email
        this.getID(this.email)
    },

    methods: {
        getID(email) {
            const path = "http://migueldev.pythonanywhere.com/api/v1.0/users/?email=" + email
            axios.get(path).then((response) => {
                this.user.id = response.data[0].id
                this.getMensajes()
            })
        },

        getMensajes() {
            const path = "http://migueldev.pythonanywhere.com/api/v1.0/privatemessage/?send_to=" + this.user.id
            axios.get(path).then((response) => {
                for(let respuesta of response.data) {
                    this.totalMensajes.push(respuesta)
                }
                console.log(this.totalMensajes)
            })
        },

        perfil(id) {
            this.$router.push({name: 'MiPerfil', params:{id: id}})
        }
    },



}
</script>

<style scoped>

    .enlace {
        color: #5284b5 !important;
        cursor: pointer;
    }

    .enlace:hover {
        text-decoration: underline;
    }

    .imagenPerfil {
        height: 100px;
        width: 100px;
    }

    .bg-container {
        background-color: #f0f0f0;
    }

    .bg-container:hover {
        border: 1px solid #e0e0e0;
    }

</style>