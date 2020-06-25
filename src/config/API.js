import axios from 'axios'
import store from '../store/index'


export function API() {
    if (store.state.Busqueda !== '') {
        axios.get(`https://comicvine.gamespot.com/api/series_list/?api_key=799ffc92c1f12e4b55fd4c8e9c43c067f4015f56&sort=name:asc&filter=name:${store.state.Busqueda}`)
            .then(response => {
                if (response.data.number_of_total_results != 0) {
                    store.dispatch('InformacionRecibida', response.data.results)
                    console.log(data.results)

                } else {
                    // Alert de
                    console.log(error)
                }
            }).catch(error => {
                console.error(error)
            })
    } else {
        axios.get('https://comicvine.gamespot.com/api/series_list/?api_key=799ffc92c1f12e4b55fd4c8e9c43c067f4015f56&sort=name:asc&filter=name:legends')
            .then(response => {
                store.dispatch('InformacionRecibida', response.data.results)
            }).catch(error => {
                console.error(error)
            })
    }

}