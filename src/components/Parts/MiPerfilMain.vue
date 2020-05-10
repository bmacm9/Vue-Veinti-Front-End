<template>
    <div class="row ml-3">
        <div class="col-12">
            <div class="row mt-4">
                <div class="col-12">
                    <h2>{{user.nombre}} {{user.apellido}}</h2>
                </div>
            </div>
            <div class="row row-albumes">
                <div class="col-auto border-right">
                    <a href="#">Ver álbumes de fotos</a> (2)
                </div>
                <div class="col">
                    <a href="#">Videos <i class="fas fa-chevron-down"></i></a>
                </div>
            </div>
            
            <div v-if="!tieneEstado" class="row row-estado mt-3">
                <div class="col-12 border d-flex align-items-center">
                    <MainPerfilEstado :user="user" @sinEstado="sinEstado"></MainPerfilEstado>
                </div>
            </div>
            <MainEspacioPersonal></MainEspacioPersonal>
            <MainTablon @recarga="recarga"></MainTablon>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import MainEspacioPersonal from '@/components/Parts/MainEspacioPersonal.vue'
import MainTablon from '@/components/Parts/MainTablon.vue'
import MainPerfilEstado from '@/components/Parts/MainPerfilEstado.vue'

export default {

    created() {
        
    },

    data() {
        return {
            tieneEstado: false,
        }
    },

    components: {
        MainEspacioPersonal,
        MainTablon,
        MainPerfilEstado,
    },

    props: {
        user: Object,
    },

    methods: {
        sinEstado() {
            this.tieneEstado = true
        },

        recarga() {
            this.$emit('recarga')
        }
    }
    
}
</script>

<style scoped>

    .row-albumes a {
        color: #356ac0;
        font-size: 14px;
    }

    .row-estado div {
        background-color: #f5f5f5 !important;
        height: 60px;
        color: #676668;
    }
</style>