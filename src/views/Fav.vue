<template>
    <div>

<!-- Banner -->
  <b-jumbotron class="banner" header="Favoritos" lead="¡Guarda esas series que andas buscando!">
  </b-jumbotron>


    <b-container class="my-1" v-if="FavoritoTrue">
      <b-row align-h="center">
        <b-col cols="8">
          <b-input-group align-h="center">
            <b-form-input size="sm" v-model="InputFavorito" prepend="Buscar" class="mr-sm-2" placeholder="Puedes filtrar tu busqueda... Ej:Arrow :)"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
    </b-container>

<h1 v-if="$store.state.FavName.length==0">No hay ningun Favorito {{$store.state.Nombre}}</h1>
<h1 v-else>Estos son tus series favoritas {{$store.state.Nombre}}</h1>

    <b-container class="bv-example-row">
      <b-row  align-h="center"> 
        <b-card-group deck v-for="(item,index) in FavoritoCorazon" :key="index">
          <CardSerie 
          :Poster="item.Poster"
               :Title="item.Title" 
               :Year="item.Year" 
               :imdbID='item.imdbID'
              :corazon="false"> 
          </CardSerie>                 
        </b-card-group>
      </b-row>
    </b-container>

    </div>
</template>
<script>
import store from '../store/index';
import CardSerie from '../components/CardSerie'
export default {
  name:'Fav',
    components:{
 CardSerie
    },
    data(){
      return{
        InputFavorito:'',
      }
    },
    computed:{
      FavoritoCorazon(){
       return store.state.Fav.filter((e)=>{
         return e.Title.toLowerCase().includes(this.InputFavorito)
      })},
      FavoritoTrue(){
        let corazon = ''
        if(store.state.FavName.length==-1){
          console.log(Fav.length)
          corazon = false
        }else{corazon = true}
       return corazon
      }
    }
    }
</script>
<style lang="scss" scoped>
    .banner{
        background-image: url(".././assets/img/BG-3.jpg");
          background-position: center center;
          background-size: cover;
          color: black;
        } h1{
          font-family: 'Bangers', cursive  
        }p{
           font-family: 'Roboto', sans-serif;
           font-weight: 500;
           font-size:2rem
        }   
        input{text-transform: lowercase;}
</style>