<template>
    <div class="row w-100">
        <div class="col-12">
            <div class="row w-100 mt-4 mx-4 border-bottom">
                <div class="col-12 pr-0">
                    <h4>Mis Amigos</h4> 
                </div>
            </div>
            <div class="row mt-3 ml-3 py-2 border-bottom">
                <div v-for="amigo in aux" :key="amigo.id" class="col-4 my-2 p-0">
                    <div class="row row-amigo" @click="recarga(amigo.id)">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-12 text-center">
                                    <img class="img-amigo" :src="amigo.profile_pic">
                                </div>
                                <div class="col-12 text-center">
                                    {{amigo.name}} {{amigo.surname}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="amigos.length > 6" class="row ml-3 mt-2">
                <div class="col-12">
                    <a class="verTodas" href="#">Ver Todas ({{amigos.length}})</a>
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
            amigos: [],
            aux: [],
        }
    },

    mounted() {
        const path = "http://localhost:8000/api/v1.0/friends/?user=" + this.$route.params.id
        axios.get(path).then((response) => {
            for(let amigo of response.data) {
                const path2 = "http://localhost:8000/api/v1.0/users/?id=" + amigo.is_friend
                axios.get(path2).then((response2) => {
                    this.amigos.push(response2.data[0])
                    if(this.amigos.length <= 6) {
                        this.aux.push(response2.data[0])
                    }
                })
            }
        })
        const path3 = "http://localhost:8000/api/v1.0/friends/?is_friend=" + this.$route.params.id
        axios.get(path3).then((response) => {
            for(let amigo of response.data) {
                const path2 = "http://localhost:8000/api/v1.0/users/?id=" + amigo.user
                axios.get(path2).then((response2) => {
                    this.amigos.push(response2.data[0])
                    if(this.amigos.length <= 6) {
                        this.aux.push(response2.data[0])
                    }
                })
            }
        })

    },

    methods: {
        recarga(id) {
            this.$router.push('/perfil/' + id)
            this.$emit('recarga')
        }
    }

}
</script>

<style scoped>

    .row-amigo {
        cursor: pointer;
    }

    .row-amigo * {
        color: #356ac0;
    }

    .row-amigo:hover * {
        color: #36536b;
        text-decoration: underline;
    }

    .img-amigo {
        height: 100px;
        width: 100px;
    }

    .verTodas {
        color: #5c8fba !important;
    }

</style>