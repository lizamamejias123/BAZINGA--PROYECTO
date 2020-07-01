<template>
    <div>
<!-- Login texto -->
  <b-jumbotron class="banner1">
    <h1>Login</h1>
    <h3>Ingresa Aca!</h3>
  </b-jumbotron>
<!-- Login Formulario -->
<b-form class="mt-5 container" >
        <b-form-group id="input-group-1" label="Correo Electrónico:" label-for="input-1">
          <b-form-input id="input-1" v-model="Email" type="email" required></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Contraseña" label-for="input-2">
          <b-form-input id="input-2" v-model="Contrasena" required type="password"></b-form-input>
        </b-form-group>
        <b-button class="m-2 px-5" type="submit" variant="primary" @click.prevent='Login'>Login</b-button> 
        <b-button class="m-2 px-5" type="submit" variant="danger" @click.prevent='NoLogin'>Recuperar Contraseña</b-button>
        <b-spinner variant='danger' label="Spinning" v-if=this.$store.state.Loading></b-spinner>
      </b-form>  
    </div>
</template>

<script>
import store from '../store/index'
export default {
    name:'Login',
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
    this.$store.state.Loading = true
    let usuario = [this.Contrasena, this.Email]
    store.commit('Login', usuario)
    },
    NoLogin(){
      if(this.Email!="")
      {store.dispatch('OlvidoClave',this.Email)}
      else{alertify.set('notifier', 'position', 'bottom-left');
           alertify.error('Debes rellenar el correo para verificar tu usuario')}
    }   
}}
</script>
<style lang="scss">
.banner1{
  background-image: url(".././assets/img/BG-5.jpg")!important;
  background-position: center center;
  background-size: cover;
  color: black;}
</style>