export class FinishBattleRequest {
    characterId = '';
    dungeonId = '';
    enemyId = '';
    
    constructor(data) {
        Object.assign(this, data)
    }
}