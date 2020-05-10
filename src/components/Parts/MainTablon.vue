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
            <div v-for="entrada in entradas" :key="entrada.id" class="row my-3">
                <div class="col-12" v-if="entrada.entrada">
                    <div v-if="entrada.entrada.comment && !estados" class="row">
                        <div class="col-12">
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
                                            <small>{{entrada.entrada.dateTime}}</small>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            {{entrada.entrada.comment}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-for="entrada in entradaEstados" :key="entrada.entrada.id" class="row my-3">
                <div v-if="entrada.entrada && estados" class="col-12">
                    <div class="row align-items-center">
                        <div class="col-12">
                            <div class="row align-items-center">
                                <div class="col-1">
                                    <img class="user_pic" :src="entrada.user.profile_pic">
                                </div>
                                <div class="col-auto">
                                    {{entrada.entrada.status_text}}
                                </div>
                                <div class="col-auto">
                                    {{entrada.entrada.dateTime}}
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
        }
    },

    created() {
        const path = "http://localhost:8000/api/v1.0/status/?user=" + this.$route.params.id
        const path2 = "http://localhost:8000/api/v1.0/commentsprofiles/?profile=" + this.$route.params.id
        axios.get(path).then((response) =>{
            this.entradaEstados = response.data
            setTimeout(() => {
                this.entradaEstados = this.completarArray(this.entradaEstados)
            }, 500);
        })
        axios.get(path2).then((response2) => {
            this.entradas = response2.data
            setTimeout(() => {
                this.entradas = this.completarArray(this.entradas)
            }, 500);
        })

    },

    methods: {
        completarArray(arr) {
            let aux = []
            for(let item of arr) {
                const path = "http://localhost:8000/api/v1.0/users/?id=" + item.user
                axios.get(path).then((response) => {
                    aux.push({"entrada": item, "user": response.data[0]})
                })
            }
            return aux
        },

        perfil(id) {
            //this.$router.replace('/perfil/'+ this.user.id)
            this.$router.push({name:"MiPerfil", params:{id: id}})
            this.$emit('recarga')
        },

        cambiarAEstados() {
            this.estados = true
        },

        cambiarAComentarios() {
            this.estados = false
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
    }
</style>