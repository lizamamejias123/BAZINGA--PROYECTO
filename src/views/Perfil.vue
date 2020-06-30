<template>
    <div>
<!-- Banner -->
  <b-jumbotron class="banner" header="Perfil" lead="¡Tu perfil lo encuentras acá!">
    <h5>Puedes Editar tu usuario cuando quieras</h5>
  </b-jumbotron>
  <!-- Formulario del perfil -->
<b-form class="mt-5 container" >
        <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
          <b-form-input id="input-1" v-model='PerfilDato[1]' type="text" required></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1" label="Correo Electrónico:" label-for="input-1">
          <b-form-input id="input-1" v-model="PerfilDato[0]" type="email" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" @click.prevent='ActualizarPerfil(PerfilDato)'>Actualizar</b-button>
      </b-form>
</div>
</template>
<script>
import store from '../store/index'
export default {
    name:'Perfil',
    data() {
      return {
        Correo:'',
        Nombre:'',
        }  
      },
    computed: {
      // mandar a getters la informacion del perfil a actualizar
       PerfilDato(){
         return store.getters.PerfilDatoGetters
       }
    },
    methods:{
      ActualizarPerfil(i){  
        // Agregar expresion regular 
        const ExpresionRegular= /\w+@\w+\.+[a-z]/
        // si el correo no es valido
        if(!ExpresionRegular.test(this.PerfilDato[0])){
          }else{
            store.dispatch('ActualizacionPerfil',i)   
          }                       
      }
    }}
</script>
<style lang="scss" scoped>
    .banner{
        background-image: url(".././assets/img/BG-4.jpg");
          background-position: center center;
          background-size: cover;
          color: black;
        }
    h1{
          font-family: 'Bangers', cursive  
        }
        p{
           font-family: 'Roboto', sans-serif;
           font-weight: 500;
           font-size: 2rem
        }input{
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