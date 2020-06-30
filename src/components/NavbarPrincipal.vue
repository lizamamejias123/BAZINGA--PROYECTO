<template>

    <div>
<!-- Inicio Navbar -->
  <b-navbar toggleable="lg" class="transparent">
<!-- Logo -->
    <router-link to="/" class="nav-link"><img class="navbar_img mr-auto" src="@/assets/img/bazinga.png" alt="logo"></router-link>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
<!-- Items derecha -->
      <b-navbar-nav class="ml-auto">
<!-- Home -->
        <router-link to="/" class="nav-link">Home</router-link>
<!-- Registrate / Favoritos -->
        <b-navbar-nav v-if=this.$store.state.ver>
      <router-link to="/RegistroUser" class="nav-link" >Registrate</router-link> </b-navbar-nav>

        <b-navbar-nav v-if=!this.$store.state.ver>
      <router-link to="/Fav" class="nav-link">Favorito</router-link> </b-navbar-nav>

<!-- Login / Perfil-->
<b-navbar-nav v-if=this.$store.state.ver>
<router-link to="/Login" class="nav-link">Login</router-link> </b-navbar-nav>
       
        <b-nav-item-dropdown id="dropdown" right  v-if=!this.$store.state.ver>
          <template v-slot:button-content>
<!-- Perfil con Nombre -->
          <em>{{$store.state.Nombre}}</em>
          </template>
          <b-dropdown-item class="nav-link" @click='Perfil'>Editar Perfil</b-dropdown-item>
          <b-dropdown-item class="nav-link" @click='LogOut'>Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import router from '../router'
export default {
    name:'NavbarPrincipal',
    methods:{
      LogOut(){
        this.$store.commit('LogOut')
      },
      Perfil(){
        router.push('/Perfil')
      }
    }
}
</script>
<style lang="scss">
    .navbar_img{
        max-height: 4rem!important 
    }
    .transparent{
        background-color: #0069D9!important;
    }
    a{color: white!important;
    font-size: 1.5rem;}
    a:hover{
      color: orange!important;
    }
   li a{
      color: black!important;
   } 
    

</style>