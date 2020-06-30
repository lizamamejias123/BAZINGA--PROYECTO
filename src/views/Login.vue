<template>
    <div>
<!-- Login texto -->
<div>
  <b-jumbotron header="Login" class="banner" lead="¡Ingresa Aca!">
  </b-jumbotron>
</div>   
<!-- Login Formulario -->
<b-form class="mt-5 container" >
        <b-form-group id="input-group-1" label="Correo Electrónico:" label-for="input-1">
          <b-form-input id="input-1" v-model="Email" type="email" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Contraseña" label-for="input-2">
          <b-form-input id="input-2" v-model="Contrasena" required type="password"></b-form-input>
        </b-form-group>

        <b-button class="m-2 px-5" type="submit" variant="primary" @click.prevent='Login'>Login</b-button> 
        
      </b-form>

     
    </div>
</template>

<script>
import store from '../store/index'
export default {
    data(){
        return{
// Datos de los input
    Contrasena:'',
    Email:'',
        }
    },
    methods:{
// Subir datos al Store 
    Login(){
    let usuario = [this.Contrasena, this.Email]
    store.commit('Login', usuario)
    },
    
    
}}
</script>
<style lang="scss" scoped>
    .banner{
        background-image: url(".././assets/img/BG-5.jpg");
          background-position: center center;
          background-size: cover;
          color: black;}
    h1{
          font-family: 'Bangers', cursive; }
    p{
           font-family: 'Roboto', sans-serif;
           font-weight: 500;
           font-size: 2rem}input{
      border: 1px solid black;
    }
       form
    {width: 50%;
    color: white;
    font-size: 1.5rem;
    font-family: 'Roboto', sans-serif;background-color: orange!important;
      border-radius: 15px;
    }
    input{
      border: 1px solid black;
    }
    button{
      color: white;
    }
   @media only screen and (max-width: 900px) {
     form{width: 80%;}
      
    }
</style>