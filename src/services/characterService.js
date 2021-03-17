import CharacterClassTypes from '../models/characterClassTypes';

export class CharacterService {

    getClassTypes() {
        return Object.keys(CharacterClassTypes).reduce((accumulator, key) => [...accumulator, CharacterClassTypes[key]], []);
    }

    getClassType(classTypeValue) {
        return this.getClassTypes().find(x => x.value === classTypeValue);
    }
}