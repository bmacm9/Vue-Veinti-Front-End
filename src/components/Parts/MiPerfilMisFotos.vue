<template>
    <div class="row mt-3 mx-4">
        <div class="col-12">
            <div class="row justify-content-between border-bottom">
                <div class="col">
                    <h4>Fotos</h4>
                </div>
                <div class="col text-right">
                    <a class="enlaceAlbum"><i class="fas fa-book"></i> Álbumes (2) <i class="fas fa-chevron-down"></i></a>
                </div>
            </div>
        </div>
        <div class="col-12 mt-2">
            <div v-if="images.length > 0" class="row border-bottom pb-3">
                <div v-for="image in auxImages" :key="image.id" class="col-6 mt-2">
                    <a @click="cargarImagenModal(image)" v-b-modal.modalImagen><img class="imageFotos" :src="image.image" alt=""></a>
                </div>
            </div>
            <div v-if="images.length > 6" class="row mt-2">
                <div class="col-12">
                    <router-link class="verTodas" :to="'/perfil/'+ user.id +'/fotos/'">Ver Todas ({{images.length}})</router-link>
                </div>
            </div>
            <div v-if="images.length < 1" class="row">
                <div class="col-12">
                    <small>Aún no has sido etiquetado en ninguna foto.</small>
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

import axios from 'axios'

export default {

    name: "MiPerfilMisFotos",



    data() {
        return {
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

    beforeCreate() {
        this.user = sessionStorage.getItem('user')
        this.user = JSON.parse(this.user)
        const path = "http://migueldev.pythonanywhere.com/api/v1.0/users/?email=" + this.user.email  + "&password=" + this.user.password
        axios.get(path).then((response) => {
            this.user.nombre = response.data[0].name
            this.user.apellido = response.data[0].surname
            this.user.foto = response.data[0].profile_pic
            this.user.visitas = response.data[0].visits
            this.user.invis = response.data[0].invitations
            this.user.id = response.data[0].id
        })
    },

    created() {
        this.getPhotos()
    },
    
    methods: {
        getPhotos(id) {
            const path = "http://migueldev.pythonanywhere.com/api/v1.0/photos/?uploaded_by=" + this.$route.params.id
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

        nuevoComentarioFoto() {
            const path = "http://migueldev.pythonanywhere.com/api/v1.0/commentphotos/"
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
            this.$emit('recarga')
        },

        cargarImagenModal(image) {
            const path2 = "http://migueldev.pythonanywhere.com/api/v1.0/commentphotos/?image=" + image.id 

            axios.get(path2).then((response) => {
                this.modal.respuestas = response.data
            }).catch((error) => {
                console.log("nada, nada de nada")
            })

            this.modal.imagen = image.image
            this.modal.id = image.id
            const path = "http://migueldev.pythonanywhere.com/api/v1.0/users/?id=" + image.uploaded_by
            axios.get(path).then((response) => {
                this.modal.subido_por = response.data[0].name + " " + response.data[0].surname
                this.modal.id_user = response.data[0].id
            })
        },
    }
}
</script>

<style scoped>

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
        background-color: white;
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