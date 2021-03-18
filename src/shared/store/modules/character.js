import { CharacterModel } from '../../../models/characterModel';
import { UpdateEquipmentRequest } from '../../../models/updateEquipmentRequest';
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
        if (invalidate === true || state.current._id.length === 0) {
            const response = await Vue.http.get(routes.getCharacter(accountId).url);
            localStorage.setItem(LocalStorageKeys.characterId, response.body._id);
            commit('setCurrent', response.body);
            commit('setLoading', false);
        } else {
            commit('setCurrent', state.current);
            commit('setLoading', false);
        }

        return Promise.resolve(state.current);
    },

    async updateEquipment({ commit, state, dispatch }, { weaponId, armorId }) {
        commit('setLoading', true);
        await Vue.http.put(
            routes.updateCharacterEquipment(state.current._id).url,
            new UpdateEquipmentRequest(weaponId, armorId));

        await dispatch('fetchCharacter', {
            accountId: state.current.accountId,
            invalidate: true
        });

        commit('setLoading', false);

        return Promise.resolve(state.current);
    },

    async updateSkills({ commit, state, dispatch }, skillArr) {
        commit('setLoading', true);
        await Vue.http.put(
            routes.updateCharacterSkills(state.current._id).url,
            skillArr);

        await dispatch('fetchCharacter', {
            accountId: state.current.accountId,
            invalidate: true
        });

        commit('setLoading', false);

        return Promise.resolve(state.current);
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