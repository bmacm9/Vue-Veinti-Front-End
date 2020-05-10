<template>
    <p class="m-0">{{estado.estado_texto}} <small>{{estado.dateTime}}</small></p>
</template>

<script>

import axios from 'axios'

export default {

    props:{
        user: Object
    },
    
    data() {
        return {
            estado: {
                estado_texto: "",
                dateTime: null,
                id: "",
            },
        }
    },

    created: function(){
        this.getEstado()
    },

    methods: {
        getEstado() {
            if(this.$route.params.id){
                const path = "http://localhost:8000/api/v1.0/status/?user=" + this.$route.params.id
                axios.get(path).then((response) => {
                    if(response.data.length > 0) {
                        this.estado.estado_texto = response.data[0].status_text
                        this.estado.dateTime = response.data[0].dateTime
                    } else {
                        this.$emit('sinEstado');
                    }
                }).catch(() => {
                    console.log("ERRRROOOOOOOR")
                })
            }else {
                this.getStatusWithID()
            }

        },

        getStatusWithID() {
            let user = sessionStorage.getItem('user')
            user = JSON.parse(user)
            const path = "http://localhost:8000/api/v1.0/users/?email=" + user.email
            axios.get(path).then((response) => {
                this.getStatus(response.data[0].id)
            })
        },

        getStatus(id) {
            const path = "http://localhost:8000/api/v1.0/status/?user=" + id
            axios.get(path).then((response) => {
                if(response.data.length > 0) {
                    this.estado.estado_texto = response.data[0].status_text
                    this.estado.dateTime = response.data[0].dateTime
                } else {
                    this.$emit('sinEstado');
                }
            }).catch(() => {
                console.log("ERRRROOOOOOOR")
            })
        }

    }


}
</script>

<style scoped>


</style>