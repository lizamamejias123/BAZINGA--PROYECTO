<template>
    <div>
<!-- Registrate texto -->
  <b-jumbotron class="banner2">
    <h1>Registrate</h1>
    <h3>Registrate y podrás guardar tus series favoritas</h3>   
  </b-jumbotron>
<!-- Formulario -->
<div class="body">
<b-form class="container mt-5">
        <b-form-group label="Nombre:">
          <b-form-input v-model="Nombre" type="text" required></b-form-input>
        </b-form-group>
        <b-form-group label="Correo Electrónico:">
          <b-form-input  v-model="Email" type="email" required></b-form-input>
        </b-form-group>
        <b-form-group  label="Contraseña:" >
          <b-form-input  v-model="Contrasena" type="password" required></b-form-input>
        </b-form-group>
        <b-form-group label="Repite Contraseña:" >
          <b-form-input v-model="Rep_Contrasena" type="password" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary"  @click.prevent='Registrarte'>Registrarte</b-button>
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
           alertify.set('notifier', 'position', 'bottom-left');
           alertify.error('Rellena los datos del formulario')
// Pasar el correo con la expresion regular 
          }else if(!ExpresionRegular.test(this.Email)){
            alertify.set('notifier', 'position', 'bottom-left');
           alertify.error('El formato del correo es invalido')
// Contraseña debe tener igual o mas de 8 digitos
          }else if (this.Contrasena.length<=8){
           alertify.set('notifier', 'position', 'bottom-left');
           alertify.error('La contraseña debe tener 8 o más digitos')
// Si la Contraseña es igual a la otra validacion
          }else if(this.Contrasena!=this.Rep_Contrasena){
           alertify.set('notifier', 'position', 'bottom-left');
           alertify.error('Las contraseñas deben ser iguales')
          }else{
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
.banner2{
  background-image: url(".././assets/img/BG-2.jpg");
  background-position: center center;
  background-size: cover;
  color: black;} 

</style>