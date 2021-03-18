const accounts = 'accounts';
const character = 'character';

export const baseUrl = 'https://vue-monster-slayer-api.herokuapp.com';
export const routes = {
    signup: {
        url: accounts,
        method: 'POST'
    },
    login: {
        url: `${accounts}/login`,
        method: 'POST'
    },
    getCharacter: function (id) {
        return {
            url: `${accounts}/${id}/character`,
            method: 'GET'
        }
    },
    getCharacterInfo: function (characterId) {
        return {
            url: `${character}/${characterId}`,
            method: 'GET'
        }
    },
    getCharacterInventory: function (chracterId) {
        return {
            url: `${character}/${chracterId}/inventory`,
            method: 'GET'
        };
    },
    updateCharacterEquipment: function (characterId) {
        return {
            url: `${character}/${characterId}/equipment`,
            method: 'PUT'
        }
    },
    updateCharacterSkills: function (characterId) {
        return {
            url: `${character}/${characterId}/skills`,
            method: 'PUT'
        }
    },
    getDungeons: function (characterId) {
        return {
            url: `${character}/${characterId}/dungeons`,
            method: 'GET'
        }
    },
    getAvailableSkills: function (characterId) {
        return {
            url: `${character}/${characterId}/skills`,
            method: 'GET'
        }
    },
    enterDungeon: {
        url: 'dungeons/enter',
        method: 'POST'
    }
}