<template>
    <div class="row mt-5">
        <div class="col-12">
            <div class="row justify-content-between align-items-center border-bottom">
                <div class="col">
                    <h3>Tablón</h3>
                </div>
                <div class="col">
                    <div class="row justify-content-end">
                        <div class="col-auto">
                            <p clasS="text-secondary">Mostrar</p>
                        </div>
                        <div @click="cambiarATotales" class="col-auto enlace_perfil">
                            Total
                        </div>
                        <div class="col-auto p-0">
                            |
                        </div>
                        <div @click="cambiarAComentarios" class="col-auto enlace_perfil">
                            Comentarios
                        </div>
                        <div class="col-auto p-0">
                            |
                        </div>
                        <div @click="cambiarAEstados" class="col-auto enlace_perfil">
                            Estados
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!respuesta" class="row">
                <div class="col-12">
                    <form class="row estado border align-items-center">
                        <div class="col-1">
                            <img class="user_pic" :src="user.profile_pic">
                        </div>
                        <div class="col-10">
                            <textarea class="w-100" name="" id="" rows="3"></textarea>
                        </div>
                        <div class="col-1">
                            <button>Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div v-if="totales" class="row">
                <div class="col-12">
                    <div v-for="entrada in sortedTotales" :key="entrada.id" class="row">
                        <div class="col-12">
                            <div v-if="entrada.status_text" class="row estado">
                                <div class="col-12 border-bottom">
                                    <div class="row align-items-center my-3">
                                        <div class="col-1">
                                            <img class="user_pic" :src="entrada.user.profile_pic">
                                        </div>
                                        <div class="col-11">
                                            <div class="row">
                                                <div class="col-auto">
                                                    {{entrada.status_text}}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-auto">
                                                    {{entrada.dateTime}}
                                                </div>
                                                <div class="col-auto enlace_perfil">
                                                    comentar
                                                </div>
                                                <div v-if="respuesta" class="col-auto p-0">
                                                    |
                                                </div>
                                                <div v-if="respuesta" class="col-auto text-danger">
                                                    eliminar
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="!entrada.status_text" class="row">
                                <div class="col-12">
                                    <div v-if="entrada.comment && !estados" class="row mt-3">
                                        <div class="col-12 border-bottom pb-3">
                                            <div class="row align-items-center">
                                                <div class="col-1">
                                                    <img class="user_pic" :src="entrada.user.profile_pic">
                                                </div>
                                                <div class="col">
                                                    <div class="row">
                                                        <div class="col-auto">
                                                            <a @click="perfil(entrada.user.id)" class="enlace_perfil">{{entrada.user.name}} {{entrada.user.surname}}</a>
                                                        </div>
                                                        <div class="col-auto">
                                                            <small>{{entrada.dateTime}}</small>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-2">
                                                        <div class="col-12">
                                                            {{entrada.comment}}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-auto enlace_perfil">
                                                    comentar
                                                </div>
                                                <div v-if="respuesta" class="col-auto p-0">
                                                    |
                                                </div>
                                                <div v-if="respuesta" class="col-auto text-danger">
                                                    eliminar
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-for="entrada in entradas" :key="entrada.id" class="row">
                <div v-if="entrada && !totales" class="col-12">
                    <div v-if="entrada.comment && !estados" class="row mt-3">
                        <div class="col-12 border-bottom pb-3">
                            <div class="row align-items-center">
                                <div class="col-1">
                                    <img class="user_pic" :src="entrada.user.profile_pic">
                                </div>
                                <div class="col">
                                    <div class="row">
                                        <div class="col-auto">
                                            <a @click="perfil(entrada.user.id)" class="enlace_perfil">{{entrada.user.name}} {{entrada.user.surname}}</a>
                                        </div>
                                        <div class="col-auto">
                                            <small>{{entrada.dateTime}}</small>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-12">
                                            {{entrada.comment}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-auto">
                                    comentar
                                </div>
                                <div v-if="respuesta" class="col-auto p-0">
                                    |
                                </div>
                                <div v-if="respuesta" class="col-auto">
                                    eliminar
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-for="entrada in entradaEstados" :key="entrada.id" class="row">
                <div v-if="entrada && estados && !totales" class="col-12">
                    <div v-if="entrada.status_text" class="row estado">
                        <div class="col-12 border-bottom">
                            <div class="row align-items-center my-3">
                                <div class="col-1">
                                    <img class="user_pic" :src="entrada.user.profile_pic">
                                </div>
                                <div class="col-11">
                                    <div class="row">
                                        <div class="col-auto">
                                            {{entrada.status_text}}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-auto">
                                            {{entrada.dateTime}}
                                        </div>
                                        <div class="col-auto">
                                            comentar
                                        </div>
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

import axios from 'axios'

export default {

    data() {
        return {
            entradas: [],
            entradaEstados: [],
            estados: false,
            entradasTotales: [],
            totales: true,
            respuesta: false,
            user: Object,
        }
    },

    beforeCreate() {
        var thisUser = sessionStorage.getItem('user')
        thisUser = JSON.parse(thisUser)
        const path = "http://localhost:8000/api/v1.0/users/?email=" + thisUser.email + "&password=" + thisUser.password
        axios.get(path).then((response) => {
            this.user = response.data[0]
            console.log(this.user)
            if(response.data[0].id == this.$route.params.id) {
                this.respuesta = true
            }
            else this.respuesta = false
        }).catch(() => {
            console.log("ERROR")
        })
    },

    created() {
        const path = "http://localhost:8000/api/v1.0/status/?user=" + this.$route.params.id
        const path2 = "http://localhost:8000/api/v1.0/commentsprofiles/?profile=" + this.$route.params.id
        axios.get(path).then((response) =>{
            for (let entrada of response.data) {
                this.entradaEstados.push(entrada)
                this.entradasTotales.push(entrada)
            }
        })
        axios.get(path2).then((response2) => {
            for (let entrada of response2.data) {
                this.entradas.push(entrada)
                this.entradasTotales.push(entrada)
            }
        })
        this.entradasTotales.sort(function(a, b) {
            return new Date(a.dateTime) - new Date(b.dateTime)
        })
    },

    computed: {
        sortedTotales() {
            return this.entradasTotales.slice().sort((a, b) => {
                return new Date(b.dateTime) - new Date(a.dateTime)
            })
        }
    },

    methods: {

        perfil(id) {
            this.$router.push({name:"MiPerfil", params:{id: id}})
            this.$emit('recarga')
        },

        cambiarAEstados() {
            this.estados = true
            this.totales = false
        },

        cambiarAComentarios() {
            this.estados = false
            this.totales = false
        },

        cambiarATotales() {
            this.estados = false
            this.totales = true
        }
    },

}
</script>

<style scoped>
    .user_pic {
        height: 60px;
        width: 60px;
    }

    .enlace_perfil {
        color: #356ac0;
    }

    .enlace_perfil:hover {
        cursor: pointer;
        color: #36536b;
        text-decoration: underline;
    }

    .estado {
        background-color: #f1f1f1 !important;
    }

</style>