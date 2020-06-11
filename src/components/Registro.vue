<template>
    <div class="row w-100 m-0">
        <div class="col-12 p-0">
            <Navbar></Navbar>
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
                            <h2 class="ml-5">Registro</h2>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-12 text-center">
                            <h4 class="titulo"><em>Estás muy cerca de formar parte de nuestra familia. Registrate con tus datos y comienza a usar Veinti</em></h4>
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

import Navbar from '@/components/Parts/Navbar.vue'
import axios from 'axios'
// Sha256 for encrypting passwords
import { sha256 } from 'js-sha256';

export default {

    components: {
        Navbar,
    },

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
        const path = "http://localhost:8000/api/v1.0/invitation/?code=" + this.$route.params.code
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

        registrarse() {
            const path = "http://localhost:8000/api/v1.0/users/"
            this.passSha = sha256(this.form.pass)
            /*let formData = new FormData()
            formData.append('name', this.form.nombre)
            formData.append('surname', this.form.apellido)
            formData.append('email', this.form.email)
            formData.append('password', this.passSha)
            formData.append('profile_pic', this.form.foto)
            formData.append('invitations', 10)
            formData.append('visits', 0)
            formData.append('born', new Date(this.form.fechaDeNacimiento))
            formData.append('gender', this.form.sexo)
            formData.append('civilStatus', this.form.estadoCivil)
            /*
            let datos = {
                "name": this.form.nombre,
                "surname": this.form.apellido,
                "email": this.form.email,
                "password": this.passSha,
                "profile_pic": this.form.foto,
                "invitations": 10,
                "visits": 0,
                "born": new Date(this.form.fechaDeNacimiento),
                "gender": this.form.sexo,
                "civilStatus": this.form.estadoCivil,
            }
            *//*
            axios.post(path, formData)
            .then((response) => {
                console.log("exito")
            })
*/

            for(let imagen of this.images){
                
                let formData = new FormData()
                formData.append('name', this.form.name)
                formData.append('surname', this.form.apellido)
                formData.append('email', this.form.email)
                formData.append('password', this.passSha)
                formData.append('profile_pic', imagen)
                formData.append('invitations', 10)
                formData.append('visits', 0)
                formData.append('born', '2020-03-03')
                formData.append('gender', this.form.sexo)
                formData.append('civilStatus', this.form.estadoCivil)
                console.log(formData)
                axios.post(path, formData)
                .then((response) => {}).catch((error) => {
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