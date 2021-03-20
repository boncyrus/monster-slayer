export class FinishBattleResponse {
    exp = 0;
    lvlUp = false;
    drop = '';
    newSkills = [];
    unlockedDungeons = [];

    constructor(data) {
        Object.assign(this, data);
    }
}