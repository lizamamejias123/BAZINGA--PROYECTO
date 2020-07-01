import axios from 'axios'
import store from '../store/index'


export function API() {
    if (store.state.Busqueda != '') {
        axios.get(`http://www.omdbapi.com/?s=${store.state.Busqueda}&apikey=9b66c01&type=series`)
            .then(response => {
                if (response.data.totalResults != 0) {
                    store.dispatch('InformacionRecibida', response.data.Search)
                }
            }).catch(error => {
                console.error(error)
            })
    } else {
        axios.get(`http://www.omdbapi.com/?s=batman&apikey=9b66c01&type=series`)
            .then(response => {
                store.dispatch('InformacionRecibida', response.data.Search)
            }).catch(error => {
                console.error(error)
            })

    }

}