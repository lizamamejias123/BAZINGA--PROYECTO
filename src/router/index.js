import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: () =>
        import ( /* webpackChunkName: "Home" */ "../views/Home.vue")
}, {
    path: "/Fav",
    name: "Fav",
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
    component: () =>
        import ( /* webpackChunkName: "Perfil" */ "../views/Perfil.vue")
}, {
    path: "/RegistroUser",
    name: "RegistroUser",
    component: () =>
        import ( /* webpackChunkName: "RegistroUser" */ "../views/RegistroUser.vue")
}, ];

const router = new VueRouter({
    routes
});

export default router;