<template>
    <div>
<!-- Banner -->
  <b-jumbotron class="banner4">
    <h1>Favoritos</h1>
    <h3>¡Guarda esas series que andas buscando!</h3>
  </b-jumbotron>
<!-- Filter de favorito -->
    <b-container class="my-1" v-if="FavoritoTrue">
      <b-row align-h="center">
        <b-col cols="8">
         
          <b-input-group align-h="center">
            <b-form-input size="sm"
            v-model="InputFavorito" 
            prepend="Buscar"
            class="mr-sm-2 mb-4" 
            placeholder="Puedes filtrar tu busqueda... Ej:Arrow :)"
            ></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
    </b-container>
<!-- texto sobre las cards -->
<h2 id="FAV" v-if="$store.state.FavName.length==0">No hay ningun Favorito {{$store.state.Nombre}}</h2>
<h2 id="FAV" v-else>Estos son tus series favoritas {{$store.state.Nombre}}</h2>
<!-- Cards favoritas -->
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
    <div v-if="$store.state.FavName.length==0" id="ESPACIO"></div>
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
        InputFavorito:'',}
    },
    computed:{
      FavoritoCorazon(){
       return store.state.Fav.filter((e)=>{
         return e.Title.toLowerCase().includes(this.InputFavorito)
      })},
      FavoritoTrue(){
        let corazon = ''
        if(store.state.FavName.length==-1){
          corazon = false
        }else{corazon = true}
       return corazon
      }},
    }
</script>
<style lang="scss">
    .banner4{
        background-image: url(".././assets/img/BG-3.jpg");
          background-position: center center;
          background-size: cover;
          color: black;
    }
    #FAV{
      color: black;
      font-size: 40px!important;
    }
    #ESPACIO{
      margin-bottom: 280px!important;
    }
    @media only screen and (max-width: 900px) {
       h2{font-size: 40px!important;}
       h3{font-size: 20px!important;}
       h1{font-size: 45px!important;}
       h4{font-size: 18px!important;}
       h5{font-size: 16px!important;}
       h6{font-size: 14px!important;}
      
    }
    
</style>