<template>
    <div v-if="aux" class="row mt-5">
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
            <div v-if="!respuesta" class="row">
                <div class="col-12">
                    <form @submit.prevent="nuevoMensajePerfil" method="POST" class="row estado border align-items-center">
                        <div class="col-1">
                            <img class="user_pic" :src="user.profile_pic">
                        </div>
                        <div class="col-10">
                            <textarea v-model="textArea" class="w-100" name="" id="" rows="3"></textarea>
                        </div>
                        <div class="col-1">
                            <b-button type="submit" variant="primary" size="sm">Enviar</b-button>
                        </div>
                    </form>
                </div>
            </div>
            <div v-if="entradasTotales.length <= 0" class="row">
                <div class="col-12">
                    <small>Vaya... Parece que todavía no hay nada publicado por aquí.</small>
                </div>
            </div>
            <div v-for="entrada in sortedTotales" :key="entrada.id" class="row">
                <div v-if="entrada && !Array.isArray(entrada)" class="col-12">
                    <div v-if="entrada.comment && !estados && !entrada.status" class="row mt-3">
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
                                <div @click="comentar" class="col-auto enlace_perfil">
                                    comentar
                                </div>
                                <div v-if="respuesta" class="col-auto p-0">
                                    |
                                </div>
                                <div @click="eliminarComentario(entrada.id)" v-if="respuesta" class="col-auto text-danger eliminar">
                                    eliminar
                                </div>
                            </div>
                            <form @submit.prevent="enviarRespuestaComentario($event, entrada.id)" class="row"></form>
                        </div>
                    </div>
                </div>
                <div v-if="Array.isArray(entrada) && typeof entrada[0].commentProfile != 'undefined'" class="col-12">
                    <div v-if="entrada[0].commentProfile.comment && !estados && !entrada[0].commentProfile.status" class="row mt-3 border-bottom">
                        <div class="col-12">
                            <div class="row align-items-center">
                                <div class="col-1">
                                    <img class="user_pic" :src="entrada[0].commentProfile.user.profile_pic">
                                </div>
                                <div class="col">
                                    <div class="row">
                                        <div class="col-auto">
                                            <a @click="perfil(entrada[0].commentProfile.user.id)" class="enlace_perfil">{{entrada[0].commentProfile.user.name}} {{entrada[0].commentProfile.user.surname}}</a>
                                        </div>
                                        <div class="col-auto">
                                            <small>{{entrada[0].commentProfile.dateTime}}</small>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-12">
                                            {{entrada[0].commentProfile.comment}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div @click="comentar" class="col-auto enlace_perfil">
                                    comentar
                                </div>
                                <div v-if="respuesta" class="col-auto p-0">
                                    |
                                </div>
                                <div @click="eliminarComentario(entrada[0].commentProfile.id)" v-if="respuesta" class="col-auto text-danger eliminar">
                                    eliminar
                                </div>
                            </div>
                            
                                <form @submit.prevent="enviarRespuestaComentario($event, entrada[0].commentProfile.id)" class="row"></form>
                            
                        </div>
                        <div class="col-12">
                            <div v-for="objeto in entrada" :key="objeto.id" class="col-12 justify-content-center my-3">
                                <div class="row">
                                    <div class="col-11">
                                        <div class="row">
                                            <div class="col-1">
                                                <img :src="objeto.user.profile_pic" class="user_pic"/>
                                            </div>
                                            <div class="col">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <a class="enlace_perfil" @click="perfil(objeto.user.id)">{{objeto.user.name}} {{objeto.user.surname}}</a> <small>{{objeto.dateTime}}</small>
                                                    </div>
                                                    <div class="col-12">
                                                        {{objeto.reply}}
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
            </div>
            <div v-for="entrada in sortedTotales" :key="entrada.id" class="row">
                <div v-if="entrada && estados" class="col-12">
                    <div v-if="entrada.comment && entrada.status" class="row estado">
                        <div class="col-12 border-bottom">
                            <div class="row align-items-start my-3">
                                <div class="col-1">
                                    <img class="user_pic" :src="entrada.status.user.profile_pic">
                                </div>
                                <div class="col-11">
                                    <div class="row">
                                        <div class="col-auto">
                                            {{entrada.status.status_text}}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-auto">
                                            {{entrada.status.dateTime}}
                                        </div>
                                        <div @click="comentar" class="col-auto enlace_perfil">
                                            comentar
                                        </div>
                                        <div v-if="respuesta" class="col-auto p-0">
                                            |
                                        </div>
                                        <div @click="eliminarEstado(entrada.id)" v-if="respuesta" class="col-auto text-danger eliminar">
                                            eliminar
                                        </div>
                                    </div>
                                    <div class="row justify-content-center mt-4">
                                        <div class="col-11">
                                            <div class="row">
                                                <div class="col-auto">
                                                    <img :src="entrada.user.profile_pic" class="user_pic"/>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="row">
                                                        <div class="col-12">
                                                            {{entrada.comment}}
                                                        </div>
                                                        <div class="col-12">
                                                            {{entrada.dateTime}}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <form class="row" @submit.prevent="enviarRespuestaEstado($event, entrada.id)"></form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="entrada.status_text" class="row estado">
                        <div class="col-12 border-bottom">
                            <div class="row align-items-start my-3">
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
                                        <div @click="comentar" class="col-auto enlace_perfil">
                                            comentar
                                        </div>
                                        <div v-if="respuesta" class="col-auto p-0">
                                            |
                                        </div>
                                        <div @click="eliminarEstado(entrada.id)" v-if="respuesta" class="col-auto text-danger eliminar">
                                            eliminar
                                        </div>
                                    </div>
                                    
                                    <form class="row" @submit.prevent="enviarRespuestaEstado($event, entrada.id)"></form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row estado" v-if="Array.isArray(entrada) && typeof entrada[0].commentProfile === 'undefined'">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-12 border-bottom">
                                    <div class="row align-items-start my-3">
                                        <div class="col-1">
                                            <img class="user_pic" :src="user.profile_pic">
                                        </div>
                                        <div class="col-11">
                                            <div class="row">
                                                <div class="col-auto">
                                                    {{entrada[0].status.status_text}}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-auto">
                                                    {{entrada[0].status.dateTime}}
                                                </div>
                                                <div @click="comentar" class="col-auto enlace_perfil">
                                                    comentar
                                                </div>
                                                <div v-if="respuesta" class="col-auto p-0">
                                                    |
                                                </div>
                                                <div @click="eliminarEstado(entrada[0].status.id)" v-if="respuesta" class="col-auto text-danger eliminar">
                                                    eliminar
                                                </div> 
                                            </div>
                                            
                                            <form class="row" @submit.prevent="enviarRespuestaEstado($event, entrada[0].status.id)"></form>
                                        </div>
                                    </div>
                                    <div class="row justify-content-center">
                                        <div v-for="comentario in entrada" :key="comentario.id" class="col-11 mb-3">
                                            <div class="row">
                                                <div class="col-auto">
                                                    <img :src="comentario.user.profile_pic" class="user_pic">
                                                </div>
                                                <div class="col-10">
                                                    <div class="row">
                                                        <div class="col-auto">
                                                            {{comentario.comment}}
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-auto">
                                                            {{comentario.dateTime}}
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
                </div>
            </div>
            <div v-if="entradasTotales.length > 0" class="row my-3 justify-content-between">
                <div @click="disminuirPagina" class="col-auto btn text-primary">
                    <b>&lt;&lt;</b>
                </div>
                <div @click="aumentarPagina" class="col-auto btn text-primary">
                    <b>&gt;&gt;</b>
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
            respuesta: false,
            user: Object,
            textArea: "",
            pagina: 1,
            aux: false
        }
    },

    beforeCreate() {
        var thisUser = sessionStorage.getItem('user')
        thisUser = JSON.parse(thisUser)
        const path = "http://localhost:8000/api/v1.0/users/?email=" + thisUser.email + "&password=" + thisUser.password
        axios.get(path).then((response) => {
            this.user = response.data[0]
            if(response.data[0].id == this.$route.params.id) {
                this.respuesta = true
            }
            else this.respuesta = false
        }).catch(() => {
            console.log("ERROR")
        })
    },

    created() {
        this.cargarTablon()
    },

    computed: {
        sortedTotales() {
            return this.entradasTotales.slice().sort((a, b) => {
                if(Array.isArray(a) && Array.isArray(b)) {
                    if(typeof a[0].status == 'undefined' && typeof b[0].status == 'undefined') {
                        return new Date(b[0].commentProfile.dateTime) - new Date(a[0].commentProfile.dateTime)
                    } else if (typeof a[0].status == 'undefined') {
                        return new Date(b[0].status.dateTime) - new Date(a[0].commentProfile.dateTime)
                    } else if  (typeof b[0].status == 'undefined') {
                        return new Date(b[0].commentProfile.dateTime) - new Date(a[0].status.dateTime)
                    } else {
                        return new Date(b[0].status.dateTime) - new Date(a[0].status.dateTime)
                    }
                }
                else if(Array.isArray(a)) {
                    if(typeof a[0].status == 'undefined') {
                        return new Date(b.dateTime) - new Date(a[0].commentProfile.dateTime)
                    } else {
                        return new Date(b.dateTime) - new Date(a[0].status.dateTime)
                    }
                }
                else if(Array.isArray(b)) {
                    if(typeof b[0].status == 'undefined') {
                        return new Date(b[0].commentProfile.dateTime) - new Date(a.dateTime)
                    } else {
                        return new Date(b[0].status.dateTime) - new Date(a.dateTime)
                    }
                }
                else {
                    return new Date(b.dateTime) - new Date(a.dateTime)
                }
            })
        }
    },

    methods: {
        cargarTablon(tipo="decremento") {
            this.aux = false;
            this.entradasTotales = []
            const path = "http://localhost:8000/api/v1.0/status/?user=" + this.$route.params.id
            const path2 = "http://localhost:8000/api/v1.0/commentsprofiles/?profile=" + this.$route.params.id + "&page=" + this.pagina
            axios.all([axios.get(path), axios.get(path2)]).then((response) => {
                
                for(let devuelve of response) {
                    for(let objeto of devuelve.data.results) {
                        if(objeto.hasAnswers != "no"){
                            if(objeto.status_text){
                                var path3 = "http://localhost:8000/api/v1.0/commentstatus/?status=" + objeto.id
                                axios.get(path3).then((response2) => {
                                    let arrayConRespuestas = []
                                    for(let statusWithAnswers of response2.data){
                                        arrayConRespuestas.push(statusWithAnswers)
                                    }
                                    this.entradasTotales.push(arrayConRespuestas)
                                })
                            } else {
                                var path3 = "http://localhost:8000/api/v1.0/replycomment/?commentProfile=" + objeto.id
                                axios.get(path3).then((response2) => {
                                    let arrayConRespuestas = []
                                    for(let statusWithAnswers of response2.data){
                                        arrayConRespuestas.push(statusWithAnswers)
                                    }
                                    this.entradasTotales.push(arrayConRespuestas)
                                })
                            }
                        } else {
                            this.entradasTotales.push(objeto)
                        }
                    }
                }
            }).catch((error) => {
                if(tipo == "decremento") {
                    this.pagina++
                    this.cargarTablon("aumento")
                }
                else {
                    this.pagina--
                    this.cargarTablon("decremento")
                }
            }).finally(() => {
                this.aux = true
            })
        },

        perfil(id) {
            if(id != this.$route.params.id)
                this.$router.push({name:"MiPerfil", params:{id: id}})
            this.$emit('recarga')
        },

        cambiarAEstados() {
            this.pagina = 1
            this.estados = true
            this.totales = false
            this.cargarTablon()
        },

        cambiarAComentarios() {
            this.pagina = 1
            this.estados = false
            this.totales = false
            this.cargarTablon()
        },
        
        nuevoMensajePerfil() {
            const path = "http://localhost:8000/api/v1.0/commentsprofiles/"
            let comentario = {
                "user": this.user.id,
                "comment": this.textArea, 
                "dateTime": new Date().toISOString(), 
                "profile": this.$route.params.id 
            }
            axios.post(path, comentario).then((response) => {
                this.perfil(this.$route.params.id)
            }).catch((error) => {
                console.log("ERROOOOOOR")
            })
        },

        comentar(evt) {
            if(evt.currentTarget.parentNode.parentNode.lastChild.childElementCount == 0) {
                var contenedor = document.createElement("div")
                contenedor.className = "col-11 mt-3"
                var input = document.createElement("textarea")
                input.className = "w-100"
                input.style = "resize: none;"
                input.placeholder = "Escribe aquí tu comentario"
                var button = document.createElement("button")
                button.type = "submit"
                button.innerText = "Enviar"
                var contenedorBotton = document.createElement("div")
                contenedorBotton.className = "col-1 p-0 mt-3"
                button.className = "btn btn-sm btn-outline-secondary"
                contenedor.append(input)
                contenedorBotton.append(button)
                evt.currentTarget.parentNode.parentNode.lastChild.append(contenedor)
                evt.currentTarget.parentNode.parentNode.lastChild.append(contenedorBotton)
            } else {
                evt.currentTarget.parentNode.parentNode.lastChild.innerHTML = ""
            }
        },

        eliminarEstado(id) {
            const path = "http://localhost:8000/api/v1.0/status/" + id + "/"
            axios.delete(path).then((response) => {
                this.perfil(this.$route.params.id)
            }).catch((error) => {
                console.log(error)
            })
        },

        eliminarComentario(id) {
            const path = "http://localhost:8000/api/v1.0/commentsprofiles/" + id + "/"
            axios.delete(path).then((response) => {
                this.perfil(this.$route.params.id)
            }).catch((error) => {
                console.log(error)
            })
        },

        enviarRespuestaComentario(event, id) {
            const path = "http://localhost:8000/api/v1.0/replycomment/"
            const path2 = "http://localhost:8000/api/v1.0/commentsprofiles/" + id + "/"
            var insertar = {
                reply: event.target.firstChild.firstChild.value,
                dateTime: new Date().toISOString(),
                user: this.user.id,
                commentProfile: id,
            }
            axios.post(path, insertar).then((response) => {
            }).catch((error) => {
                console.log("error1", error)
            })

            axios.patch(path2, { hasAnswers: "yes" }).then((response2) => {
            }).catch((error) => {
                console.log("error2", error)
            })
            
            this.perfil(this.$route.params.id)
        },

        enviarRespuestaEstado(event, id) {
            const path = "http://localhost:8000/api/v1.0/commentstatus/"
            const path2 = "http://localhost:8000/api/v1.0/status/" + id + "/"
            var insertar = {
                comment: event.target.firstChild.firstChild.value,
                dateTime: new Date().toISOString(),
                user: this.user.id,
                status: id,
            }
            axios.post(path, insertar).then((response) => {
            }).catch((error) => {
                console.log("error1", error)
            })

            axios.patch(path2, { hasAnswers: "yes" }).then((response2) => {
            }).catch((error) => {
                console.log("error2", error)
            })
            
            this.perfil(this.$route.params.id)
        },

        disminuirPagina() {
            this.pagina--
            this.cargarTablon("decremento")
        },

        aumentarPagina() {
            this.pagina++
            this.cargarTablon("aumento")
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

    .eliminar:hover {
        text-decoration: underline;
        cursor: pointer;
    }
</style>