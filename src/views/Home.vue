<template>
<div> 
<!-- Banner -->
<b-jumbotron class="banner">
<!-- Bazinga Imagen -->
<img src="@/assets/img/bazinga.png" alt="" href="/">
<!-- Texto Principal -->
   <H1>Bazinga! Tu nuevo buscador de series</H1>
   <p>Sitio Web destinado a todo tipo de fans de todas las series</p>
   <h5 v-if="$store.state.Nombre!==''">Hola {{$store.state.Nombre}}</h5>
   <h4 v-else> Debes registrarte para añadir series a tus favoritos</h4>
  </b-jumbotron>
  <!-- Buscador -->
<b-container class="bv-example-row" fluid>
          <b-container class="my-3">
            <b-row align-h="center">
              <b-col cols="10">
                <b-input-group align-h="center">
                  <b-form-input 
                  size="xl" 
                  v-model="Busqueda" 
                  class="mr-sm-2" 
                  placeholder="Encuentra tu serie... Ej: Arrow">
                  </b-form-input>
                  <b-button 
                  size="xl" 
                  class="ml-2" 
                  variant="primary" 
                  style="color:white"
                  @click.prevent="Buscar()">Buscar</b-button>
                </b-input-group>
              </b-col>
            </b-row>
          </b-container>
    </b-container>
    <!-- Card de series -->
    <b-container class="bv-example-row">
          <b-row align-h="center">
            <b-card-group deck v-for="(item,index) in SeriesBuscadas" :key="index">
              <CardSerie 
              :Poster="item.Poster"
               :Title="item.Title" 
               :Year="item.Year" 
               :imdbID='item.imdbID'
              :corazon="true"></CardSerie>
            </b-card-group>
          </b-row>
        </b-container>     
    
</div>
</template>
<script>

import router from "../router"
import store from '../store/index'
import CardSerie from '../components/CardSerie.vue'
import axios from 'axios'
import { API } from '../config/API'

export default {
    components:{
        CardSerie,
    },
    data(){
      return{
        Busqueda:''}
    },
    methods:{
    Buscar(){
      if(this.Busqueda!=''){
        store.dispatch('Buscador',this.Busqueda)
        this.Busqueda=''
      }else{
      }  
    }},
    beforeCreate() {
      API()
    },
    
    computed:{
    SeriesBuscadas(){
        return store.getters.ListaSerie
    }}
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
        }input{
      border: 1px solid black;
    }
   
    
        
</style>