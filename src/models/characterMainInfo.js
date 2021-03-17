export class CharacterMainInfo {
    name = '';
    dungeonAccess = [];
    classType = 0;
    nextLevelExp = 0;
    totalExp = 0;
    level = 0;
    _id = '';

    constructor(data) {
        Object.assign(this, data);
    }
}