export class CharacterModel {
    stats = {
        health: 0,
        mana: 0,
        off: 0,
        def: 0,
        agi: 0,
        int: 0,
        luk: 0
    }

    equipment = {
        weapon: {
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
            classId: 0,
            type: ''
        },
        armor: {
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
            classId: 0,
            type: ''
        }
    };

    dungeonAccess = [];
    skills = [];
    classType = 0;
    name = '';
    accountId = '';
    nextLevelExp = 0;
    totalExp = 0;
    level = 0;
    _id = '';
    image = '';

    constructor(data) {
        Object.assign(this, data);
    }
}