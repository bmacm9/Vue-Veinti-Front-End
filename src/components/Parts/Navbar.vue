<template>
    <div class="w-100">
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand to="/home"><img class="logo" src="../../../static/logo.png"/></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/home">Inicio</b-nav-item>
                <b-nav-item @click="miPerfil"> Perfil</b-nav-item>
                <b-nav-item to="/mensajes">Mensajes</b-nav-item>
                <b-nav-item href="#">Gente</b-nav-item>
                <b-nav-item href="#">Videos</b-nav-item>
                <b-nav-form @submit.prevent="buscar()">
                    <b-form-input v-model="busqueda" size="sm" class="mr-sm-2" placeholder="Buscar..."></b-form-input>
                </b-nav-form>
                <b-button class="subirFoto mt-md-1 ml-md-2" v-b-modal.subir-foto variant="primary">Subir foto<i class="ml-2 fas fa-cloud-upload-alt"></i></b-button>
                <b-modal size="xl" cancel-disabled ok-disabled  id="subir-foto" title="Subir Foto">
                    <template v-slot:default>
                        <div class="row">
                            <div class="col-6 border-right">
                                <div class="row">
                                    <div class="col-12">
                                        <h3 class="text-center">Subida múltiple de fotos</h3>
                                    </div>
                                    <div class="col-12">
                                        <p class="text-center">Para subir muchas fotos a la vez</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 text-center">
                                        <img class="imagenSubidaMultiple" src="../../../static/subirfotos.png">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <p class="text-center">Haz click mientras presionas Ctrl para seleccionar varios archivos</p>
                                    </div>
                                    <div class="col-12 text-center">
                                        <b-button class="btn-veinti" variant="primary">Seleccionar Fotos</b-button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="row h-100">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-12">
                                                <h3 class="text-center">Sistema de subida básica</h3>
                                            </div>
                                            <div class="col-12">
                                                <p class="text-center">Para subir pocas fotos</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <form @submit.prevent="subirImagenes" method="POST" class="col-12">
                                            <div class="row w-100 align-items-center">
                                                <div class="col-12 mb-2 text-center">
                                                    <input @change="addImage($event)" type="file" value="Seleccionar Archivo"/>
                                                </div>
                                                <div @change="addImage($event)" class="col-12 mt-2 mb-2 text-center">
                                                    <input type="file" value="Seleccionar Archivo"/>
                                                </div>
                                                <div @change="addImage($event)" class="col-12 mt-2 mb-2 text-center">
                                                    <input type="file" value="Seleccionar Archivo"/>
                                                </div>
                                                <div @change="addImage($event)" class="col-12 mt-2 mb-2 text-center">
                                                    <input type="file" value="Seleccionar Archivo"/>
                                                </div>
                                                <div @change="addImage($event)" class="col-12 mt-2 mb-2 text-center">
                                                    <input type="file" value="Seleccionar Archivo"/>
                                                </div>
                                                <div @change="addImage($event)" class="col-12 mt-2 text-center">
                                                    <input type="file" value="Seleccionar Archivo"/>
                                                </div>
                                            </div>
                                            <div class="row mt-5">
                                                <div class="col-12">
                                                    <p class="text-center">Sólo se aceptan imágenes .jpg .png y .gif de menos de 10 MB</p>
                                                </div>
                                                <div class="col-12 text-center">
                                                    <b-button type="submit" class="btn-veinti" variant="primary">Subir</b-button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </template>

                    <template v-slot:modal-footer="{ hide }">
                        <b-button  variant="outline-danger" @click="hide('forget')">
                            Cerrar
                        </b-button>
                    </template>
                </b-modal>
            </b-navbar-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item to="/mi-cuenta">Mi cuenta</b-nav-item>
                <b-nav-item @click="logOut" href="#">Salir</b-nav-item>
            </b-navbar-nav>

            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>

import axios from 'axios'
import Vue from 'vue'

export default {

    created() {
        this.user = sessionStorage.getItem('user')
        this.user = JSON.parse(this.user)
        this.email = this.user.email
        this.getID(this.email)
        this.complete = true
    },

    data() {
        return {
            images:[],
            user: {
                id: "",
            },
            busqueda: "",
        }
    },

    methods: {
        logOut(){
            sessionStorage.removeItem('user')
            document.body.style="background-color: #5284b5 !important"
            this.$router.replace('/')
        },

        addImage(event){
            this.images.push(event.target.files[(event.target.files.length-1)])
        },

        subirImagenes() {
            const path = "http://localhost:8000/api/v1.0/photos/"
            for(let imagen of this.images){
                let formData = new FormData()
                formData.append('image', imagen)
                formData.append('dateTime', new Date().toISOString())
                formData.append('uploaded_by', this.user.id)
                let aux = {dateTime: new Date().toISOString(), image: imagen, uploaded_by: this.user.id}
                axios.post(path, formData)
                .then((response) => {})
            }
        },

        addVisit() {
            const path1 = "http://localhost:8000/api/v1.0/users/"+ this.$route.params.id +"/"
            axios.get(path1).then((response) => {
                let nuevaVisita = response.data.visits + 1
                axios.patch(path1, {visits: nuevaVisita}).then((response) => {})
            })
        },

        getID(email) {
            const path = "http://localhost:8000/api/v1.0/users/?email=" + email
            axios.get(path).then((response) => {
                this.user.id = response.data[0].id
                if(this.$route.params.id) {
                    if(this.$route.params.id != this.user.id) {
                        this.addVisit()
                    }
                }
            })
        },

        miPerfil() {
            this.$router.push({name:"MiPerfil", params:{id: this.user.id}})
            this.$emit('recarga')
        },

        buscar() {
            if(this.busqueda != "") {
                let aux = this.busqueda.replace(/\s/g, '+')
                this.$router.push({name:"Busqueda", params:{search: aux}})
                this.$emit('recarga')
            }
        }
    }
}
</script>

<style>
    
    body {
        background-color: white !important;
    }

    .logo {
        margin: 10px 0;
        height: 30px !important;
    }

    .navbar {
        background-color: #5c8fba !important;
        padding-top: 0;
        padding-bottom: 0;
    }

    .nav-item a {
        color: white !important;
        font-weight: 600;
        font-size: 16px;
    }


    .nav-item {
        padding: 0 8px
    }

    .subirFoto {
        background-color: #36536b;
        border: none;
        height: 33px;
        width: 100px;
        font-size: 12px;
    }
    
    .subirFoto:active, .subirFoto:focus {
        background-color: #304a5f !important;
        border: none !important;
        box-shadow: none;
    }

    .subirFoto:hover {
        background-color: #304a5f;
    }

    .navbar-nav.ml-auto:last-child {
        margin-right: 20px;
    }

    .imagenSubidaMultiple {
        height: 450px;
        width: inherit;
    }

    .btn-veinti {
        background-color: #5c8fba;
        border: none;
    }



</style>