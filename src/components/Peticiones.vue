<template>
    <div class="row">
        <div class="col-12">
            <Navbar ref="navbar"></Navbar>
            <div class="row mt-3">
                <div v-if="peticiones.length != 0" class="col-12">
                    <div class="container">
                        <div v-for="peticion in peticiones" :key="peticion.id" class="row border py-2 my-2">
                            <div class="col-auto">
                                <img style="width: 100px; height: 100px" :src="peticion.user.profile_pic" alt="">
                            </div>
                            <div class="col-auto">
                                <div class="row">
                                    <div class="col-12">
                                        {{peticion.user.name}} {{peticion.user.surname}}
                                    </div>
                                    <div class="col-auto">
                                        <b-button size="sm" variant="outline-success" @click="aceptar(peticion)">Aceptar</b-button>
                                    </div>
                                    <div class="col-auto">
                                        <b-button size="sm" variant="outline-danger" @click="rechazar(peticion.id)">Rechazar</b-button>
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

import Navbar from '@/components/Parts/Navbar.vue'
import axios from 'axios'

export default {
    components: {
        Navbar,
    },

    beforeCreate() {
        if(sessionStorage.getItem('user') == undefined) {
            document.body.style = "background-color: #5284b5 !important"
            this.$router.push({name: "Principal"})
        }
    },

    created() {
        setTimeout(() => {
            const path = "http://localhost:8000/api/v1.0/friendrequest/?send_to=" + this.$refs.navbar.user.id
            axios.get(path).then((response) => {
                for(let peticion of response.data)
                this.peticiones.push(peticion)
            })
        }, 500);
        
    },

    data() {
        return {
            peticiones: [],
        }
    },

    methods: {
        aceptar(peticion) {
            const path = "http://localhost:8000/api/v1.0/friends/"
            let datos = {
                user: peticion.user.id,
                is_friend: peticion.send_to.id,
            }
            axios.post(path, datos).then((response) => {
                const path2 = "http://localhost:8000/api/v1.0/friendrequest/" + peticion.id + "/"
                axios.delete(path2).then((response) => {
                    this.$router.push({name: "home"})
                })
                
            })
        }
    },
}
</script>

<style>

</style>