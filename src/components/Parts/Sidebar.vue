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
                    <form class="row row-invitar-form">
                        <div class="col-7 pr-0">
                            <input class="w-100" type="email" placeholder="E-mail" name="email"/>
                        </div>
                        <div class="col-5">
                            <b-button class="btn-invitar" variant="primary" size="sm" type="submit">Invitar</b-button>
                        </div>
                    </form>
                    <div class="row row-invitar-title mt-3">
                        <div class="col-12">
                            <h3 class="invitar-title">Eventos patrocinados</h3>
                        </div>
                    </div>
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
            }
        }
    },
    mounted() {

    }

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


