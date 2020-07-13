import Vue from 'vue';
import Vuex from 'vuex';

import noteModule from './note/index';
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        noteModule
    }
})

export default store;