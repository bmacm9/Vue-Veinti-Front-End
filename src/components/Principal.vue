<template lang="html">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 text-center">
                <img class="logo" src="../../static/logo.png">
            </div>
            <div class="caja pt-5 pb-5 col-10 col-lg-6">
                <div v-if="error != ''" class="row pb-2">
                    <b-alert class="col-12" variant="danger" show>{{error}}</b-alert>
                </div>
                <form class="form" @submit.prevent="logIn">
                    <div class="row">
                        <label class="col-3 text-right" for="email">E-mail</label>
                        <input required v-model="user.email" class="col-8" id="email" name="email" type="email"/>
                    </div>
                    <div class="row mt-2">
                        <label class="col-3 text-right" for="password">Contraseña</label>
                        <input required v-model="user.password" class="col-8" id="password" name="password" type="password"/>
                    </div>
                    <div class="row mt-2">
                        <div class="col-3"></div>
                        <input type="checkbox" id="recordar"/><p class="col-8">Recordar en este equipo</p>
                    </div>
                    <div class="row">
                        <div class="col-3"></div>
                    <input class="btn btn-primary boton col-2" type="submit" value="enviar"/>
                    </div>
                </form>
            </div>
            <div class="col-12 text-center">
                <a class="text-white">¿Has olvidado tu contraseña</a>
            </div>
        </div>
    </div>
</template>

<script>
// Axios for HTTP request
import axios from 'axios'

// Sha256 for encrypting passwords
import { sha256 } from 'js-sha256';

export default {
    name: 'Principal',
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
            error: "",
        }
    },

    methods: {
        logIn() {
            const path = "http://localhost:8000/api/v1.0/users/?email=" + this.user.email  + "&password=" + sha256(this.user.password)
            axios.get(path).then((response) => {
                if(response.data.length > 0){
                    this.error = ""
                    this.aux = { email: this.user.email, password: sha256(this.user.password)}
                    sessionStorage.setItem('user', JSON.stringify(this.aux));
                    this.$router.push('home')
                    document.body.style="background-color: white"
                }else{
                    this.error = "Email o contraseña incorrecta"
                }
            })
            .catch( (error) => {
                console.log("error: " + error)
            })
        },

        autologin() {
            const path = "http://localhost:8000/api/v1.0/users/?email=" + this.user.email  + "&password=" + this.user.password
            axios.get(path).then((response) => {
                if(response.data.length > 0){
                    this.error = ""
                    this.$router.push('home')
                }else{
                    this.error = "Email o contraseña incorrecta"
                }
            }).catch( (error) => {
                console.log("error")
            })

        }
    },

    mounted() {
        if(sessionStorage.getItem('user')){
            this.user = JSON.parse(sessionStorage.getItem('user'))
            this.autologin()
        }
    }
}
</script>

<style lang="css" scoped>

    .caja {
        border: 5px solid #4c739a;
        background-color: white;
        color: #555;
    }

    .boton {
        background-color: #5284b5;
        color: white;
        border: none;
    }

    .logo {
        height: 40px !important;
        margin-bottom: 10px;
    }

    input[type="email"], input[type="password"] {
        border: 3px solid #f6f6f6;     
    }

    .container {
        top: 50%;
        transform: translateY(20%);
    }

</style>