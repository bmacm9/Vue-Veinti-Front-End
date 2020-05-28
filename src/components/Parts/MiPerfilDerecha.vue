<template>
    <div class="row">
        <div class="col-12">
            <div class="row">
                <div class="col-12 pr-0">
                    <MiPerfilMisFotos :user="user" @recarga="recarga"></MiPerfilMisFotos>
                </div>
            </div>
            <div class="row">
                <div class="col-12 pr-0">
                    <MiPerfilMisAmigos @recarga="recarga"></MiPerfilMisAmigos>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import MiPerfilMisFotos from '@/components/Parts/MiPerfilMisFotos.vue'
import MiPerfilMisAmigos from '@/components/Parts/MiPerfilMisAmigos.vue'

export default {

    props: {
        user: Object,
    },

    components: {
        MiPerfilMisFotos,
        MiPerfilMisAmigos
    },

    methods: {
        recarga() {
            this.$emit('recarga')
        }
    }

}
</script>

<style>

</style>