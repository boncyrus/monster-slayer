import { TargetTypes } from '../models/targetTypes';

export default class CharacterAction {

    name = '';
    value = 0;
    target = TargetTypes.enemy.code;

    constructor(data) {
        Object.assign(this, data);
    }
}