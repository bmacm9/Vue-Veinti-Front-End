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
        }
    },

    methods: {
        nuevoEstado() {
            let newStatus = {
                status_text: this.nuevoEstadoTexto,
                dateTime: new Date().toISOString(),
                user: this.user.id
            }
            const path = "http://localhost:8000/api/v1.0/status/"
            axios.post(path, newStatus).then((response) => {
                this.$router.replace('/perfil/' + this.user.id)
            }).catch((error) => {
                console.log(error)
            })
        },

        sinEstado() {
            this.tieneEstado = true;
        },

        getID(email) {
            const path = "http://localhost:8000/api/v1.0/users/?email=" + email
            axios.get(path).then((response) => {
                this.user.id = response.data[0].id
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

    .input-estado {
        height: 50px;
    }


    .estado {
        font-size: 14px;
        align-self: center;
    }
</style>