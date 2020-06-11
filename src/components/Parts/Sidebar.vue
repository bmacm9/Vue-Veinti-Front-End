<template>
    <div class="row total">
        <div class="col-12">
            <div class="row mt-4 justify-content-end">
                <div class="col-11 bg-white cajaPerfil">
                    <div class="row info-row-perfil pt-2 pb-2">
                        <div class="col-2 p-0">
                            <router-link to="/mi-perfil"><img class="imagenPerfil" :src="user.foto"/></router-link>
                        </div>
                        <div class="col-10">
                            <div class="row">
                                <div class="col-12 nombrePerfil">
                                    <router-link to="/mi-perfil">{{user.nombre}} {{user.apellido}}</router-link>
                                </div>
                            </div>
                            <div class="row mt-1">
                                <div class="col-12 visitas">
                                    <i class="far fa-chart-bar"></i><strong> {{user.visitas}} </strong> visitas a tu perfil
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="notificaciones row" v-if="notificaciones.peticion != '' || notificaciones.foto != '' || notificaciones.evento != ''">
                        <div class="notificacion col-12" v-if="notificaciones.peticion != ''">
                            <a><i class="fas fa-user-plus"></i> {{notificaciones.peticion}} petición de amistad</a>
                        </div>
                        <div class="notificacion col-12" v-if="notificaciones.foto != ''">
                            <a><i class="fas fa-tag"></i> {{notificaciones.foto}} etiquetas</a>
                        </div>
                        <div class="notificacion col-12" v-if="notificaciones.evento != ''">
                            <a><i class="far fa-calendar-alt"></i> {{notificaciones.evento}} invitaciones a evento</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3 justify-content-end">
                <div class="col-11">
                    <div class="row row-invitar-title">
                        <div class="col-12">
                            <h3 class="invitar-title">Invitar a tus amigos</h3>
                        </div>
                    </div>
                    <div class="row row-invitaciones mt-2">
                        <div class="col-12">
                            <p class="invitaciones">{{user.invis}} invitaciones</p>
                        </div>
                    </div>
                    <form @submit.prevent="enviarInvi" class="row row-invitar-form pb-3">
                        <div class="col-7 pr-0">
                            <input required class="w-100" type="email" placeholder="E-mail" name="email"/>
                        </div>
                        <div class="col-5">
                            <b-button class="btn-invitar" variant="primary" size="sm" type="submit">Invitar</b-button>
                        </div>
                        <div v-if="enviada" class="col-12 pl-0 mt-3 bg-success w-100">
                            <p class="w-100 text-white">Mandale a tu amigo el enlace: <a class="w-100">http://localhost:8080/invitacion/{{id_peticion}}</a></p>  
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
    
    props: {
        user: Object,
    },

    data() {
        return {
            visitas: "",
            nombre: "",
            apellido: "",
            visitas: "",
            foto: "",
            invis: "",
            notificaciones: {
                peticion: "2",
                foto: "3",
                evento: "2",
            },
            enviada: false,
            id_peticion: ""
        }
    },

    computed: {
        
    },

    methods: {
        enviarInvi() {
            this.id_peticion = this.makeid(5)
            const path = "http://localhost:8000/api/v1.0/invitation/"
            let datos = {
                code: this.id_peticion,
                user: this.user.id
            }
            axios.post(path, datos).then((response) => {
                const path2 = "http://localhost:8000/api/v1.0/users/" + this.user.id + "/"
                let datos2 = {invitations: this.user.invis-1}
                console.log(datos2)
                console.log(this.user.invis-1)
                axios.patch(path2, datos2).then((response2) => {
                    console.log("exito")
                }).catch((error2) => {
                    console.log(error2)
                })
            }).catch((error) => {
                console.log(error)
            })
            this.enviada = true
        },

        makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
    },

}
</script>

<style scoped>
    .total {
        background-color: #f5f5f5;
        padding: 0 !important;
        border-left: 2px solid #e7e7e7;
    }
    
    .cajaPerfil {
        border-top: 2px solid #e7e7e7;
        border-bottom: 2px solid #e7e7e7;
        border-left: 2px solid #e7e7e7;
        box-shadow: 0 4px 2px -2px gray;
    }

    .nombrePerfil a, .fa-chart-bar {
        color: #4a6fa2;
        font-weight: 600;
    }

    .info-row-perfil {
        margin: 5px 0;
    }

    .visitas {
        font-size: 14px;
    }

    .imagenPerfil {
        border: 2px solid #e7e7e7;
        width: 40px;
        height: 40px;
    }

    .notificaciones {
        border-top: 2px solid #e7e7e7;
        padding-top: 10px;
        margin: 0 2px;
        padding-bottom: 5px;
    }

    .notificacion a {
        color: #89a16a !important;
        font-weight: 600;
        font-size: 13px;
    }

    .notificacion a:hover {
        text-decoration: underline;
    }

    .invitar-title {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 2px;
    }

    .row-invitar-title {
        margin-right: 10px;
        border-bottom: 2px solid #e7e7e7;
    }

    .invitaciones {
        font-size: 12px;
        color:#929598;
        margin-bottom: 0 !important;
    }

    .btn-invitar {
        background-color: #5c8fba !important;
        width: 100%;
        border: none;
    }
</style>


