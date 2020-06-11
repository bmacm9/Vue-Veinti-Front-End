<template>
    <div class="row row-espacio mt-4">
        <div class="col-12">
            <div class="row border-bottom">
                <div class="col-12">
                    <h3>Espacio personal</h3>
                </div>
            </div>
            <div v-if="numeroDeEspaciosTotales > 0 && !mostrarFormulario" class="row">
                <div class="col-12">
                    <div class="row mt-4">
                        <div class="col-auto">
                            <strong>{{title}}</strong>
                        </div>
                        <div class="col-auto">
                            <small>{{date}}</small>
                        </div>
                        <div v-if="respuesta" class="col">
                            <div class="row justify-content-end align-items-center">
                                <div class="col-auto">
                                    <a class="borrar-espacio" @click="borrarEspacio">Borrar entrada</a>
                                </div>
                                <div class="col-auto">
                                    <b-button @click="formularioNuevo" variant="outline-secondary">Nuevo</b-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="video" class="row mt-3">
                        <div class="col-12">
                            <iframe  frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="267" height="150" type="text/html" :src="enlaceEmbed"></iframe>
                        </div>
                    </div>
                    <div v-if="imagen" class="row">
                        <div class="col-12">
                            <img class="imagenEspacio" :src="imagen" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 mt-3 text-justify">
                            {{description}} 
                        </div>
                    </div>
                    <div class="row justify-content-end align-items-center mt-3">
                        <div class="col-auto text-secondary">
                            {{numeroDeEspacioActual}} de {{numeroDeEspaciosTotales}}
                        </div>
                        <div class="col-auto">
                            <b-button size="sm" class="mr-1" variant="outline-secondary" @click="primerEspacio"><i class="fas fa-chevron-left"></i><i class="fas fa-chevron-left"></i></b-button>
                            <b-button size="sm" class="mx-1 btn-espacio-siguiente" variant="outline-secondary" @click="anteriorEspacio"><i class="fas fa-chevron-left"></i></b-button>
                            <b-button size="sm" class="mx-1 btn-espacio-siguiente" variant="outline-secondary" @click="siguienteEspacio"><i class="fas fa-chevron-right"></i></b-button>
                            <b-button size="sm" class="mx-1" variant="outline-secondary" @click="ultimoEspacio"><i class="fas fa-chevron-right"></i><i class="fas fa-chevron-right"></i></b-button>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                
                </div>
            </div>
            <div v-if="numeroDeEspaciosTotales == 0 && !mostrarFormulario && respuesta" class="row mt-3">
                <div class="col-12">
                    <span>Tu espacio personal está vacío. <a class="enlaceNuevaEntrada" @click="formularioNuevo">Crea tu primera entrada</a></span>
                </div>
            </div>
            <div v-else-if="!respuesta && (numeroDeEspaciosTotales == 0)" class="row mt-3">
                <div class="col-12">
                    <span>Este usuario actualmente no tiene ningun espacio personal.</span>
                </div>
            </div>
            <div v-if="mostrarFormulario" class="row mt-3">
                <div class="col-12">
                    <form @submit.prevent="enviarEspacio" method="POST">
                        <div class="row justify-content-around align-items-center">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-5">
                                        <h3 class="text-right">Titulo: </h3>
                                    </div>
                                    <div class="col-7">
                                        <input type="text" class="w-100" required v-model="form.title"/>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-5">
                                        <h3 class="text-right">URL Youtube video (opcional): </h3>
                                    </div>
                                    <div class="col-7">
                                        <input class="w-100" type="text" v-model="form.video"/>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-5">
                                        <h3 class="text-right">Imagen (opcional): </h3>
                                    </div>
                                    <div class="col-7">
                                        <input class="w-100" type="file" @change="addImage($event)">
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-5">
                                        <h3 class="text-left">Texto: </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div class="row">
                                <div class="col-12">
                                    <textarea required class="w-100 textAreaEspacio" v-model="form.description"></textarea>
                                </div>
                            </div>
                            <div class="row justify-content-start mt-2">
                                <div class="col-auto">
                                    <b-button type="submit" class="btn-subirEspacio" size="sm">Subir</b-button>
                                </div>
                                <div class="col-auto">
                                    <b-button size="sm" variant="outline-secondary" @click="cerrarFormulario">Cancelar</b-button>
                                </div>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {


    created() {
        this.getEspacio()
    },

    data() {
        return {
            title: "",
            description: "",
            date: "",
            video: "",
            imagen: "",
            idEspacio: "",
            email: "",
            numeroDeEspacioActual: 1,
            numeroDeEspaciosTotales: "",
            mostrarFormulario: false,
            respuesta: false,
            form: {
                title: "",
                description: "",
                video: null,
                imagen: null,
                user: "",
            }
        }
    },

    methods: {
        getEspacio() {
            const path = "http://localhost:8000/api/v1.0/personalspace/?user=" + this.$route.params.id
            axios.get(path).then((response) => {
                this.idEspacio = response.data[this.numeroDeEspacioActual-1].id
                this.numeroDeEspaciosTotales = Object.keys(response.data).length
                this.title = response.data[this.numeroDeEspacioActual-1].title
                this.description = response.data[this.numeroDeEspacioActual-1].description
                this.date = response.data[this.numeroDeEspacioActual-1].dateTime
                this.video = response.data[this.numeroDeEspacioActual-1].video
                this.imagen = response.data[this.numeroDeEspacioActual-1].imagen
            }).catch(() => {})
        },

        siguienteEspacio() {
            if(this.numeroDeEspacioActual <= this.numeroDeEspaciosTotales - 1) {
                this.numeroDeEspacioActual++
                this.getEspacio()
            }
        },

        anteriorEspacio() {
            if(this.numeroDeEspacioActual - 1 >= 1) {
                this.numeroDeEspacioActual--
                this.getEspacio()
            }
        },
        
        primerEspacio() {
            this.numeroDeEspacioActual = 1;
            this.getEspacio()
        },

        ultimoEspacio() {
            this.numeroDeEspacioActual = this.numeroDeEspaciosTotales
            this.getEspacio()
        },

        formularioNuevo() {
            this.mostrarFormulario = true
        },

        cerrarFormulario() {
            this.mostrarFormulario = false;
        },

        enviarEspacio() {
            this.form.user = this.$route.params.id
            let personalSpace = {
                "title": this.form.title,
                "description": this.form.description,
                "video": this.form.video,
                "imagen": this.form.imagen,
                "dateTime": new Date().toISOString(),
                "user": this.form.user,
            }
            const path = "http://localhost:8000/api/v1.0/personalspace/"
            axios.post(path, personalSpace).then((response)=>{
                this.getEspacio(this.$route.params.id)
                this.cerrarFormulario()
                this.form.title = ""
                this.form.video = null
                this.form.imagen = null
                this.form.description = ""
            }).catch((error) => {
                console.log(error)
            })
        },

        addImage(event) {
            this.form.imagen = event.target.files[0]
        },

        borrarEspacio() {
            const path = "http://localhost:8000/api/v1.0/personalspace/" + this.idEspacio + "/"
            axios.delete(path).then((response) =>{
                if(this.numeroDeEspaciosTotales > 1)
                    this.getEspacio(this.$route.params.id)
                else
                    this.numeroDeEspaciosTotales = 0
            }).catch((error) =>{
                console.log("error" + error)
            })
        },
    },

    computed: {
        enlaceEmbed() {
            if(this.video != null){
                var video_id = this.video.split('v=')[1]
                var ampersandPosition = video_id.indexOf('&');
                if(ampersandPosition != -1) {
                    video_id = video_id.substring(0, ampersandPosition);
                }
                return "http://youtube.com/embed/" + video_id
            }
        }
    }, 

    beforeCreate() {
        var thisUser = sessionStorage.getItem('user')
        thisUser = JSON.parse(thisUser)
        const path = "http://localhost:8000/api/v1.0/users/?email=" + thisUser.email + "&password=" + thisUser.password
        axios.get(path).then((response) => {
            if(response.data[0].id == this.$route.params.id) {
                this.respuesta = true
            }
            else this.respuesta = false
        }).catch(() => {
            console.log("ERROR")
        })
    }

}
</script>

<style scoped>

    .row-espacio h3 {
        font-size: 20px;
    }

    .imagenEspacio {
        height: 300px;
    }

    .btn-espacio-siguiente {
        width: 60px;
    }

    .textAreaEspacio {
        height: 150px;
        resize: none;
    }

    .enlaceNuevaEntrada, .borrar-espacio{
        color: #5c8fba !important;
    }

    .enlaceNuevaEntrada:hover, .borrar-espacio:hover {
        text-decoration: underline !important;
        cursor: pointer;
    }

    .btn-subirEspacio {
        background-color: #5c8fba;
        border: none;
    }

    .btn-subirEspacio:hover {
        background-color: #36536b;
    }

</style>