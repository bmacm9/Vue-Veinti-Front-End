<template>
    <div class="row w-100 row-perfil m-0">
        <div class="col-12 pl-0">
            <div class="row">
                <div class="col-12 pr-0">
                    <Navbar ref="navbar" @recarga="recargar"></Navbar>
                </div>
            </div>
            <div v-if="complete" class="row">
                <div class="col-3">
                    <MiPerfilSidebar v-if="recarga" class="h-100" :user="user"></MiPerfilSidebar>
                </div>
                <div class="col-6">
                    <MiPerfilMain @recarga="recargar" v-if="recarga" :user="user"></MiPerfilMain>
                </div>
                <div class="col-3 w-100">
                    <MiPerfilDerecha @recarga="recargar" v-if="recarga" :user="user"></MiPerfilDerecha>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Navbar from '@/components/Parts/Navbar.vue'
import MiPerfilSidebar from '@/components/Parts/MiPerfilSidebar.vue'
import MiPerfilMain from '@/components/Parts/MiPerfilMain.vue'
import MiPerfilDerecha from '@/components/Parts/MiPerfilDerecha.vue'
import axios from 'axios'
import Vue from 'vue'

export default {


    beforeCreate() {        
        const path = "http://localhost:8000/api/v1.0/users/?id=" + this.$route.params.id
        axios.get(path).then((response) => {
            this.user.nombre = response.data[0].name
            this.user.apellido = response.data[0].surname
            this.user.foto = response.data[0].profile_pic
            this.user.visitas = response.data[0].visits
            this.user.invis = response.data[0].invitations
            this.user.genero = response.data[0].gender
            this.user.nacimiento = response.data[0].born
            this.user.estadoCivil = response.data[0].civilStatus
            this.user.email = response.data[0].email
            this.user.id = response.data[0].id
        })
    },

    data() {
        return {
            user: {
                nombre: "",
                apellido: "",
                foto: "",
                visitas: "",
                invis: "",
                genero: "",
                nacimiento: "",
                estadoCivil: "",
                email: "",
                id: 0,
            },
            complete: false,
            recarga: true,
        }
    },

    methods: {
        recargar() {
            if(this.$refs.navbar.user.id != this.$route.params.id)
                this.$refs.navbar.addVisit()
            const path = "http://localhost:8000/api/v1.0/users/?id=" + this.$route.params.id
            axios.get(path).then((response) => {
                this.user.nombre = response.data[0].name
                this.user.apellido = response.data[0].surname
                this.user.foto = response.data[0].profile_pic
                this.user.visitas = response.data[0].visits
                this.user.invis = response.data[0].invitations
                this.user.genero = response.data[0].gender
                this.user.nacimiento = response.data[0].born
                this.user.estadoCivil = response.data[0].civilStatus
                this.user.email = response.data[0].email
                this.user.id = response.data[0].id
            })
            this.recarga = false
            setTimeout(() => {
                this.recarga = true
            }, 1);
        }
    },

    mounted() {
        this.complete = true;
    },

    created() {
        
    },

    components: {
        Navbar,
        MiPerfilSidebar,
        MiPerfilMain,
        MiPerfilDerecha,
    },
}
</script>

<style scoped>
    .row-perfil {
        width: 100vw;
    }
</style>