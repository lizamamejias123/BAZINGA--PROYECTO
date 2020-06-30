<template>
    <div>
<!-- Registrate texto -->
     <div>
  <b-jumbotron header="Registrate" class="banner" lead="Registrate y podrás guardar tus series favoritas">   
  </b-jumbotron>
</div >   
<!-- Formulario -->
<div class="body">
<b-form class="container mt-5">
        <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
          <b-form-input id="input-1" v-model="Nombre" type="text" required></b-form-input>
          
        </b-form-group>

        <b-form-group id="input-group-1" label="Correo Electrónico:" label-for="input-1">
          <b-form-input id="input-1" v-model="Email" type="email" required></b-form-input>
          
        </b-form-group>

        <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
          <b-form-input id="input-2" v-model="Contrasena" type="password" required></b-form-input>
          
        </b-form-group>

        <b-form-group id="input-group-2" label="Repite Contraseña:" label-for="input-2">
          <b-form-input id="input-2" v-model="Rep_Contrasena" type="password" required></b-form-input>
          
        </b-form-group>

        <b-button type="submit" variant="primary" @click.prevent='Registrarte'>Registrarte</b-button>
      </b-form>
    </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
// Datos en blanco de la obtencion del formulario
            Nombre:'',
            Email:'',
            Contrasena:'',
            Rep_Contrasena:'',
            show: true,
        }
    },
    methods:{
// Boton Registrarte
        Registrarte(){
// expresion regular
          const ExpresionRegular= /\w+@\w+\.+[a-z]/
//   If si faltan los datos 
          if (!this.Email || !this.Nombre || !this.Contrasena|| !this.Rep_Contrasena){
            this.$buefy.dialog.alert({
                    title: 'Faltan Datos',
                    message: 'No has rellenado los datos requeridos',
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
// Pasar el correo con la expresion regular 
          }else if(!ExpresionRegular.test(this.Email)){
            this.$buefy.dialog.alert({
                    title: 'Correo no valido',
                    message: 'El correo no es valido',
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
// Contraseña debe tener igual o mas de 8 digitos
          }else if (this.Contrasena.length<8){
            this.$buefy.dialog.alert({
                    title: 'Contraseña',
                    message: 'Ingresar contraseña con 8 digitos o más',
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
// Si la Contraseña es igual a la otra validacion
          }else if(this.Contrasena!=this.Rep_Contrasena){
            this.$buefy.dialog.alert({
                    title: 'Las contraseñas no son iguales',
                    message: 'Ingresar contraseña iguales',
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
          }else{
//   Registro Exitoso
               this.$buefy.dialog.alert({
                    title: 'Registro Exitoso',
                    message: 'Registro exitoso, gracias por tu registro  ' + this.Nombre,
                    type: 'is-success',
                    hasIcon: true,
                    icon: 'check-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
// Mandar datos
            let user=[this.Nombre,this.Email,this.Contrasena]
// Mandar el usuario 
            this.$store.commit('RegistroDelUsuario',user)

          }  
        }
    }
}
</script>


<style lang="scss" scoped>
    .jumbotron{margin-bottom: 0rem!important;}
    .banner{
        background-image: url(".././assets/img/BG-2.jpg");
          background-position: center center;
          background-size: cover;
          color: black;} 
    h1{
          font-family: 'Bangers', cursive;
          color: black;}
    p{
           font-family: 'Roboto', sans-serif;
           font-weight: 500;
           font-size: 2rem}
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