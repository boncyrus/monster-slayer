const initialState = {
    isLoading: false,
    loadingText: '',
    currentSong: '',
    bg: '/images/game-battle-bg.png'
};

const state = () => ({
    ...initialState
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
    },
    setBg(state, payload) {
        if (!payload) {
            state.bg = initialState.bg
            return
        }

        state.bg = payload;
    }
}

export default {
    namespaced: true,
    state,
    mutations
};