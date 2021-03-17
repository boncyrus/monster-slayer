const state = () => ({
    isLoading: false
});

const mutations = {
    setLoading(state, payload) {
        state.isLoading = payload;
    }
}

export default {
    namespaced: true,
    state,
    mutations
};