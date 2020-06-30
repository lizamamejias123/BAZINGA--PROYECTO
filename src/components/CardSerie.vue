<template>
    <div>
        <b-card
            :img-src="Poster" 
            img-alt="Este link no tiene Imagen, Perdon :(" 
            style=" width: 12rem; background-position: center center;
          background-size: cover;" 
            class="mb-2 mx-4 card-img-top" >
            <template v-slot:header>
                <div id="titulo">                
                   <p><strong>Titulo:</strong> {{Title}}  </p>              
                </div>
            </template>
            <template >
                <div>                
                   <p><strong>Años: </strong>{{Year}}</p>                
                </div>
            </template>      
            <template v-slot:footer class="m-auto">  

              <b-button v-if="corazon" @click="Like(imdbID)" :disabled="botonActivo"><svg  style="width:30px;height:30px" viewBox="0 0 24 24" >
          <path
            :fill="botonActivo?'red':'black'" stroke="red : black"
            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
          />
        </svg></b-button>

       <b-button v-else  @click="Hola(imdbID)"><svg style="width:30px;height:30px" viewBox="0 0 24 24">
          <path
            fill="red" 
            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
          /></svg></b-button>
            
            </template>          
        </b-card>  
    </div>
</template>

<script>
    import store from '../store/index'
    export default {
        name:'CardSerie',
        props:{
            Poster:String,
            Title: String,
            Year:String,
            corazon:Boolean,
            imdbID:String,
        }, data(){
            return{
            }},
        methods: {
            Like(e){
                if (store.state.Idu!=''){
                    return store.dispatch('Favorito',e)
                }
            },
            Hola(a){
                let value=true;
                 console.log('info 1');

                
                     store.state.Fav.map((e,i)=>{
            if(e.imdbID==a){
                console.log('borrar3') 
            store.state.Fav.splice(i,1)
            console.log('borrar2') 
             return store.dispatch('DeleteFavorito',a)}})
               console.log('borrar') 
            },},
        
        computed: {
            botonActivo(){
                if(store.state.Idu!=''){
                    return store.state.FavName.includes(this.imdbID)
                }else{
                    return false
                }                
            }
        },
    }
</script>
<style lang="scss" scoped>
img{
    height: 16rem;
}
.card-header{
    height: 6rem!important;
    text-align: center!important;
}
.card-header div{
    text-align: center;
}
svg{
    margin:auto
}
button{
    background-color: transparent!important;
    margin: auto;
}
.btn-secondary{border: none!important;}
#titulo{margin:auto}
    
</style>