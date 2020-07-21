import GoodApp from '../src/components/GoodApp.vue';
import NotFound from "../src/components/NotFound.vue";

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [{
        path: "/",
        component: GoodApp
    },
    {
        path: "*",
        component: NotFound
    }
];

export const router = new VueRouter({
    mode: "history",
    routes
});