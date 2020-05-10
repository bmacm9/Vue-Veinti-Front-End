import Vue from 'vue'
import Router from 'vue-router'
import Principal from '@/components/Principal.vue'
import Home from '@/components/Home.vue'
import MiCuenta from '@/components/MiCuenta.vue'
import MiPerfil from '@/components/MiPerfil.vue'
import NotFound from '@/components/NotFound.vue'
import Mensajes from '@/components/Mensajes.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Principal', component: Principal },
    { path: '/home', name: 'home', component: Home },
    { path: '/mi-cuenta', name: 'cuenta', component: MiCuenta },
    { path: '/perfil/:id/', props: true, name: 'MiPerfil', component: MiPerfil },
    { path: '/mensajes', name: 'Mensajes', component: Mensajes },
    { path: '*', name: 'NotFound', component: NotFound },
  ],
  mode: 'history'
})
