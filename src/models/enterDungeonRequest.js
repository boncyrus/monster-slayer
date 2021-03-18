export class EnterDungeonRequest {

    characterId = '';
    dungeonId = '';

    constructor(data) {
        Object.assign(this, data);
    }
}