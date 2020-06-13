<template>
  <div class="container-fluid">
    <Navbar :user="user"></Navbar>
    <div class="row mr-0">
      <Sidebar :user="user" class="col-9 col-sm-5 col-md-4 col-xl-2 ml-5"></Sidebar>
      <HomeMain class="col-11 col-md-7"></HomeMain>
      <RightSide class="d-none d-xl-inline col-xl-2"></RightSide>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Parts/Navbar.vue'
import Sidebar from '@/components/Parts/Sidebar.vue'
import HomeMain from '@/components/Parts/HomeMain.vue'
import RightSide from '@/components/Parts/RightSide.vue'
import axios from 'axios'

export default {
  data() {
    return {
      user: {
        nombre: "",
        apellido: "",
        foto: "",
        visitas: "",
        invis: "",
        id: "",
      }

    }
  },

  components: {
      Navbar,
      Sidebar,
      HomeMain,
      RightSide,
  },
  
  beforeCreate() {
    if(sessionStorage.getItem('user') != undefined) {
      this.user = sessionStorage.getItem('user')
      this.user = JSON.parse(this.user)
      const path = "http://localhost:8000/api/v1.0/users/?email=" + this.user.email  + "&password=" + this.user.password
      axios.get(path).then((response) => {
        this.user.nombre = response.data[0].name
        this.user.apellido = response.data[0].surname
        this.user.foto = response.data[0].profile_pic
        this.user.visitas = response.data[0].visits
        this.user.invis = response.data[0].invitations
        this.user.id = response.data[0].id
      })
    }
    else {
      document.body.style = "background-color: #5284b5 !important"
      this.$router.push({name: "Principal"})
    }
  },

}
</script>

<style scoped>
  .container-fluid {
    padding: 0;
  }
</style>