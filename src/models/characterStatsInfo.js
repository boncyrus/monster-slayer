export class CharacterStatsInfo {

    skills = [];
    stats = {
        health: 0,
        mana: 0,
        off: 0,
        def: 0,
        agi: 0,
        int: 0,
        luk: 0
    };
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
    classType = 0;

    constructor(data) {
        Object.assign(this, data);
    }
}