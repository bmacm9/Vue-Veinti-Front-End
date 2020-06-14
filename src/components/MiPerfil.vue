<template>
    <div class="row w-100 row-perfil m-0">
        <div class="col-12 pl-0">
            <div class="row">
                <div class="col-12 pr-0">
                    <Navbar ref="navbar" @recarga="recargar"></Navbar>
                </div>
            </div>
            <div v-if="(complete && sonAmigos) || esMiPerfil" class="row">
                <div class="col-12 col-md-6 col-xl-3 ">
                    <MiPerfilSidebar v-if="recarga" class="h-100" :user="user"></MiPerfilSidebar>
                </div>
                <div class="col-12 col-md-6 ">
                    <MiPerfilMain @recarga="recargar" v-if="recarga" :user="user"></MiPerfilMain>
                </div>
                <div class="col-12 col-xl-3 w-100">
                    <MiPerfilDerecha @recarga="recargar" v-if="recarga" :user="user"></MiPerfilDerecha>
                </div>
            </div>
            <div v-if="((complete && !sonAmigos) && !esMiPerfil) && !borrar" class="row mt-5">
                <div class="col-12">
                    <div class="container">
                        <div class="row">
                            <div class="col-auto">
                                <img class="imagenPerfil" :src="user.profile_pic">
                            </div>
                            <div class="col-auto">
                                <div class="row">
                                    <div class="col-12 enlace">
                                        {{user.nombre}} {{user.apellido}}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <small>Actualmente {{user.nombre}} {{user.apellido}} y tú no sois amigos
                                        ¡Mándale una petición de amistad y empieza a contactar con {{user.nombre}}.</small>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div v-if="!yaMandada" class="col-auto">
                                        <b-button @click="mandarPeticion()" size="sm" variant="outline-primary">Enviar petición de amistad</b-button>
                                    </div>
                                    <div v-if="yaMandada" class="col-auto">
                                        <b-button @click="cancelarPeticion()" size="sm" variant="outline-danger">Borrar petición de amistad</b-button>
                                    </div>
                                    <div v-if="yaMandada" class="col-auto mt-1">
                                        <p class="text-warning">Esperando a que {{user.nombre}} acepte su petición.</p>
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
import MiPerfilSidebar from '@/components/Parts/MiPerfilSidebar.vue'
import MiPerfilMain from '@/components/Parts/MiPerfilMain.vue'
import MiPerfilDerecha from '@/components/Parts/MiPerfilDerecha.vue'
import axios from 'axios'
import Vue from 'vue'

export default {

    beforeCreate() {     
        if(sessionStorage.getItem('user') == undefined) {
            document.body.style = "background-color: #5284b5 !important"
            this.$router.push({name: "Principal"})
        }   

        
        const path = "http://migueldev.pythonanywhere.com/api/v1.0/users/?id=" + this.$route.params.id
        axios.get(path).then((response) => {
            this.user.nombre = response.data[0].name
            this.user.apellido = response.data[0].surname
            this.user.foto = response.data[0].profile_pic
            this.user.visitas = response.data[0].visits
            this.user.invis = response.data[0].invitations
            this.user.genero = response.data[0].gender
            this.user.nacimiento = response.data[0].born
            this.user.estadoCivil = response.data[0].civilStatus
            this.user.email = response.data[0].email
            this.user.id = response.data[0].id
            this.user.profile_pic = response.data[0].profile_pic

            setTimeout(() => {

                this.miPerfil()
                
                if(this.$refs.navbar.user.id != this.$route.params.id) {
                    const path2 = "http://migueldev.pythonanywhere.com/api/v1.0/friends/?user=" + this.$route.params.id + "&is_friend=" + this.$refs.navbar.user.id
                    const path3 = "http://migueldev.pythonanywhere.com/api/v1.0/friends/?user=" + this.$refs.navbar.user.id + "&is_friend=" + this.$route.params.id
                    axios.all([axios.get(path2), axios.get(path3)]).then((response) => {
                        for(let respuesta of response) {
                            if(respuesta.data.length != 0) {
                                this.sonAmigos = true
                            }
                        }
                        if(!this.sonAmigos) {
                            this.existePeticion()
                        }
                    })
                }
            }, 10);
        })
    },

    mounted() {
        
    },

    data() {
        return {
            user: {
                nombre: "",
                apellido: "",
                foto: "",
                visitas: "",
                invis: "",
                genero: "",
                nacimiento: "",
                estadoCivil: "",
                email: "",
                id: "",
                profile_pic: ""
            },
            complete: false,
            recarga: true,
            sonAmigos: false,
            esMiPerfil: false,
            yaMandada: false,
            idPeticionMandada: "",
            borrar: false
        }
    },

    methods: {
        recargar() {
            if(this.$refs.navbar.user.id != this.$route.params.id)
                this.$refs.navbar.addVisit()
                const path = "http://migueldev.pythonanywhere.com/api/v1.0/users/?id=" + this.$route.params.id
                axios.get(path).then((response) => {
                    this.user.nombre = response.data[0].name
                    this.user.apellido = response.data[0].surname
                    this.user.foto = response.data[0].profile_pic
                    this.user.visitas = response.data[0].visits
                    this.user.invis = response.data[0].invitations
                    this.user.genero = response.data[0].gender
                    this.user.nacimiento = response.data[0].born
                    this.user.estadoCivil = response.data[0].civilStatus
                    this.user.email = response.data[0].email
                    this.user.id = response.data[0].id
                    this.esMiPerfil = true
                })
            this.recarga = false
            setTimeout(() => {
                this.recarga = true
            }, 1);
        },

        miPerfil() {
            if(this.$refs.navbar.user.id == this.$route.params.id) {
                this.esMiPerfil = true
            }
        },

        existePeticion () {
            const path = "http://migueldev.pythonanywhere.com/api/v1.0/friendrequest/?user=" + this.$refs.navbar.user.id + "&send_to=" + this.$route.params.id
            axios.get(path).then((response) => {
                if(response.data.length != 0) {
                    this.yaMandada = true
                    this.idPeticionMandada = response.data[0].id
                }
            })
        },

        mandarPeticion() {
            const path = "http://migueldev.pythonanywhere.com/api/v1.0/friendrequest/"
            let contenido = {
                user: this.$refs.navbar.user.id,
                send_to: this.$route.params.id,
            }
            axios.post(path, contenido).then((response) => {
                this.borrar = true
                setTimeout(() => {
                    this.crear()
                    this.borrar = false
                }, 1);
            }).catch((error) => {
                console.log(error)
            })
        },

        cancelarPeticion() {
            const path = "http://migueldev.pythonanywhere.com/api/v1.0/friendrequest/" + this.idPeticionMandada + "/"
            axios.delete(path).then((response) => {
                this.borrar = true
                setTimeout(() => {
                    this.crear()
                    this.yaMandada = !this.yaMandada
                    this.borrar = false
                }, 20);
            }).catch((error) => {
                console.log(error)
            })
        },

        crear() {
            const path = "http://migueldev.pythonanywhere.com/api/v1.0/users/?id=" + this.$route.params.id
            axios.get(path).then((response) => {
                this.user.nombre = response.data[0].name
                this.user.apellido = response.data[0].surname
                this.user.foto = response.data[0].profile_pic
                this.user.visitas = response.data[0].visits
                this.user.invis = response.data[0].invitations
                this.user.genero = response.data[0].gender
                this.user.nacimiento = response.data[0].born
                this.user.estadoCivil = response.data[0].civilStatus
                this.user.email = response.data[0].email
                this.user.id = response.data[0].id
                this.user.profile_pic = response.data[0].profile_pic

                setTimeout(() => {

                    this.miPerfil()
                    
                    if(this.$refs.navbar.user.id != this.$route.params.id) {
                        const path2 = "http://migueldev.pythonanywhere.com/api/v1.0/friends/?user=" + this.$route.params.id + "&is_friend=" + this.$refs.navbar.user.id
                        const path3 = "http://migueldev.pythonanywhere.com/api/v1.0/friends/?user=" + this.$refs.navbar.user.id + "&is_friend=" + this.$route.params.id
                        axios.all([axios.get(path2), axios.get(path3)]).then((response) => {
                            for(let respuesta of response) {
                                if(respuesta.data.length != 0) {
                                    this.sonAmigos = true
                                }
                            }
                            if(!this.sonAmigos) {
                                this.existePeticion()
                            }
                        })
                    }
                }, 10);
            })
        }
    },

    mounted() {
        this.complete = true;
    },

    created() {
        
    },

    components: {
        Navbar,
        MiPerfilSidebar,
        MiPerfilMain,
        MiPerfilDerecha,
    },
}
</script>

<style scoped>
    .row-perfil {
        width: 100vw;
    }

    .imagenPerfil {
        width: 200px !important;
        height: 200px !important;
    }

    .enlace {
        color: #5c8fba !important;
    }

    .enlace:hover {
        text-decoration: underline;
        cursor: pointer;
    }
</style>