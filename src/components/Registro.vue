<template>
    <div class="row w-100 m-0">
        <div class="col-12 p-0">
            <div class="w-100">
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav></b-navbar-nav>
                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto"></b-navbar-nav>
                </b-collapse>
            </div>
            <div v-if="!existe" class="row">
                <div class="col-12 p-0 text-center">
                    <img src="../../static/arana.jpg">
                </div>
                <div class="col-12 p-0 text-center">
                    <h3>No existe esta invitación o ha caducado.</h3>
                </div>
            </div>
            <div v-if="existe" class="row w-100 mt-3">
                <div class="col-12">
                    <div class="row border-bottom">
                        <div class="col-12">
                            <h2 class="ml-5 text-white">Registro</h2>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-12 text-center">
                            <h4 class="text-white"><em>Estás muy cerca de formar parte de nuestra familia. Registrate con tus datos y comienza a usar Veinti</em></h4>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-12">
                            <div class="container">
                                <form @submit.prevent="registrarse" enctype="multipart/form-data" class="row justify-content-center formulario">
                                    <div class="col">
                                        <div class="row justify-content-center">
                                            <div class="col-3">
                                                <p><strong>Nombre</strong></p>
                                            </div>
                                            <div class="col-9">
                                                <input v-model="form.nombre" required class="w-100" type="text">
                                            </div>
                                        </div>
                                        <div class="row justify-content-center">
                                            <div class="col-3">
                                                <p><strong>Apellido</strong></p>
                                            </div>
                                            <div class="col-9">
                                                <input v-model="form.apellido" required class="w-100" type="text">
                                            </div>
                                        </div>
                                        <div class="row justify-content-center">
                                            <div class="col-3">
                                                <p><strong>Fecha de Nacimiento</strong></p>
                                            </div>
                                            <div class="col-9">
                                                <input v-model="form.fechaDeNacimiento" required class="w-100" type="date">
                                            </div>
                                        </div>
                                        <div class="row justify-content-center">
                                            <div class="col-3">
                                                <p><strong>E-mail</strong></p>
                                            </div>
                                            <div class="col-9">
                                                <input v-model="form.mail" required class="w-100" type="email">
                                            </div>
                                        </div>
                                        <div class="row justify-content-center">
                                            <div class="col-3">
                                                <p><strong>Contraseña</strong></p>
                                            </div>
                                            <div class="col-9">
                                                <input v-model="form.pass" required class="w-100" type="password">
                                            </div>
                                        </div>
                                        <div class="row justify-content-center">
                                            <div class="col-3">
                                                <p><strong>Repite Contraseña</strong></p>
                                            </div>
                                            <div class="col-9">
                                                <input v-model="form.repPass" required class="w-100" type="password">
                                            </div>
                                        </div>
                                        <div class="row justify-content-center">
                                            <div class="col-3">
                                                <p><strong>Foto de perfil</strong></p>
                                            </div>
                                            <div @change="onFileChange($event)" class="col-9">
                                                <input required class="w-100" type="file" id="file" ref="file">
                                            </div>
                                        </div>
                                        <div class="row justify-content-center">
                                            <div class="col-3">
                                                <p><strong>Sexo</strong></p>
                                            </div>
                                            <div class="col-9">
                                                <input v-model="form.sexo" required class="w-100" type="text">
                                            </div>
                                        </div>
                                        <div class="row justify-content-center">
                                            <div class="col-3">
                                                <p><strong>Estado Civil</strong></p>
                                            </div>
                                            <div class="col-9">
                                                <input v-model="form.estadoCivil" required class="w-100" type="text">
                                            </div>
                                        </div>
                                        <div class="row mt-3 justify-content-center">
                                            <div class="col-auto">
                                                <b-button type="submit" class="boton">Registrarse</b-button>
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
    </div>
</template>

<script>

import axios from 'axios'
// Sha256 for encrypting passwords
import { sha256 } from 'js-sha256';

export default {


    data() {
        return {
            existe: false,
            form: {
                nombre: "",
                apellido: "",
                fechaDeNacimiento: "",
                mail: "",
                pass: "",
                repPass: "",
                sexo: "",
                estadoCivil: "",
                foto: "",
            },
            images: [],
            passSha: "",
        }
    },

    beforeCreate() {
        const path = "http://migueldev.pythonanywhere.com/api/v1.0/invitation/?code=" + this.$route.params.code
        axios.get(path).then((response) => {
            if(response.data.length != 0) {
                this.existe = true
            }
        })
    },

    methods: {
        onFileChange(event) {
            this.images.push(event.target.files[(event.target.files.length-1)])
        },

        formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            return [year, month, day].join('-');
        },

        registrarse() {
            const path = "http://migueldev.pythonanywhere.com/api/v1.0/users/"
            this.passSha = sha256(this.form.pass)

            for(let imagen of this.images){
                let formData = new FormData()
                formData.append('name', this.form.nombre)
                formData.append('surname', this.form.apellido)
                formData.append('email', this.form.mail)
                formData.append('password', this.passSha)
                formData.append('profile_pic', imagen)
                formData.append('invitations', 10)
                formData.append('visits', 0)
                formData.append('born', this.formatDate(this.form.fechaDeNacimiento))
                formData.append('gender', this.form.sexo)
                formData.append('civilStatus', this.form.estadoCivil)
                axios.post(path, formData).then((response) => {
                    this.$router.push({name: "Principal"})
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
    },

}
</script>

<style scoped>
    .titulo {
        color: #5c8fba !important
    }

    .formulario {
        background-color: #f0f0f0;
        padding: 20px;
        border-radius: 10px;
    }

    .boton {
        color: white;
        background: #5c8fba !important
    }
</style>