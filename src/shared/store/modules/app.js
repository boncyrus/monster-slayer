const state = () => ({
    isLoading: false,
    loadingText: '',
    currentSong: ''
});

const mutations = {
    setLoading(state, payload) {
        if (typeof payload === 'boolean') {
            state.isLoading = payload;
            state.loadingText = '';
        }

        if (typeof payload === 'object') {
            state.isLoading = payload.isLoading;
            state.loadingText = payload.loadingText
        }
    },
    setSong(state, payload) {
        if (!payload) {
            state.currentSong = ''
            return;
        }

        state.currentSong = `music/${payload}-music.mp3`;
    }
}

export default {
    namespaced: true,
    state,
    mutations
};