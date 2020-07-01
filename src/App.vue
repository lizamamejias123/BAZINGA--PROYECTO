<template>
  <div id="app">
    <NavbarPrincipal></NavbarPrincipal>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script>
import NavbarPrincipal from '@/components/NavbarPrincipal.vue'
import Footer from '@/components/Footer.vue'
export default {
   components: {
    Footer,NavbarPrincipal
  }, 
}
</script>
<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;}
#nav {
  padding: 30px;}
a{
  font-family: 'Bangers', cursive;}
h1,div h1{
  font-family: 'Bangers', cursive;
  font-size: 70px; 
}
h2 {
  font-family: 'Bangers', cursive;
  font-size: 60px!important;
  color:#E72831;
   }
h3 {
  font-family: 'Roboto', sans-serif;
  font-size:40px
  }
h5{
   font-family: 'Roboto', sans-serif;
  font-size:30px
}
h6{
  font-family: 'Bangers', cursive;
font-size: 22px!important;
}
p{
  font-family: 'Roboto', sans-serif;
  font-size:16px
}
h1, h3, h4, h5{
  color: black;
}
small{
  padding-bottom: 20px; color: #E72831;}
input, div input, form input{
        border: 1px solid black!important;}
form{
        width: 50%!important;
        color: white;
        font-size: 1.5rem;
        font-family: 'Roboto', sans-serif;
        background-color: orange!important;
        border-radius: 15px;
        padding: 30px 20px;}
button{
        color: white;
    }
     #ESPACIO{
      margin-bottom: 280px!important;
    }
   @media only screen and (max-width: 900px) {
       form{width: 90%!important}
    }
</style>
