<template>
    <div>
<!-- Banner -->
  <b-jumbotron class="banner" header="Perfil" lead="¡Tu perfil lo encuentras acá!">
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
        Email:'',
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
        //  Alert sobre correo sin expresion regular
        this.$buefy.dialog.alert({
                    title: 'Correo no valido',
                    message: 'El correo no es valido',
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true})
          }else{
        // si es valido, mandar a actualizar
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
        }
    
        
</style>