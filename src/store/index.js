import Vue from "vue";
import Vuex from "vuex";
import router from '../router/index'
// Api de Omdbi Series
import { API } from '../config/API'
// Firebase 
import firebase from 'firebase'
import { db } from '../main'
// Framework
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
// Persistencia en Vue
import createPersistedState from 'vuex-persistedstate'
//
Vue.use(Buefy)

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // Correo del usuario
        Correo: '',
        // Clave del ususario
        Clave: '',
        // nombre del ususario
        Nombre: '',
        // busqueda que realize el usuario
        Busqueda: '',
        // cambio de datos de un usuario
        Cambiar: true,
        // Datos de Data
        Datos: null,
        // ID
        Idu: '',
        // arreglo de favorito
        Fav: [],
        // arreglo de nombre de favoritos
        FavName: [],
        // cambios despues del login
        ver: true,
        // loading
        Loading: false,
    },
    mutations: {
        // 1.Obtener action de mutation buscador
        BUSCADOR(state, valor) {
            // La busqueda tiene que ser el valor buscado y cargar el API
            state.Busqueda = valor
            API()
            alertify.set('notifier', 'position', 'bottom-left');
            alertify.success('Buscaste ' + valor)
        },
        // 2. Actualizar perfil
        ACTUALIZACION_PERFIL(state, valor) {
            // Si el nombre o el correo se cambia
            if (valor[1] != state.Nombre || valor[0] != state.Correo) {
                state.Cambiar = true
                let user = firebase.auth().currentUser
                let usuario = firebase.auth().currentUser.uid
                let BaseDatos = db.collection(usuario).doc("obj")
                let credentialFB = firebase.auth.EmailAuthProvider.credential(state.Correo, state.Clave)
                    // Si el nombre cambia
                if (valor[1] != state.Nombre) {
                    BaseDatos.update({
                        Nombre: valor[1],
                    }).then(() => {
                        state.Nombre = valor[1]
                        alertify.set('notifier', 'position', 'bottom-left');
                        alertify.success('Haz cambiado tu nombre a ' + state.Nombre)
                    }).catch(function() {
                        state.Cambiar = false
                    });
                }
                user.reauthenticateWithCredential(credentialFB)
                    .then(() => {
                        // si el correo cambia
                        if (valor[0] != state.Correo) {
                            user.updateEmail(valor[0]).then(function() {
                                BaseDatos.update({
                                        Correo: valor[0]
                                    }).then(() => {
                                        state.Correo = valor[0]
                                        alertify.set('notifier', 'position', 'bottom-left');
                                        alertify.success('Haz cambiado tu correo a ' + state.Correo)
                                    })
                                    .catch(function() {
                                        state.Cambiar = false
                                        alertify.set('notifier', 'position', 'bottom-left');
                                        alertify.error('Haz cambiado tu correo a ' + state.Correo)
                                    })
                            })
                        }
                    })
                    .catch(() => {
                        state.Cambiar = false
                        state.Correo = valor[0]
                        console.log('error')
                    })
                setTimeout(() => {
                    if (state.Cambiar == true) {
                        router.push({ name: 'Home' })
                    }
                }, 2000)
            } else {}
        },
        // 3. Recibiendo informacion
        INFORMACION_RECIBIDA(state, informacion) {
            state.Datos = informacion
        },
        // N! Login
        Login(state, valor) {
            let Email = valor[1]
            let Password = valor[0]
                // Firebase Entrar con email y contraseña
            firebase
                .auth()
                .signInWithEmailAndPassword(Email, Password)
                .then((resp) => {
                    state.Idu = resp.user.uid
                    state.Correo = Email
                    state.Clave = Password
                    state.Busqueda = ''
                    db.collection(state.Idu)
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                state.Nombre = doc.data().Nombre
                            })
                        })
                        .then(() => {
                            state.Fav = []
                            state.FavName = []
                            db.collection(state.Idu)
                                .doc('SerieFavorita')
                                .collection('SerieFavorita')
                                .get()
                                .then((querySnapshot) => {
                                    querySnapshot.forEach((doc) => {
                                        let obj = {
                                            Poster: doc.data().Poster,
                                            Title: doc.data().Title,
                                            Year: doc.data().Year,
                                            imdbID: doc.data().imdbID
                                        }
                                        state.Fav.push(obj)
                                        state.FavName.push(obj.imdbID)
                                    })
                                });
                        }).then(() => {
                            API()
                            setTimeout((function() {
                                router.push({ name: 'Home' })
                                alertify.set('notifier', 'position', 'bottom-left');
                                alertify.success('Bienvenido ' + state.Nombre)
                                state.Loading = false
                            }), 1000)
                        })
                    state.ver = false
                }).catch(error => {
                    if (error.code == 'auth/user-not-found') {
                        alertify.set('notifier', 'position', 'bottom-left');
                        alertify.error('Usuario No encontrado')
                        state.Loading = false
                    } else if (error.code == 'auth/invalid-Email') {
                        alertify.set('notifier', 'position', 'bottom-left');
                        alertify.error('Correo Electronico Invalido')
                        state.Loading = false
                    } else if (error.code == 'auth/wrong-Password') {}
                    alertify.set('notifier', 'position', 'bottom-left');
                    alertify.error('Tu clave/Usuario no es correcto')
                    state.Loading = false
                })
        },
        // N! LogOut
        LogOut(state) {
            // vaciar datos del state al salir el usuario
            firebase
                .auth()
                .signOut()
                .then(() => {
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
                    alertify.set('notifier', 'position', 'bottom-left');
                    alertify.error('Adios :(')
                })
        },
        // N! RegistrodelUsuario
        RegistroDelUsuario(state, valor) {
            let Correo = valor[1]
            let password = valor[2]
            let Nombre = valor[0]
            firebase
                .auth()
                .createUserWithEmailAndPassword(Correo, password)
                .then((resp) => {
                    let usuario = resp.user.uid
                    let obj = {
                        Nombre: Nombre,
                        Correo: Correo,
                    }
                    db.collection(usuario)
                        .doc('obj')
                        .set(obj)
                }).then(
                    router.push({ name: 'Login' }))
                .then(() => {
                    alertify.set('notifier', 'position', 'bottom-left');
                    alertify.success('Bien, ya estas registrado ' + state.Nombre)
                })
                .catch(function(error) {
                    if (error.code == 'auth/email-already-exists' || error.code == 'auth/email-already-in-use') {
                        alertify.set('notifier', 'position', 'bottom-left');
                        alertify.error('Ya existe este Usuario/Correo o ya esta en uso')
                    }
                });
        },
        // 4. Añadir favoritos a la base de datos
        FAVORITO(state, valor) {
            state.Datos.find(e => {
                if (valor == e.imdbID) {
                    let serie = {
                        Title: e.Title,
                        Poster: e.Poster,
                        Year: e.Year,
                        imdbID: e.imdbID,
                    }
                    db.collection(state.Idu)
                        .doc('SerieFavorita')
                        .collection('SerieFavorita')
                        .doc(serie.imdbID)
                        .set(serie)
                        .then(() => {
                            state.Fav.push(serie)
                            state.FavName.push(serie.imdbID)
                        })
                        .then(() => {
                            alertify.set('notifier', 'position', 'bottom-left');
                            alertify.success('Haz añadido a  ' + serie.Title)
                        })
                        .catch(() => {
                            alertify.set('notifier', 'position', 'bottom-left');
                            alertify.error('No se ha podido añadir a ' + state.Title)
                        })
                }
            })
        },
        // 5. Borrar favorito de la base de datos
        DELETE_FAVORITO(state, valor) {
            state.FavName = []
            state.Fav.forEach((e) => {
                state.FavName.push(e.imdbID)
            })
            db.collection(state.Idu)
                .doc('SerieFavorita')
                .collection('SerieFavorita')
                .doc(valor)
                .delete()
                .then(() => {
                    alertify.set('notifier', 'position', 'bottom-left');
                    alertify.error('Haz eliminado correctamente')
                })
                .catch(() => {
                    alertify.set('notifier', 'position', 'bottom-left');
                    alertify.error('Error al eliminar')
                })
        },
        // 6. Recuperar la clave de la cuenta
        RECUPERAR_CUENTA(state, valor) {
            firebase
                .auth()
                .sendPasswordResetEmail(valor)
                .then(() => {
                    alertify.set('notifier', 'position', 'bottom-left');
                    alertify.success('Se ha enviado tu nueva clave a tu email')
                })
                .catch(() => {
                    alertify.set('notifier', 'position', 'bottom-left');
                    alertify.error('No existe registro con este correo')
                })
        },

    },
    actions: {
        // 1. Buscador del home
        Buscador(context, informacion) {
            context.commit('BUSCADOR', informacion)
        },
        // 2. Actualizacion del perfil
        ActualizacionPerfil(context, informacion) {
            context.commit('ACTUALIZACION_PERFIL', informacion)
        },
        // 3. Obtener informacion de API a actions
        InformacionRecibida(context, informacion) {
            context.commit('INFORMACION_RECIBIDA', informacion)
        },
        // 4. Añadir favoritos a la base de datos
        Favorito(context, informacion) {
            context.commit('FAVORITO', informacion)
        },
        // 5. Borrar favorito de la base de datos
        DeleteFavorito(context, informacion) {
            context.commit('DELETE_FAVORITO', informacion)
        },
        // 6. Recuperar la clave de la cuenta
        OlvidoClave(context, informacion) {
            context.commit('RECUPERAR_CUENTA', informacion)
        },

    },
    modules: {},
    getters: {
        // 
        ListaSerie(state) {
            return state.Datos
        },
        // 
        PerfilDatoGetters(state) {
            let datos_perfil = [state.Correo, state.Nombre]
            return datos_perfil
        }
    },
    plugins: [createPersistedState()]
});