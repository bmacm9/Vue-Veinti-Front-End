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
                    <a class="verTodas" href="#">Ver Todas ({{images.length}})</a>
                </div>
            </div>
            <div v-if="images.length < 1" class="row">
                <div class="col-12">
                    <small>Aún no has sido etiquetado en ninguna foto.</small>
                </div>
            </div>
        </div>
        <b-modal size="xl" cancel-disabled ok-disabled  id="modalImagen" title="Imagen">
            <template v-slot:default>
                <div  class="row modalImagen">
                    <div class="col-8 d-flex align-items-center justify-content-center">
                        <img class="imagen img-fluid" :src="modal.imagen" alt="">
                    </div>
                    <div class="col-4 border-left">
                        <div class="row h-100">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-12">
                                        por {{modal.subido_por}}
                                    </div>
                                </div>
                                <div class="row row-modal-comentarios align-items-end">
                                    <div class="col-12">

                                    </div>
                                </div>
                                <div class="row align-items-center row-modal-form pt-1">
                                    <div class="col-12">
                                        <form @submit.prevent="">
                                            <div class="row align-items-center">
                                                <div class="col-8">
                                                    <textarea class="w-100 pt" type="text" name="" id="" placeholder="Introduce aquí tu comentario..."></textarea>
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
                <b-button variant="outline-danger" @click="hide('forget')">
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
                imagen: "",
                subido_por: "",
            }
        }
    },

    created() {
        this.getPhotos()
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

        cargarImagenModal(image) {
            this.modal.imagen = image.image
            const path = "http://localhost:8000/api/v1.0/users/?id=" + image.uploaded_by
            axios.get(path).then((response) => {
                this.modal.subido_por = response.data[0].name + " " + response.data[0].surname
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

    a.enlaceAlbum, .enlaceAlbum *, .verTodas {
        color: #5c8fba !important;
    }

    .enlaceAlbum:hover {
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
        height: 15% !important;
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