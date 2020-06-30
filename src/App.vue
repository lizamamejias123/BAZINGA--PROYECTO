<template>
  <div id="app">
    <NavbarPrincipal></NavbarPrincipal>
    <router-view />
  </div>
</template>
<script>
import NavbarPrincipal from '@/components/NavbarPrincipal.vue'
export default {
   components: {
    NavbarPrincipal,
  }, 
}
</script>
<style lang="scss">
#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  ul a {
    font-weight: bold;
    color: #2c3e50;
    font-family: 'Bangers', cursive;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
a{font-family: 'Bangers', cursive;}
</style>
