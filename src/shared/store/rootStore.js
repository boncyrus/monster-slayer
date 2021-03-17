import Vue from 'vue';
import Vuex from 'vuex';
import character from './modules/character';
import app from './modules/app';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        character,
        app
    }
})