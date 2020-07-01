<template>
    <div>
        <div id="footer">
      <router-link to="/" class="nav-link"><img class="navbar_img mr-auto" src="@/assets/img/bazinga.png" alt="logo"><h6>&copy Bazinga 2020 </h6></router-link>
        </div>        
    </div>
</template>

<script>
    export default {
          name: 'Footer'  
    }
</script>

<style lang="scss">
#footer {
  position: sticky;
  background-color: #0069D9;
  color: white;
  text-align: center;
  padding: 5px;
  margin-top: 50px;
}


</style>