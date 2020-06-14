<template>
    <div class="row mt-4 ml-3 mr-3">
        <div class="col-12">
            <form @submit.prevent="nuevoEstado">
                <div class="row">
                    <div class="col-12">
                        <input v-model="nuevoEstadoTexto" class="w-100 input-estado" type="text" placeholder=" Actualiza tu estado"/>
                    </div>
                </div>
                <div class="row mt-2 justify-content-between">
                    <div class="col estado">
                        <p v-if="!tieneEstado" class="d-flex"><strong>Última actualizacion:&nbsp;</strong><MainPerfilEstado :id="user.id" @sinEstado="sinEstado"></MainPerfilEstado></p>
                    </div>
                    <div class="col-2 text-right">
                        <b-button type="submit" class="btn-guardarEstado" variant="primary">Guardar</b-button>
                    </div>
                </div>
            </form>
            <div class="row mt-4">
                <div class="col-12 border-bottom">
                    <h3>Novedades de tus amigos</h3>
                </div>
            </div>
            <div v-if="amigos.length == 0" class="row justify-content-center">
                <div class="col-12 text-center">
                    <img src="../../../static/arana.jpg">
                </div>
                <div class="col-12 text-center texto-veinti">
                    <h3>Todavía no tienes ningún amigo en Veinti. Comienza buscando a tus amigos.</h3>
                </div>
            </div>

            <div v-if="amigos.length != 0" class="row">
                <div class="col-12">
                    <div v-for="amigo in amigos" :key="amigo.key" class="row py-3 mt-3 border">
                        <div class="col-auto">
                            <img class="imagePerfil" :src="amigo.profile_pic">
                        </div>
                        <div class="col-auto">
                            <a @click="perfil(amigo.id)" class="enlace">{{amigo.name}} {{amigo.surname}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import MainPerfilEstado from '@/components/Parts/MainPerfilEstado.vue';
import axios from 'axios'

export default {

    created() {
        this.user = sessionStorage.getItem('user')
        this.user = JSON.parse(this.user)
        this.email = this.user.email
        this.getID(this.email)
        this.complete = true
        
    },

    components: {
        MainPerfilEstado,
    },

    data() {
        return {
            nuevoEstadoTexto: "",
            user: {
                id: "",
            },
            email: "",
            complete: false,
            tieneEstado: false,
            amigos: []
        }
    },

    methods: {
        nuevoEstado() {
            let newStatus = {
                status_text: this.nuevoEstadoTexto,
                dateTime: new Date().toISOString(),
                user: this.user.id
            }
            const path = "http://migueldev.pythonanywhere.com/api/v1.0/status/"
            axios.post(path, newStatus).then((response) => {
                this.$router.replace('/perfil/' + this.user.id)
            }).catch((error) => {
                console.log(error)
            })
        },

        perfil(id) {
            this.$router.push({name: "MiPerfil", params: {id: id}})
        },

        getAmigos() {
            const path = "http://migueldev.pythonanywhere.com/api/v1.0/friends/?user=" + this.user.id
            const path2 = "http://migueldev.pythonanywhere.com/api/v1.0/friends/?is_friend=" + this.user.id
            axios.all([axios.get(path), axios.get(path2)]).then((response) => {
                for(let amigo of response[0].data){
                    this.amigos.push(amigo.is_friend)
                }
                for(let amigo of response[1].data) {
                    this.amigos.push(amigo.user)
                }
            })
        },

        sinEstado() {
            this.tieneEstado = true;
        },

        getID(email) {
            const path = "http://migueldev.pythonanywhere.com/api/v1.0/users/?email=" + email
            axios.get(path).then((response) => {
                this.user.id = response.data[0].id
                this.getAmigos()
            })
        },
    }

}
</script>

<style scoped>
    .btn-guardarEstado {
        background-color: #5c8fba !important;
        border: none;
    }

    .texto-veinti {
        color: #5c8fba !important;
    }

    .enlace {
        color: #5c8fba !important;
        cursor: pointer;
    }

    .enlace:hover {
        text-decoration: underline;
    }

    .input-estado {
        height: 50px;
    }


    .estado {
        font-size: 14px;
        align-self: center;
    }

    .imagePerfil {
        height: 100px;
        width: 100px;
    }
</style>