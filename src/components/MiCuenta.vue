<template>
    <Navbar></Navbar>
</template>

<script>

import Navbar from '@/components/Parts/Navbar.vue'

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
}
</script>

<style>

</style>