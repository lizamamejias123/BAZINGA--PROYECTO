import Vue from "vue";
import Vuex from "vuex";
import { API } from '../config/API'
import router from '../router/index'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        Correo: '',
        Clave: '',
        Nombre: '',
        Busqueda: '',
        Cambiar: true,
    },
    mutations: {
        // 1. Obtener action de mutation RecuperarLaContraseña
        RECUPERAR_LA_CONTRASEÑA(state, valor) {
            firebase.auth().sendPasswordResetEmail(valor).then(function() {
                this.$buefy.dialog.alert({
                    title: 'Cambio de contraseña',
                    message: 'Se ha mandado una nueva contraseña a tu correo',
                    type: 'is-success',
                    hasIcon: true,
                    icon: 'envelope',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
            }).catch(function(error) {
                if (error.code == 'auth/user-not-found') {
                    this.$buefy.dialog.alert({
                        title: 'El correo no tiene usuario',
                        message: 'El correo no tiene un usuario registrado, deberías registrarte',
                        type: 'is-danger',
                        hasIcon: true,
                        icon: 'times-circle',
                        iconPack: 'fa',
                        ariaRole: 'alertdialog',
                        ariaModal: true
                    })
                }
            })
        },
        // 2.Obtener action de mutation buscador
        BUSCADOR(state, valor) {
            state.Buscador = valor
            API()
            console.log(valor)

        },
        // 3. Actualizar perfil
        ACTUALIZACION_PERFIL(state, valor) {
            if (valor[1] != state.Nombre || valor[0] != state.Email) {
                state.Cambiar = true
                let user = firebase.auth().currentUser
                let usuario = firebase.auth().currentUser.uid
                let colecction = db.collection(usuario).doc("registo_user")
                let credential = firebase.auth.EmailAuthProvider.credential(state.Email, state.Contrasena)
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
                    if (valor[0] != state.Email) {
                        user.updateEmail(valor[0]).then(function() {
                            colecction.update({
                                    Email: valor[0]
                                }).then(() => {
                                    state.Email = valor[0]
                                })
                                .catch(function() {
                                    state.Cambiar = false
                                })
                        }).catch(function(error) {
                            console.log(error)
                            state.Cambiar = false
                            state.Email = valor[0]
                            if (error.code == 'auth/email-already-in-use' || error.code == 'auth/email-already-exists') {
                                // Correo no existe
                            }
                        })
                    }
                })
                setTimeout(() => {
                    if (state.Cambiar == true) {
                        // alert actualizado
                    }
                }, 2000)
            } else {
                // alert sin cambios
            }
        },
        // N! Login
        LOGIN(state, valor) {
            let Email = valor[0]
            let Password = valor[1]
                // Firebase Entrar con email y contraseña
            firebase.auth().signInWithEmailAndPassword(Email, Password).then((respuesta) => {
                state.usuarioID = respuesta.user.uid
                state.correo = Email
                state.clave = Password
                state.Busqueda = ''
                db.collection(state.usuarioID).get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        state.Nombre = doc.data().Nombre
                    })
                }).then(() => {
                    state.listaFav = []
                    state.NombresFav = []
                    db.collection(state.usuarioID).doc('SerieFavorita').collection('SerieFavorita').get().
                    then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            let favorite = {
                                Nombre: doc.data().Nombre,
                                imagen: doc.data().imagen,
                                ingredientes: doc.data().ingredientes,
                                url: doc.data().url
                            }
                            state.listaFav.push(favorite)
                            state.NombresFav.push(favorite.Nombre)
                        })
                    });
                }).then(() => {
                    API()
                    setTimeout((function() { router.push('/') }), 1000)
                })
                state.ver = false
            }).catch(error => {
                if (error.code == 'auth/user-not-found') {
                    // Usuario no encontrado
                } else if (error.code == 'auth/invalid-Email') {
                    //  correo invalido
                } else if (error.code == 'auth/wrong-Password') {
                    //  clave invalida
                }
            })
        },

    },
    actions: {
        //  1. Action de recuperar contraseña 
        RecuperarLaContraseña(context, info) {
            context.commit('RECUPERAR_LA_CONTRASEÑA', info)
        },
        // 2. Buscador del home
        Buscador(context, info) {
            context.commit('BUSCADOR', info)
        },
        // 3. Actualizacion del perfil
        ActualizacionPerfil(context, info) {
            context.commit('ACTUALIZACION_PERFIL', info)
        }

    },
    modules: {},
    getters: {
        ListaSerie(state) {
            return state.datos
        },
        PerfilDatoGetters(state) {
            let datos_perfil = [state.Email, state.Nombre]
            return datos_perfil
        }
    }
});