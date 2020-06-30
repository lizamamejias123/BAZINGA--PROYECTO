import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store'
Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: () =>
        import ( /* webpackChunkName: "Home" */ "../views/Home.vue")
}, {
    path: "/Fav",
    name: "Fav",
    meta: { Login: true },
    component: () =>
        import ( /* webpackChunkName: "Fav" */ "../views/Fav.vue")
}, {
    path: "/Login",
    name: "Login",
    component: () =>
        import ( /* webpackChunkName: "Login" */ "../views/Login.vue")
}, {
    path: "/NotFound",
    name: "NotFound",
    component: () =>
        import ( /* webpackChunkName: "NotFound" */ "../views/NotFound.vue")
}, {
    path: "/Perfil",
    name: "Perfil",
    meta: { Login: true },
    component: () =>
        import ( /* webpackChunkName: "Perfil" */ "../views/Perfil.vue")
}, {
    path: "/RegistroUser",
    name: "RegistroUser",
    component: () =>
        import ( /* webpackChunkName: "RegistroUser" */ "../views/RegistroUser.vue")
}, ];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    let authRequired = to.matched.some(route => route.meta.Login);
    if (!store.state.Idu && authRequired) {
        next('/Login');
    } else {
        next()
    }
})

export default router;