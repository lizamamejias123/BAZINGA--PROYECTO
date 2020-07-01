import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import firebase from 'firebase'

// Bootstrap-vue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const configFirebase = {
    apiKey: "AIzaSyCKr8cTh6APXP9M6mU0wrNZdPft4YFOXX0",
    authDomain: "bazingaproyect.firebaseapp.com",
    databaseURL: "https://bazingaproyect.firebaseio.com",
    projectId: "bazingaproyect",
    storageBucket: "bazingaproyect.appspot.com",
    messagingSenderId: "198683614937",
    appId: "1:198683614937:web:df8b1d55c3bb3edc15e8c8"

}

firebase.initializeApp(configFirebase)
export const db = firebase.firestore()

Vue.config.productionTip = false;
firebase.auth().onAuthStateChanged(() => {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount("#app")
})