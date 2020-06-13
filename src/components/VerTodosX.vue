<template>
    <div class="row w-100 row-perfil m-0">
        <div class="col-12 pl-0">
            <div class="row">
                <div class="col-12 pr-0">
                    <Navbar ref="navbar" ></Navbar>
                    <div class="row mt-3 w-100">
                        <div class="col-auto ml-5">
                            <a class="enlace" @click="volverAPerfil()" ><i class="fas fa-chevron-left"></i> Volver al perfil</a>
                        </div>
                    </div>
                    <div v-if="todasLasFotos.length > 0" class="row w-100">
                        <div v-for="foto in todasLasFotos" :key="foto.id" class="col-12 col-md-6 col-xl-3 mt-3">
                            <div class="row justify-content-center">
                                <a @click="cargarImagenModal(foto)" v-b-modal.modalImagen><img class="foto" :src="foto.image"/></a>
                            </div>
                        </div>
                    </div>
                    <div v-if="todosLosAmigos.length > 0" class="row w-100">
                        <div v-for="amigo in todosLosAmigos" :key="amigo.id" class="col-12 col-md-6 col-xl-3 mt-3">
                            <div v-if="amigo.tipo=='user'" class="row justify-content-center">
                                <div @click="perfil(amigo.datos.is_friend.id)" class="col-auto">
                                    <img class="foto" :src="amigo.datos.is_friend.profile_pic"/>
                                </div>
                                <div class="col-12 text-center">
                                    <a class="enlace text-center">{{amigo.datos.is_friend.name}} {{amigo.datos.is_friend.surname}}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal v-if="modal.activo" size="xl" cancel-disabled ok-disabled  id="modalImagen" title="Imagen">
            <template v-slot:default>
                <div  class="row modalImagen">
                    <div class="col-12 col-md-8 d-flex align-items-center justify-content-center">
                        <img class="img-fluid" :src="modal.imagen" alt="">
                    </div>
                    <div class="col-12 col-md-4 border-left">
                        <div class="row h-100">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-12">
                                        por <a class="link_profile" @click="perfil(modal.id_user)">{{modal.subido_por}}</a>
                                    </div>
                                </div>
                                <div class="row row-modal-comentarios align-items-end">
                                    <div v-if="modal.respuestas.length > 0"  class="col-12">
                                        <div v-for="respuesta in modal.respuestas" :key="respuesta.id" class="row mb-3">
                                            <div class="col-auto">
                                                <img class="prof_pic" :src="respuesta.user.profile_pic">
                                            </div>
                                            <div class="col">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <a class="link_profile" @click="perfil(respuesta.user.id)">{{respuesta.user.name}} {{respuesta.user.surname}}</a> <small>({{respuesta.dateTime}})</small>
                                                    </div>
                                                    <div class="col-12">
                                                        {{respuesta.comment}}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row align-items-center row-modal-form pt-1">
                                    <div class="col-12">
                                        <form @submit.prevent="nuevoComentarioFoto()">
                                            <div class="row align-items-center">
                                                <div class="col-8">
                                                    <textarea v-model="modal.form_respuesta" class="w-100 pt" type="text" name="" id="" placeholder="Introduce aquí tu comentario..."></textarea>
                                                </div>
                                                <div class="col">
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <b-button type="submit" class="botonEnviarComentarioModal" variant="primary" size="">Enviar</b-button>
                                                        </div>
                                                        <div class="col-12 mt-2">
                                                            <b-button type="submit" variant="outline-secondary" size="sm"><i class="fas fa-cog"></i></b-button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:modal-footer="{ hide }">
                <b-button class="d-none" variant="outline-danger" @click="hide('forget')">
                    Cerrar
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import Navbar from '@/components/Parts/Navbar.vue'
import axios from 'axios'

export default {

    data() {
        return {
            todasLasFotos: [],
            todosLosAmigos: [],
            images: [],
            email: "",
            auxImages: [],
            modal: {
                activo: true,
                imagen: "",
                subido_por: "",
                respuestas: [],
                id_user: "",
                form_respuesta: "",
                id: "",
            },
            user: Object,
        } 
    },

    components: {
        Navbar,
    },

    beforeCreate() {
        if(sessionStorage.getItem('user') == undefined) {
            document.body.style = "background-color: #5284b5 !important"
            this.$router.push({name: "Principal"})
        }
        this.user = sessionStorage.getItem('user')
        this.user = JSON.parse(this.user)
        const path = "http://localhost:8000/api/v1.0/users/?email=" + this.user.email  + "&password=" + this.user.password
        axios.get(path).then((response) => {
            this.user.nombre = response.data[0].name
            this.user.apellido = response.data[0].surname
            this.user.foto = response.data[0].profile_pic
            this.user.visitas = response.data[0].visits
            this.user.invis = response.data[0].invitations
            this.user.id = response.data[0].id
        })
    },


    mounted() {
        if(window.location.pathname.includes("fotos")) {
            const path = "http://localhost:8000/api/v1.0/photos/?uploaded_by=" + this.$route.params.id
            axios.get(path).then((response) => {
                this.todasLasFotos = response.data
            })
        }
        else {
            const path1 = "http://localhost:8000/api/v1.0/friends/?user=" + this.$route.params.id
            const path2 = "http://localhost:8000/api/v1.0/friends/?is_friend=" + this.$route.params.id
            
            axios.all([axios.get(path1), axios.get(path2)]).then((response) => {
                for(let datos of response[0].data){
                    this.todosLosAmigos.push({datos, tipo: 'user'})
                }
                for(let datos of response[1].data) {
                    this.todosLosAmigos.push({datos, tipo: 'is_friend'})
                }
            })
        }
    },

    methods: {

        getPhotos(id) {
            const path = "http://localhost:8000/api/v1.0/photos/?uploaded_by=" + this.$route.params.id
            axios.get(path).then((response) => {
                for(let i = 0; i < 6; i++){
                    this.auxImages.push(response.data[i])
                }
                for(let imagen of response.data){
                    this.images.push(imagen)
                }

            }).catch(() => {
                console.log("ERRRROOOOOOOR")
            })
        },

        volverAPerfil() {
            this.$router.replace('/perfil/'+ this.$route.params.id)
        },

        nuevoComentarioFoto() {
            const path = "http://localhost:8000/api/v1.0/commentphotos/"
            var data = {
                comment: this.modal.form_respuesta,
                dateTime: new Date().toISOString,
                user: this.user.id,
                image: this.modal.id
            }
            axios.post(path, data).then((response) => {
                this.modal.activo = false
                setTimeout(() => {
                    this.modal.activo = true
                    this.modal.form_respuesta = ""
                ,20})
            }).catch((error) => {
                console.log("error", error)
            })
        },

        perfil(id) {
            this.$router.push('/perfil/' + id)
            //this.$emit('recarga')
        },

        cargarImagenModal(image) {

            const path2 = "http://localhost:8000/api/v1.0/commentphotos/?image=" + image.id 

            axios.get(path2).then((response) => {
                this.modal.respuestas = response.data
            }).catch((error) => {
                console.log("nada, nada de nada")
            })

            this.modal.imagen = image.image
            this.modal.id = image.id
            const path = "http://localhost:8000/api/v1.0/users/?id=" + image.uploaded_by
            axios.get(path).then((response) => {
                this.modal.subido_por = response.data[0].name + " " + response.data[0].surname
                this.modal.id_user = response.data[0].id
            })
        }
    }

}
</script>

<style scoped>
    .foto {
        height: 275px;
        width: 275px;
    }

    .foto:hover {
        cursor: pointer;
        box-shadow: 3px 3px 5px 0px #000;
    }

    .enlace {
        color: #5c8fba !important;
    }

    .enlace:hover {
        cursor: pointer;
        text-decoration: underline;
    }

    .imageFotos{
        width: 180px;
        height: 180px;
        cursor: pointer;
    }

    .prof_pic {
        width: 60px !important;
        height: 60px !important;
    }

    a.enlaceAlbum, .enlaceAlbum *, .verTodas, .link_profile {
        color: #5c8fba !important;
        cursor: pointer;
    }

    .enlaceAlbum:hover, .link_profile:hover {
        text-decoration: underline !important;
    }

    .modalImagen {
        height: 75vh !important;
    }

    .modalImagen .imagen {
        min-width: 400px;
        min-height: 400px;
        max-width: 800px;
        max-height: 600px;
        height: 80%;
        width: auto;
    }

    .row-modal-comentarios {
        height: 85% !important;
    }

    .row-modal-form {
        background-color: #e0e0e0;
        height: 90px !important;
    }

    textarea {
        resize: none;
        height: 80px;
    }

    .botonEnviarComentarioModal {
        background-color: #5c8fba;
        border: none;
    }


</style>