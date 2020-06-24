<template>
    <div>
<!-- Inicio Navbar -->
  <b-navbar toggleable="lg" class="transparent">
<!-- Logo -->
    <b-navbar-brand href="#" class="ml-auto"><img class="navbar_img " src="@/assets/img/bazinga.png" alt="logo"></b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
<!-- Items derecha -->
      <b-navbar-nav class="ml-auto">
<!-- Home -->
        <b-nav-item href="/">Home</b-nav-item>
<!-- Registrate / Favoritos -->
        <b-nav-item href="#">Registrate</b-nav-item>
<!-- Login / Perfil-->
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>Perfil</em>
          </template>
<!-- Perfil -->
          <b-dropdown-item href="#">Perfil</b-dropdown-item>
<!-- Desconectarse  o Log Out -->
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
    name:'NavbarPrincipal'
}
</script>
<style lang="scss">
    .navbar_img{
        max-height: 4rem!important 
    }
    .transparent{
        background-color: #109AE8!important;
       
    }
</style>