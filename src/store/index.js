import Vue from "vue";
import Vuex from "vuex";
import { API } from '../config/API'
import router from '../router/index'
import firebase from 'firebase'
import { db } from '../main'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(Buefy)
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        Correo: '',
        Clave: '',
        Nombre: '',
        Busqueda: '',
        Cambiar: true,
        Datos: null,
        Idu: '',
        Fav: [],
        FavName: [],
        ver: true
    },
    mutations: {
        // 2.Obtener action de mutation buscador
        BUSCADOR(state, valor) {
            state.Busqueda = valor
            console.log('aca2')
            API()
            console.log('aca3')
        },
        // 3. Actualizar perfil
        ACTUALIZACION_PERFIL(state, valor) {
            if (valor[1] != state.Nombre || valor[0] != state.Correo) {
                state.Cambiar = true
                let user = firebase.auth().currentUser
                let usuario = firebase.auth().currentUser.uid
                let colecction = db.collection(usuario).doc("obj")

                let credential = firebase.auth.EmailAuthProvider.credential(state.Correo, state.Clave)
                if (valor[1] != state.Nombre) {
                    colecction.update({
                        Nombre: valor[1],
                    }).then(() => {
                        state.Nombre = valor[1]
                    }).catch(function() {
                        state.Cambiar = false
                    });
                }
                user.reauthenticateWithCredential(credential).then(() => {
                    if (valor[0] != state.Correo) {
                        user.updateEmail(valor[0]).then(function() {
                            colecction.update({
                                    Correo: valor[0]
                                }).then(() => {
                                    state.Correo = valor[0]
                                })
                                .catch(function() {
                                    state.Cambiar = false
                                })
                        })
                    }
                })
                setTimeout(() => {
                    if (state.Cambiar == true) {
                        router.push({ name: 'Home' })
                    }
                }, 1000)
            } else {}
        },
        // 4. Recibiendo informacion
        INFORMACION_RECIBIDA(state, info) {
            console.log(info)
            state.Datos = info
            console.log(state.Datos)
        },
        // N! Login
        Login(state, valor) {
            let Email = valor[1]
            let Password = valor[0]
            console.log('aca1')
                // Firebase Entrar con email y contraseña
            firebase.auth().signInWithEmailAndPassword(Email, Password).then((resp) => {
                state.Idu = resp.user.uid
                state.Correo = Email
                state.Clave = Password
                state.Busqueda = ''
                console.log('aca2')
                db.collection(state.Idu).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                            state.Nombre = doc.data().Nombre
                            console.log('aca3')
                        })
                        // No manda informacion este then
                }).then(() => {
                    state.Fav = []
                    state.FavName = []
                    db.collection(state.Idu).doc('SerieFavorita').collection('SerieFavorita').get().
                    then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            let obj = {
                                Poster: doc.data().Poster,
                                Title: doc.data().Title,
                                Year: doc.data().Year,
                                imdbID: doc.data().imdbID
                            }
                            console.log('aca4')
                            state.Fav.push(obj)
                            state.FavName.push(obj.imdbID)

                        })
                    });
                }).then(() => {
                    API()
                    setTimeout((function() {
                        router.push({ name: 'Home' })

                    }), 1000)
                    console.log('aca5')
                })
                state.ver = false
            }).catch(error => {
                if (error.code == 'auth/user-not-found') {} else if (error.code == 'auth/invalid-Email') {} else if (error.code == 'auth/wrong-Password') {}
            })
        },
        // N! LogOut
        LogOut(state) {
            firebase.auth().signOut().then(() => {
                state.Correo = ''
                state.Clave = ''
                state.Nombre = ''
                state.Busqueda = ''
                state.datos = null
                state.cambios = true
                state.Idu = ''
                state.Fav = []
                state.FavName = []
                state.ver = true
            }).then(() => {
                router.push({ name: 'Login' })
            })
        },
        // N! RegistrodelUsuario
        RegistroDelUsuario(state, valor) {
            let Correo = valor[1]
            let password = valor[2]
            let Nombre = valor[0]
            console.log('aca')
            firebase.auth().createUserWithEmailAndPassword(Correo, password).then((resp) => {
                let usuario = resp.user.uid
                let obj = {
                    Nombre: Nombre,
                    Correo: Correo,
                }
                db.collection(usuario).doc('obj').set(obj).then(() => {
                    this.$buefy.dialog.alert({
                        title: 'Registro Exitoso',
                        message: 'Registro exitoso, gracias por tu registro  ' + this.Nombre,
                        type: 'is-success',
                        hasIcon: true,
                        icon: 'check-circle',
                        iconPack: 'fa',
                        ariaRole: 'alertdialog',
                        ariaModal: true
                    })
                }).then(() => {
                    router.push({ name: 'Login' })
                })
            }).catch(function(error) {
                if (error.code == 'auth/email-already-exists' || error.code == 'auth/email-already-in-use') {
                    alert('ya existe')
                }
            });
        },
        FAVORITO(state, valor) {
            state.Datos.find(e => {
                console.log('pasa')
                if (valor == e.imdbID) {
                    let serie = {
                        Title: e.Title,
                        Poster: e.Poster,
                        Year: e.Year,
                        imdbID: e.imdbID,
                    }
                    db.collection(state.Idu).doc('SerieFavorita').collection('SerieFavorita').doc(serie.imdbID).set(serie).then(() => {
                        state.Fav.push(serie)
                        state.FavName.push(serie.imdbID)

                    }).then((respo) => { console.log(respo) }).catch(function(error) {

                        console.log(error);
                    })
                }
            })

        },

        DELETE_FAVORITO(state, valor) {
            console.log('pasa4')
            state.FavName = []
            state.Fav.forEach((e) => {
                state.FavName.push(e.imdbID)
                console.log('loco2')
            })
            db.collection(state.Idu)
                .doc('SerieFavorita')
                .collection('SerieFavorita')
                .doc(valor)
                .delete()
                .then(function() { console.log('loco3') })
                .catch(function(error) { console.log(error) })
        },

    },
    actions: {
        // 2. Buscador del home
        Buscador(context, info) {
            context.commit('BUSCADOR', info)
            console.log('aca1')
        },
        // 3. Actualizacion del perfil
        ActualizacionPerfil(context, info) {
            context.commit('ACTUALIZACION_PERFIL', info)
        },
        // 4. Obtener informacion de API a actions
        InformacionRecibida(context, info) {
            console.log('aca8')
            context.commit('INFORMACION_RECIBIDA', info)
        },
        Favorito(context, info) {
            context.commit('FAVORITO', info)
        },

        DeleteFavorito(context, info) {
            context.commit('DELETE_FAVORITO', info)
            console.log('info 1')
        },
    },
    modules: {},
    getters: {
        ListaSerie(state) {
            return state.Datos
        },
        PerfilDatoGetters(state) {
            let datos_perfil = [state.Correo, state.Nombre]
            return datos_perfil
        }
    }
});