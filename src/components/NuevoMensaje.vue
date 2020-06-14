<template>
    <div class="row w-100">
        <div class="col-12 pr-0">
            <div class="row">
                <div class="col-12 pr-0">
                    <Navbar ref="navbar"></Navbar>
                </div>
            </div>

            <div class="row mt-3 w-100 border-bottom">
                <div class="col-auto">
                    <h3 class="ml-3">Enviar mensaje</h3>
                </div>
            </div>

            <div class="row bg-success">
                <div v-if="enviado" class="col-12 text-white">
                    Mensaje enviado con éxito
                </div>
            </div>

            <div v-if="amigos.length == 0" class="row mt-5">
                <div class="col-12 text-center">
                    <h2>Todavía no tienes ningún amigo agregado.</h2>
                </div>
                <div class="col-12 text-center">
                    <p>Empieza buscando a tus amigos y ¡Mándales todos los mensajes que quieras!</p>
                </div>
            </div>

            <div v-if="amigos.length != 0" class="row mt-5">
                <div class="col-12">
                    <div class="container container-bg">
                        <form class="row p-5 justify-content-center" @submit.prevent="enviarMensaje">
                            <div class="col-2 col-md-1"><strong>Para:</strong></div>
                            <select v-model="selected" class="col-10 col-md-11">
                                <option v-for="amigo in amigos" :key="amigo.id" :value="amigo.id">{{amigo.name}}</option>
                            </select>
                            <textarea v-model="textArea" rows="10" class="col-12 mt-5"></textarea>
                            <b-button class="mt-5 btn-veinti" type="submit" variant="outline-primary">Enviar mensaje</b-button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Navbar from '@/components/Parts/Navbar.vue'
import axios from 'axios'


export default {

    beforeCreate() {
        if(sessionStorage.getItem('user') == undefined) {
            document.body.style = "background-color: #5284b5 !important"
            this.$router.push({name: "Principal"})
        }
    },
    
    components: {
        Navbar,
    },

    data() {
        return {
            user: Object,
            amigos: [],
            textArea: "",
            selected: ""
        }
    },

    created() {
        this.user = sessionStorage.getItem('user')
        this.user = JSON.parse(this.user)
        this.email = this.user.email
        this.getID(this.email)
        this.complete = true
        this.enviado = false
    },

    methods: {
        getID(email) {
            const path = "http://migueldev.pythonanywhere.com/api/v1.0/users/?email=" + email
            axios.get(path).then((response) => {
                this.user.id = response.data[0].id
                this.getFriends()
            })
        },

        getFriends() {
            const path = "http://migueldev.pythonanywhere.com/api/v1.0/friends/?user=" + this.user.id
            const path2 = "http://migueldev.pythonanywhere.com/api/v1.0/friends/?is_friend=" + this.user.id

            axios.all([axios.get(path), axios.get(path2)]).then((response) => {
                for(let respuesta of response[0].data) {
                    this.amigos.push(respuesta.is_friend)
                }

                for(let respuesta of response[1].data) {
                    this.amigos.push(respuesta.user)
                }
            })
        },

        enviarMensaje() {
            const path = "http://migueldev.pythonanywhere.com/api/v1.0/privatemessage/"
            let datos = {
                dateTime: new Date().toISOString(),
                message: this.textArea,
                user: this.user.id,
                send_to: this.selected
            }
            axios.post(path, datos).then((response) => {
                this.textArea = ""
                this.enviado = true
            }).catch((error) => {
                console.log(error)
            })
        }
    },
}
</script>

<style>
    .container-bg {
        background-color: #f0f0f0;
    }

    .btn-veinti {
        border: 1px solid #5c8fba;
        color: white
    }
</style>