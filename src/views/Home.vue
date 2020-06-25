<template>
<div> 
<!-- Banner -->
<b-jumbotron class="banner">
<!-- Bazinga Imagen -->
<img src="@/assets/img/bazinga.png" alt="">
<!-- Texto Principal -->
   <H1>Bazinga! Tu nuevo buscador de series</H1>
   <p>Sitio Web destinado a todo tipo de fans de series de ciencia ficción</p>
  </b-jumbotron>
  <!-- Buscador -->
<b-container class="bv-example-row" fluid>
          <b-container class="my-5">
            <b-row align-h="center">
              <b-col cols="8">
                <b-input-group align-h="center">
                  <b-form-input 
                  size="xl" 
                  v-model="BuscadorInput" 
                  class="mr-sm-2" 
                  placeholder="Series..." 
                  @keyup.enter.prevent="Buscar">
                  </b-form-input>
                  <b-button 
                  size="xl" 
                  class="ml-2" 
                  variant="primary" 
                  @click.prevent="Buscar" >Buscar</b-button>
                </b-input-group>
              </b-col>
            </b-row>
          </b-container>
  <!--Grillas-->  
        <!-- <b-container class="bv-example-row">
          <b-row align-h="center">
            <b-card-group deck v-for="(item,index) in SeriesBuscadas" :key="index">
              <CardSerie 
              :imagen="item.recipe.image" 
              :nombre="item.recipe.label" 
              :uri="item.recipe.uri" 
              :ingredientes="item.recipe.ingredientLines" 
              :url="item.recipe.url" :fav="true"></CardSerie>
            </b-card-group>
          </b-row>
        </b-container>      -->
    </b-container>
</div>
</template>
<script>


import store from '../store/index'
import CardSerie from '../components/CardSerie'
export default {
    component:{
        CardSerie,
    },
    data(){return{BuscadorInput:''}
    },
    methods:{
    Buscar(){
      if(this.BuscadorInput!=''){
        store.dispatch('Buscador',this.BuscadorInput)
        this.BuscadorInput=''
      }else{
        //   Alert crear sobre que no hay nada
      }  
    }
    },
    computed:{
    SeriesBuscadas(){
        return store.getters.ListaSerie
    }
    }
}
</script>
<style lang="scss" scoped>
    .banner{
        background-image: url(".././assets/img/BG-0.jpg");
          background-position: center center;
          background-size: cover;
        }
        h1{
          font-family: 'Bangers', cursive;
          color: #E72831;
        }p{
           font-family: 'Roboto', sans-serif;
           font-weight: 500;
           font-size: 2rem;
           color: black;
        }
   
    
        
</style>