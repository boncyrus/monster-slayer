import { WeaponTypes } from './weaponTypes';

export class InventoryDetails {
    _id = '';
    characterId = '';
    item = {
        bonus: {
            health: 0,
            mana: 0,
            off: 0,
            def: 0,
            agi: 0,
            int: 0,
            luk: 0
        },
        _id: '',
        name: '',
        classId: '',
        type: WeaponTypes.weapon
    };

    constructor(data) {
        Object.assign(this, data);
    }
}