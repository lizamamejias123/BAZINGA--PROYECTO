import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
// import firebase from 'firebase'
// import {firebaseConfig} from './config/firebaseConfig'

// Buefy
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)

// Bootstrap-vue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

// firebase.initializeApp(firebaseConfig)
// export const db = firebase.firestore()

Vue.config.productionTip = false;
// firebase.auth().onAuthStateChanged(() => {
new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount("#app")
    // })