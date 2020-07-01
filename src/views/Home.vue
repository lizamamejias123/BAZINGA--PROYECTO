<template>
<div> 
<!-- Banner -->
<b-jumbotron class="banner">
<!-- Bazinga Imagen -->
<img id="bazinga" src="@/assets/img/bazinga.png" alt="" href="/">
<!-- Texto Principal -->
   <H2>Bazinga! Tu nuevo buscador de series</H2>
   <h3>Sitio Web destinado a todos los fans, de todas las series</h3>
   <h5 v-if="$store.state.Nombre!==''">Hola {{$store.state.Nombre}}</h5>
   <h5 v-else> Debes registrarte para añadir series a tus favoritos</h5>
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
                  placeholder="Encuentra tu serie... Ej: Arrow">
                  </b-form-input>
                  <b-button 
                  size="xl" 
                  class="ml-2" 
                  variant="primary" 
                  @click.prevent="Buscar()">Buscar</b-button>
                </b-input-group>
              </b-col>
            </b-row>
          </b-container>
    </b-container>
    <!-- Card de series -->
    <b-container>
          <b-row align-h="center">
            <b-card-group deck v-for="(item,index) in SeriesBuscadas" :key="index">
              <CardSerie 
              :Poster="item.Poster"
               :Title="item.Title" 
               :Year="item.Year" 
               :imdbID='item.imdbID'
              :corazon="true"
              ></CardSerie>
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
    name:'Home',
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
<style lang="scss">
.banner{
  background-image: url(".././assets/img/BG-0.jpg")!important;
  background-position: center center;
  background-size: cover;}
  #bazinga{height: 10rem;}
</style>