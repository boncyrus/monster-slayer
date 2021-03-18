export class DungeonInfo {

    _id = '';
    name = '';
    image = '';
    recommendedLevel = 0;
    bossReq = null;
    locked = true;
    enemies = [];

    constructor(data) {
        Object.assign(this, data);
    }
}