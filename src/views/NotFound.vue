<template>
    <div>
<!-- Banner -->
  <b-jumbotron class="banner" >
   <h1>Error 404</h1>
   <h3 class="home_text">¿Andas perdido?, Presiona el logo de Bazinga! y andaté al home</h3>
  </b-jumbotron>
  <div id="ESPACIO">
  </div>
    </div>
</template>
<script>

export default {
    name:'NotFound',
}
</script>
<style lang="scss" scoped>
    .banner{
        background-image: url(".././assets/img/BG-2.jpg");
          background-position: center center;
          background-size: cover;
          color: black;
        }
    .home_text{
            padding-bottom: 100px;
        }
</style>