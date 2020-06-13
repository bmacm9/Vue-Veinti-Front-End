import Vue from 'vue'
import Router from 'vue-router'
import Principal from '@/components/Principal.vue'
import Home from '@/components/Home.vue'
import MiCuenta from '@/components/MiCuenta.vue'
import MiPerfil from '@/components/MiPerfil.vue'
import NotFound from '@/components/NotFound.vue'
import Mensajes from '@/components/Mensajes.vue'
import verTodosX from '@/components/VerTodosX.vue'
import Busqueda from '@/components/Busqueda.vue'
import NuevoMensaje from '@/components/NuevoMensaje.vue'
import Registro from '@/components/Registro.vue'
import Peticiones from '@/components/Peticiones.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Principal', component: Principal },
    { path: '/home', name: 'home', component: Home },
    { path: '/mi-cuenta', name: 'miCuenta', component: MiCuenta},
    { path: '/perfil/:id/', props: true, name: 'MiPerfil', component: MiPerfil },
    { path: '/mensajes', name: 'Mensajes', component: Mensajes },
    { path: '/mensajes/nuevo', component: NuevoMensaje},
    { path: '*', name: 'NotFound', component: NotFound },
    { path: '/perfil/:id/fotos/', component: verTodosX},
    { path: '/perfil/:id/amigos/', component: verTodosX},
    { path: '/busqueda/:search/', name: 'Busqueda', component: Busqueda },
    { path: '/invitacion/:code/', component: Registro },
    { path: '/peticiones/', name: 'peticiones', component: Peticiones }
  ],
  mode: 'history'
})
