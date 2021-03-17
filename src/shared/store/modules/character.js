import { CharacterModel } from '../../../models/characterModel';
import { routes } from '../../../models/apiConfig';
import { CharacterMainInfo as CharacterMainInfoModel } from "../../../models/characterMainInfo";
import { CharacterStatsInfo as CharacterStatsInfoModel } from "../../../models/characterStatsInfo";
import { LocalStorageKeys } from '../../../shared/localStorage/localStorageKeys';
import Vue from 'vue';

const state = () => ({
    current: new CharacterModel(),
    isLoading: false
});

const getters = {
    mainInfo: (state) => {
        return new CharacterMainInfoModel(state.current);
    },
    statsInfo: (state) => {
        return new CharacterStatsInfoModel(state.current);
    }
}

const actions = {
    async fetchCharacter({ commit, state }, { accountId, invalidate }) {
        commit('setLoading', true);
        console.log(state);
        if (invalidate === true || state.current._id.length === 0) {
            const response = await Vue.http.get(routes.getCharacter(accountId).url);
            localStorage.setItem(LocalStorageKeys.characterId, response.body._id);
            commit('setCurrent', response.body);
            commit('setLoading', false);
        } else {
            commit('setCurrent', state.current);
            commit('setLoading', false);
        }
    }
}

const mutations = {
    setCurrent(state, payload) {
        state.current = payload;
    },
    setLoading(state, payload) {
        state.isLoading = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};